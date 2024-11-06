from fastapi import FastAPI, Request, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .conn import Base, engine
from .models import posts, user
from .router.User import router as user_router
from .router.Posts import router as posts_router
import requests
from bs4 import BeautifulSoup
import logging
import os
from datetime import datetime
from gtts import gTTS
import openai
import speech_recognition as sr
from pydub import AudioSegment
from dotenv import load_dotenv

Name = ' bien '
Age = 20
can = '56 kg'
cao = '1m7'
benh = 'có tiền sử bệnh tăng huyết áp'
# Load environment variables
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Define main history folder
HISTORY_FOLDER = "history"
os.makedirs(HISTORY_FOLDER, exist_ok=True)

# Set up FastAPI and templates
app = FastAPI()
templates = Jinja2Templates(directory="FE/src")
# app.mount("/static", StaticFiles(directory="FE/src/static"), name="static")
app.mount("/history", StaticFiles(directory="history"), name="history")
HISTORY_FOLDER = os.path.join(os.path.dirname(__file__), "history")


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow access from frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(user_router)
app.include_router(posts_router)

# Function to get today's folder path, create if doesn't exist
def get_today_folder():
    today_str = datetime.now().strftime("%Y-%m-%d")
    today_folder = os.path.join(HISTORY_FOLDER, today_str)
    os.makedirs(today_folder, exist_ok=True)
    return today_folder

def get_web_content(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            paragraphs = soup.find_all('p')
            text_content = "\n".join([para.get_text() for para in paragraphs])
            return text_content
        else:
            return None
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu từ {url}: {e}")
        return None


def store_web_contents():
    urls = [
        "https://www.vinmec.com/vie/bai-viet/nao-la-mot-che-do-dinh-duong-lanh-manh-vi",
        "https://medlatec.vn/tin-tuc/thuc-don-an-uong-khoa-hoc-de-giam-can-hieu-qua-an-toan-s195-n22536",
        "https://sieutinh.com/tinh-luong-calo-can-thiet-trong-ngay"

    ]
    web_contents = {url: get_web_content(url) for url in urls}
    return web_contents

def suggest_exercise_activity():
    # Trả về danh sách các hoạt động thể dục thể thao
    return (
        "Dưới đây là một số hoạt động thể dục thể thao giúp cải thiện sức khỏe và tinh thần:\n"
        "- Đi bộ nhanh hoặc chạy bộ: Tốt cho hệ tim mạch và giảm căng thẳng.\n"
        "- Tập yoga hoặc thiền: Giúp giảm căng thẳng và cải thiện tinh thần.\n"
        "- Đạp xe: Tốt cho sức khỏe tim mạch và cải thiện sức mạnh cơ bắp.\n"
        "- Tập thể hình: Phát triển cơ bắp và tăng cường thể lực.\n"
        "- Tham gia lớp nhảy hoặc zumba: Vừa vận động vừa giải trí, tốt cho sức khỏe tim mạch."
    )
def generate_response(user_input, web_contents):
    health_keywords = ["sức khỏe", "tốt cho sức khỏe", "hoạt động thể thao", "tập luyện", "thể dục"]
    
    if any(keyword in user_input.lower() for keyword in health_keywords):
        exercise_activities = suggest_exercise_activity().split("\n- ")[1:]
        response_messages = [{"text": activity, "is_task": True} for activity in exercise_activities]
        history_text = "\n".join([msg["text"] for msg in response_messages])  # Ghép các hoạt động thể thao lại thành một chuỗi để lưu
        save_history_text(history_text)
        return response_messages, None

    combined_content = "\n\n".join([f"Nội dung từ {url}:\n{content}" for url, content in web_contents.items() if content])
    prompt = f"Dưới đây là các nội dung tham khảo từ các trang web:\n{combined_content}\n\nCâu hỏi của người dùng: {user_input}"
    
    completion = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": (
                "Bạn là một trợ lý sức khỏe của tôi. Trả lời ngắn gọn, rõ ràng và không dùng ký tự ** để nhấn mạnh bất kỳ thông tin nào."
                "Trả lời dạng danh sách mỗi mục xuống dòng và tránh lặp lại ký hiệu đặc biệt như dấu * hoặc ** trong toàn bộ câu trả lời."
                f"Tôi là {Name}, tôi {Age} tuổi, chiều cao của tôi là {cao}, và cân nặng của tôi là {can}. {benh}."
            )},
            {"role": "user", "content": prompt}
        ]
    )

    response_text = completion.choices[0].message['content']
    formatted_response = response_text.replace("*", "").replace("\n", "<br>").replace("- ", "<br>- ")

    # Lưu lịch sử chat vào file .txt
    save_history_text(f"User: {user_input}\nBot: {formatted_response.replace('<br>', '\n')}")

    return [{"text": formatted_response, "is_task": False}], None

