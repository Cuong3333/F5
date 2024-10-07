from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
import os

# connStr = "postgresql://postgres:0979171860sang@localhost/PostsApp"

load_dotenv()

connStr = os.getenv('DB_HOST')

engine = create_engine(connStr)

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = sessionLocal()

    try:
        yield db
    finally:
        db.close()
