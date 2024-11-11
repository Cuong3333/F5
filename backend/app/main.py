# app/main.py
import os
import logging
from datetime import datetime
from fastapi import FastAPI, Request, Form, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydub import AudioSegment
from sqlalchemy.orm import Session  # Correct import
import openai
import subprocess
import requests
from dotenv import load_dotenv
from .conn import Base, engine, get_db
from .models import user, task, subTask, posts, events
from .models.user import User
from .models.task import Task
from .models.UserProfile import  UserProfile
from .router.User import router as user_router
from .router.task import router as task_router

from .utilities.oauth2 import get_curent_user
from bs4 import BeautifulSoup

# Load environment variables
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

# Setup folder for history
HISTORY_FOLDER = "history"
os.makedirs(HISTORY_FOLDER, exist_ok=True)

# Setup FastAPI and templates
app = FastAPI()
templates = Jinja2Templates(directory="client/src")
app.mount("/history", StaticFiles(directory=HISTORY_FOLDER), name="history")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://well-green.btecit.tech", "https://be-well-green.btecit.tech"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Database setup
Base.metadata.create_all(bind=engine)


app.include_router(user_router)
app.include_router(task_router)

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Utility functions

def get_today_folder():
    """Returns the folder path for today and creates it if it doesn't exist."""
    today_str = datetime.now().strftime("%Y-%m-%d")
    today_folder = os.path.join(HISTORY_FOLDER, today_str)
    os.makedirs(today_folder, exist_ok=True)
    return today_folder

def save_history_text(content):
    """Saves chat history to a text file."""
    today_folder = get_today_folder()
    history_filename = f"chat_history_{datetime.now().strftime('%Y-%m-%d')}.txt"
    history_filepath = os.path.join(today_folder, history_filename)
    
    with open(history_filepath, "a", encoding="utf-8") as history_file:
        history_file.write(content + "\n\n")

# Function to get web content
def get_web_content(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            paragraphs = soup.find_all('p')
            return "\n".join([para.get_text() for para in paragraphs])
        return None
    except Exception as e:
        logger.error(f"Error fetching content from {url}: {e}")
        return None

def store_web_contents():
    """Stores content from predefined URLs."""
    urls = [
        "https://www.vinmec.com/vie/bai-viet/nao-la-mot-che-do-dinh-duong-lanh-manh-vi",
        "https://medlatec.vn/tin-tuc/thuc-don-an-uong-khoa-hoc-de-giam-can-hieu-qua-an-toan-s195-n22536",
        "https://sieutinh.com/tinh-luong-calo-can-thiet-trong-ngay"
    ]
    return {url: get_web_content(url) for url in urls}

def suggest_exercise_activity():
    """Suggests a list of exercise activities."""
    return (
        "Dưới đây là một số hoạt động thể dục thể thao giúp cải thiện sức khỏe và tinh thần:\n"
        "- Đi bộ nhanh hoặc chạy bộ: Tốt cho hệ tim mạch và giảm căng thẳng.\n"
        "- Tập yoga hoặc thiền: Giúp giảm căng thẳng và cải thiện tinh thần.\n"
        "- Đạp xe: Tốt cho sức khỏe tim mạch và cải thiện sức mạnh cơ bắp.\n"
        "- Tập thể hình: Phát triển cơ bắp và tăng cường thể lực.\n"
        "- Tham gia lớp nhảy hoặc zumba: Vừa vận động vừa giải trí, tốt cho sức khỏe tim mạch."
    )

def generate_response(user_input, web_contents, User_Profile):
    """Generates response based on user input, web contents, and health data."""
    health_keywords = ["sức khỏe", "tốt cho sức khỏe", "hoạt động thể thao", "tập luyện", "thể dục"]

    # Handle health-related requests
    if any(keyword in user_input.lower() for keyword in health_keywords):
        exercise_activities = suggest_exercise_activity().split("\n- ")[1:]
        response_messages = [{"text": activity, "is_task": True} for activity in exercise_activities]
        history_text = "\n".join([msg["text"] for msg in response_messages])
        save_history_text(history_text)
        return response_messages, None

    # Combine content from web and health data
    combined_content = "\n\n".join([f"Nội dung từ {url}:\n{content}" for url, content in web_contents.items() if content])
    health_info = (
        f"Tôi tên là {User_Profile.name}.Năm nay tôi {User_Profile.age} tuổi. Cân nặng của tôi là {User_Profile.weight} kg, chiều cao là {User_Profile.height} cm, "
        f"Mục tiêu của tôi đối với sức khỏe của tôi là {User_Profile.goal}. Giới tính của tôi là {User_Profile.gender} . Tôi đang có tiền sử bệnh {User_Profile.health_history}"
        
    ) if User_Profile else ""

    prompt = f"{combined_content}\n\nCâu hỏi của người dùng: {user_input}"

    # Call OpenAI API to generate a response
    completion = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": f"Bạn là một trợ lý sức khỏe của tôi. {health_info}"},
            {"role": "user", "content": prompt}
        ]
    )

    response_text = completion.choices[0].message['content']
    formatted_response = response_text.replace("*", "").replace("\n", "<br>").replace("- ", "<br>- ")

    save_history_text(f"User: {user_input}\nBot: {formatted_response.replace('<br>', '\n')}")
    return [{"text": formatted_response, "is_task": False}], None

