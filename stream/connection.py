import os
import aioredis
import redis
from dotenv import load_dotenv

load_dotenv()

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
db = aioredis.from_url(redis_url)
db_sync = redis.from_url(redis_url)