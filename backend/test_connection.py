from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Kết nối đến cơ sở dữ liệu
connStr = "postgresql://wellgreen:FP4L3fKXFCMR@103.216.116.142:5432/wellgreen"
engine = create_engine(connStr)

# Tạo một phiên làm việc
Session = sessionmaker(bind=engine)
session = Session()

try:
    # Kiểm tra kết nối bằng cách lấy danh sách các bảng
    result = session.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
    tables = result.fetchall()
    print("Tables in database:", tables)
except Exception as e:
    print("Error connecting to database:", e)
finally:
    session.close()
