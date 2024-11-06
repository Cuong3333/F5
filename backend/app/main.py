from fastapi import FastAPI, Request, Form, File, UploadFile
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
# Function to generate chat response and save as audio
def generate_response(user_input, web_contents):
    combined_content = "\n\n".join([f"Nội dung từ {url}:\n{content}" for url, content in web_contents.items() if content])
    prompt = f"Dưới đây là các nội dung tham khảo từ các trang web:\n{combined_content}\n\nCâu hỏi của người dùng: {user_input}"
    completion = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": (
                "Bạn là một trợ lý sức khỏe của tôi. Trả lời ngắn gọn, rõ ràng và không dùng ký tự ** để nhấn mạnh bất kỳ thông tin nào."
                "Trả lời dạng danh sách mỗi mục xuống dòng và tránh lặp lại ký hiệu đặc biệt như dấu * hoặc ** trong toàn bộ câu trả lời. "
                f"Tôi là {Name}, tôi {Age} tuổi, chiều cao của tôi là {cao}, và cân nặng của tôi là {can}. {benh}"
                "nếu người dùng hỏi về hoạt động hay nhiệm vụ thì bạn đưa ra các lời khuyên hoạt động thể dục thể thao phù hợp với tôi "
            )},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Format response to ensure line breaks after each period and dash
    response_text = completion.choices[0].message['content']
    formatted_response = response_text.replace(". ", ".\n").replace("- ", "\n- ")

    # Continue with audio conversion as before
    today_folder = get_today_folder()
    audio_filename_mp3 = f"response_audio_{datetime.now().strftime('%Y%m%d%H%M%S')}.mp3"
    audio_filepath_mp3 = os.path.join(today_folder, audio_filename_mp3)
    
    tts = gTTS(formatted_response, lang='vi')
    tts.save(audio_filepath_mp3)
    
    audio_filename_wav = f"response_audio_{datetime.now().strftime('%Y%m%d%H%M%S')}.wav"
    audio_filepath_wav = os.path.join(today_folder, audio_filename_wav)
    sound = AudioSegment.from_mp3(audio_filepath_mp3)
    sound.export(audio_filepath_wav, format="wav")

    return formatted_response, audio_filepath_wav

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
@app.post("/chat", response_class=JSONResponse)
async def chat(user_input: str = Form(...)):
    # Fetch web contents
    web_contents = store_web_contents()  # Use the function to get the web contents
    
    # Check if web_contents is valid
    if not web_contents:
        return JSONResponse({"error": "Failed to fetch web contents."}, status_code=500)
    
    # Pass both user_input and web_contents to generate_response
    response_text, audio_filepath = generate_response(user_input, web_contents)
    
    return {
        "response": response_text,
        "audio_url": f"http://localhost:8000/{audio_filepath}"  
    }

# Endpoint for voice chat
@app.post("/chat-voice", response_class=JSONResponse)
async def chat_voice(voice: UploadFile = File(...)):
    # Save input and output paths
    today_folder = get_today_folder()
    input_audio_path = os.path.join(today_folder, voice.filename)
    output_audio_path = input_audio_path.rsplit(".", 1)[0] + ".wav"

    # Save uploaded .webm file
    with open(input_audio_path, "wb") as f:
        f.write(voice.file.read())

    # Convert webm to wav
    convert_audio_to_wav(input_audio_path, output_audio_path)

    # Check if conversion was successful
    if os.path.exists(output_audio_path):
        print(f"Audio file {output_audio_path} is ready for further processing.")
        # Implement further processing here, if needed.
        return JSONResponse({"response": "Voice message received and processed.", "audio_url": f"/{output_audio_path}"})
    else:
        return JSONResponse({"error": "Audio conversion failed."}, status_code=500)
