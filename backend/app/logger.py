import logging
import sys
from logtail import LogtailHandler
from pythonjsonlogger import jsonlogger
import json

key_token_betterStack = 'NFAxfqusVAPH1b85vWXoiHMV'

# Tạo formatter tùy chỉnh với ensure_ascii=False
class CustomJsonFormatter(jsonlogger.JsonFormatter):
    def parse(self):
        return [
            'asctime', 'levelname', 'message', 'ip_address', 'method', 'status_code'
        ]
    
    def format(self, record):
        log_record = {
            'asctime': self.formatTime(record, self.datefmt),
            'levelname': record.levelname,
            'message': record.getMessage(),
            'ip_address': getattr(record, 'ip_address', None),
            'method': getattr(record, 'method', None),
            'status_code': getattr(record, 'status_code', None)
        }
        return json.dumps(log_record, ensure_ascii=False)  # Đảm bảo không mã hóa Unicode

# get logger
logger = logging.getLogger("my_logger")

# create formatter
formatter = CustomJsonFormatter()


# create handlers
stream_handler = logging.StreamHandler(sys.stdout)
file_handler = logging.FileHandler('backend/app.log', encoding='utf-8')
better_stack_handler = LogtailHandler(source_token=key_token_betterStack)

#set formatters
stream_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

# add handlers to the logger
logger.handlers = [stream_handler, file_handler, better_stack_handler]

#set log-level
logger.setLevel(logging.INFO)
