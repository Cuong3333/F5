from fastapi import FastAPI, Request, APIRouter, HTTPException
from ....app.logger import logger

BANDS = [
    {'id': 1, 'name': 'bts', 'genre': 'rock'},
    {'id': 2, 'name': 'black pink', 'genre': 'romatic'},
    {'id': 3, 'name': 'son tung', 'genre': 'nhac tre'}
]

router = APIRouter(tags=['demo logger'])

@router.get('/brands')
def getall(request: Request):
        # Khởi tạo biến data để ghi log
    data = {
        'ip_address': request.client.host,
        'method': request.method,
        'status_code': 200  # Mặc định là 200
    }

    logger.info(f'Yêu cầu được nhận tại {request.url}', extra=data)
    return BANDS

@router.get('/bands/{id}')
def get_bands(id: int):
    band = next((b for b in BANDS if b['id'] == id), None)
    if band is None:
        logger.info(f'Không tìm thấy brand nào có ID {id}', extra={'status_code': 404})
        return HTTPException(404, 'No band found')
    logger.info(f'Band tìm thấy với Id: {id}', extra={'status_code': 200})
    return band