def save_history_text(content):
    """Hàm lưu nội dung chat vào file .txt theo ngày."""
    today_folder = get_today_folder()
    history_filename = f"chat_history_{datetime.now().strftime('%Y-%m-%d')}.txt"
    history_filepath = os.path.join(today_folder, history_filename)
    
    with open(history_filepath, "a", encoding="utf-8") as history_file:
        history_file.write(content + "\n\n")  # Ghi nội dung và xuống dòng hai lần cho mỗi lần lưu




import subprocess
# Function to convert audio to wav format
def convert_audio_to_wav(input_file_path: str, output_file_path: str):
    if not os.path.exists(input_file_path):
        print(f"File {input_file_path} does not exist.")
        return False

    # Chạy lệnh ffmpeg để chuyển đổi webm sang wav
    try:
        command = ["ffmpeg", "-i", input_file_path, output_file_path]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            print(f"FFmpeg error: {result.stderr.decode()}")
            return False
        print(f"Successfully converted {input_file_path} to {output_file_path}")
        return True
    except Exception as e:
        print(f"Error converting audio: {e}")
        return False

# Endpoint for text chat
# @app.post("/chat", response_class=JSONResponse)
# async def chat(user_input: str = Form(...)):
#     # Fetch web contents
#     web_contents = store_web_contents()  # Use the function to get the web contents
    
#     # Check if web_contents is valid
#     if not web_contents:
#         return JSONResponse({"error": "Failed to fetch web contents."}, status_code=500)
    
#     # Pass both user_input and web_contents to generate_response
#     response_text, audio_filepath = generate_response(user_input, web_contents)
    
#     return {
#         "response": response_text,
#         "audio_url": f"http://localhost:8000/{audio_filepath}"  
#     }
@app.post("/chat", response_class=JSONResponse)
async def chat(user_input: str = Form(...)):
    web_contents = store_web_contents()  # Lấy nội dung từ web
    
    if not web_contents:
        return JSONResponse({"error": "Failed to fetch web contents."}, status_code=500)
    
    # Gọi generate_response để xử lý user_input
    response_messages, audio_filepath = generate_response(user_input, web_contents)
    
    return {
        "messages": response_messages,
        "audio_url": f"http://localhost:8000/{audio_filepath}" if audio_filepath else None
    }
@app.post("/chat-voice", response_class=JSONResponse)
async def chat_voice(voice: UploadFile = File(...)):
    today_folder = get_today_folder()
    input_audio_path = os.path.join(today_folder, voice.filename)
    output_audio_path = input_audio_path.rsplit(".", 1)[0] + ".wav"

    # Lưu file .webm
    with open(input_audio_path, "wb") as f:
        f.write(voice.file.read())

    # Chuyển đổi sang .wav
    convert_audio_to_wav(input_audio_path, output_audio_path)

    # Kiểm tra thành công của chuyển đổi
    if os.path.exists(output_audio_path):
        return JSONResponse({"response": "Voice message received and processed.", "audio_url": f"/{output_audio_path}"})
    else:
        return JSONResponse({"error": "Audio conversion failed."}, status_code=500)

from fastapi.responses import FileResponse
from typing import List
@app.get("/history")
async def get_history():
    try:
        if not os.path.exists(HISTORY_FOLDER):
            return JSONResponse(content={"message": "No history data found."})

        history_data = []
        # Duyệt qua tất cả thư mục và file trong `HISTORY_FOLDER`
        for root, _, files in os.walk(HISTORY_FOLDER):
            for file_name in files:
                if file_name.endswith(".txt"):
                    file_path = os.path.join(root, file_name)
                    with open(file_path, 'r', encoding="utf-8") as file:
                        # Thêm thông tin ngày tháng và nội dung vào dữ liệu
                        date = os.path.basename(root)
                        history_data.append({"date": date, "content": file.read()})

        if not history_data:
            return JSONResponse(content={"message": "No history data available."})

        return JSONResponse(content=history_data)

    except Exception as e:
        print(f"Error retrieving history data: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving history data.")