# Audio conversion utility function
def convert_audio_to_wav(input_file_path: str, output_file_path: str):
    """Converts audio file to .wav format using ffmpeg."""
    if not os.path.exists(input_file_path):
        logger.error(f"File {input_file_path} does not exist.")
        return False

    try:
        command = ["ffmpeg", "-i", input_file_path, output_file_path]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
            logger.error(f"FFmpeg error: {result.stderr.decode()}")
            return False
        logger.info(f"Successfully converted {input_file_path} to {output_file_path}")
        return True
    except Exception as e:
        logger.error(f"Error converting audio: {e}")
        return False

# Routes

@app.post("/chat", response_class=JSONResponse)
async def chat(user_input: str = Form(...), current_user: User = Depends(get_curent_user), db: Session = Depends(get_db)):
    """Handles user chat input."""

    User_Profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()


    web_contents = store_web_contents()
    
    if not web_contents:
        return JSONResponse({"error": "Failed to fetch web contents."}, status_code=500)

    response_messages, _ = generate_response(user_input, web_contents, User_Profile)
    
    return {"messages": response_messages}

@app.post("/chat-voice", response_class=JSONResponse)
async def chat_voice(voice: UploadFile = File(...)):
    """Handles voice input and converts it to .wav format."""
    today_folder = get_today_folder()
    input_audio_path = os.path.join(today_folder, voice.filename)
    output_audio_path = input_audio_path.rsplit(".", 1)[0] + ".wav"

    with open(input_audio_path, "wb") as f:
        f.write(voice.file.read())

    if convert_audio_to_wav(input_audio_path, output_audio_path):
        return JSONResponse({"message": f"Audio converted successfully: {output_audio_path}"})
    else:
        return JSONResponse({"error": "Failed to convert audio."}, status_code=500)


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
    
from fastapi import Body
from .models.task import Task  # Import Task model from the task module
from .models.user import User
from sqlalchemy.orm import Session
from .conn import engine, sessionLocal  
from datetime import datetime



# Endpoint để lưu Task mới
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
@app.post("/save-task")
async def save_task(
    title: str = Body(..., embed=True),  # Thêm embed=True để mong đợi "title" là một trường trực tiếp trong JSON
    current_user: User = Depends(get_curent_user),  
    db: Session = Depends(get_db)
):  
    try:
        # Tạo task mới và gắn user_id của người dùng hiện tại
        new_task = Task(
            title=title,
            user_id=current_user.id,
            date=datetime.utcnow(),
            priority="normal",
            stage="in progress",
            is_trashed=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        logger.info("Task saved successfully!")
        return {"message": "Task saved successfully!"}
    except Exception as e:
        logger.error(f"Error saving task: {e}")  # Log chi tiết lỗi
        raise HTTPException(status_code=500, detail="Failed to save task")