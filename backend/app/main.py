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
from .router.menu import router as menu_router

from sqlalchemy.orm import Session, joinedload

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
app.include_router(menu_router)

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

# ===================== Train AI CHAT-GBT
import json


def generate_response(user_input: str, user_info: str, db, userId):
    """Tạo phản hồi từ người dùng với thông tin sức khỏe và lưu nhiệm vụ vào cơ sở dữ liệu."""

    if not user_info:
        return [{"text": "Không có thông tin sức khỏe để đưa ra lời khuyên.", "is_task": False}], None

    try:
        if "kế hoạch" in user_input.lower():
            # Gọi API OpenAI để tạo kế hoạch ăn uống và tập luyện
            completion = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": f"Thông tin: {user_info}"},
                    {"role": "user", "content": "Tạo 5 nhiệm vụ tập luyện. Bắt buộc phải ở dạng JSON: title:tên nhiệm vụ, timelàmnhiêmv:2024-11-12 14:30:00"}
                ]
            )
            response_text = completion['choices'][0]['message']['content']

            try:
                # Kiểm tra nếu phản hồi có dạng JSON hợp lệ
                tasks = json.loads(response_text.strip())
                
                # Kiểm tra nếu tasks là một danh sách hợp lệ
                if isinstance(tasks, list):
                    for task in tasks:
                        task_data = {
                            "title": task.get("title", "N/A"),  # Lấy tên nhiệm vụ
                            "stage": "START",  # Mặc định nếu không có
                            "priority": "NORMAL",  # Mặc định nếu không có
                        }

                        # Lưu nhiệm vụ vào cơ sở dữ liệu
                        db_task = Task(
                            title=task_data["title"],
                            stage=task_data["stage"],
                            priority=task_data["priority"],
                            user_id=userId  # Lưu ID người dùng vào nhiệm vụ
                        )

                        # Thêm đối tượng vào session của SQLAlchemy
                        db.add(db_task)

                    # Commit để lưu vào cơ sở dữ liệu
                    db.commit()

                    formatted_response = "Kế hoạch đã được tạo và các nhiệm vụ đã được lưu vào cơ sở dữ liệu."
                else:
                    raise ValueError("Phản hồi không chứa dữ liệu JSON hợp lệ.")

            except (json.JSONDecodeError, ValueError) as e:
                # Nếu phản hồi không phải là JSON hợp lệ, tạo nhiệm vụ mặc định
                formatted_response = "Dữ liệu không hợp lệ, tạo nhiệm vụ mặc định."

                # Nhiệm vụ mặc định
                formatted_tasks = [
                    {
                        "title": "Tập Cardio",
                        "priority": "HIGH",
                        "stage": "START"
                    },
                    {
                        "title": "Tập sức mạnh",
                        "priority": "MEDIUM",
                        "stage": "INPROGRESS"
                    },
                    {
                        "title": "Tập yoga",
                        "priority": "NORMAL",
                        "stage": "COMPLETED"
                    },
                    {
                        "title": "Chạy bộ",
                        "priority": "HIGH",
                        "stage": "START"
                    },
                    {
                        "title": "Tập thể dục với tạ",
                        "priority": "NORMAL",
                        "stage": "INPROGRESS"
                    }
                ]

                # Lưu nhiệm vụ mặc định vào cơ sở dữ liệu
                for task in formatted_tasks:
                    db_task = Task(
                        title=task["title"],
                        stage=task["stage"],
                        priority=task["priority"],
                        user_id=userId  # Lưu ID người dùng vào nhiệm vụ
                    )
                    db.add(db_task)

                # Commit để lưu vào cơ sở dữ liệu
                db.commit()

                formatted_response = "Kế hoạch đã được tạo, hãy tới nhiệm vụ và xem chi tiết nó nhé!"

        else:
            # Nếu không có từ khóa "kế hoạch", trả về phản hồi bình thường từ API
            completion = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": f"Bạn trợ lý sức khỏe. Thông tin sức khỏe: {user_info}"},
                    {"role": "user", "content": user_input}
                ]
            )
            response_text = completion['choices'][0]['message']['content']
            formatted_response = response_text.replace("*", "").replace("\n", "<br>").replace("- ", "<br>- ")

        return [{"text": formatted_response, "is_task": False}], None

    except Exception as e:
        # Xử lý lỗi và trả về thông báo lỗi
        return [{"text": f"Lỗi: {str(e)}", "is_task": False}], None







def get_user_profile(user_id: int, db: Session) -> str:
    """Truy vấn thông tin người dùng từ bảng UserProfile"""
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    
    if profile:
        # Chuyển đổi thông tin thành chuỗi để gửi tới API ChatGPT
        user_info = (
            f"Name: {profile.name}\n"
            f"Goal: {profile.goal}\n"
            f"Gender: {profile.gender}\n"
            f"Age: {profile.age}\n"
            f"Height: {profile.height} cm\n"
            f"Weight: {profile.weight} kg\n"
            f"Health History: {profile.health_history}"
        )
        return user_info
    return "User profile not found. Please update your profile."



@app.post("/chat", response_class=JSONResponse)
async def chat(user_input: str = Form(...), current_user: User = Depends(get_curent_user), db: Session = Depends(get_db)):
    """Handles user chat input."""

    userId = current_user.id

    user_info = get_user_profile(userId, db)
    
    
    # Nếu không có thông tin người dùng, trả về lỗi
    if not user_info:
        return JSONResponse({"error": "User profile not found. Please update your profile."}, status_code=400)

    response_messages, _ = generate_response(user_input, user_info, db, userId)
    
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