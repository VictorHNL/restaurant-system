import json, os, threading, time
import pika
from fastapi import FastAPI
app=FastAPI(title="Notification Service"); notifications=[]
AMQP=os.getenv("AMQP_URL","amqp://guest:guest@rabbitmq:5672/%2F")
def consume():
    while True:
        try:
            conn=pika.BlockingConnection(pika.URLParameters(AMQP)); ch=conn.channel()
            ch.exchange_declare(exchange="restaurant.events",exchange_type="topic",durable=True)
            q=ch.queue_declare(queue="notifications",durable=True).method.queue; ch.queue_bind(q,"restaurant.events","#")
            def callback(channel,method,_,body):
                if method.routing_key in {"order.created","payment.processed","order.status.updated"}:
                    notifications.append({"event":method.routing_key,"data":json.loads(body)})
                channel.basic_ack(method.delivery_tag)
            ch.basic_consume(q,callback); ch.start_consuming()
        except Exception: time.sleep(3)
@app.on_event("startup")
def start(): threading.Thread(target=consume,daemon=True).start()
@app.get("/notifications")
def list_notifications(): return list(reversed(notifications))
@app.get("/health")
def health(): return {"status":"healthy","service":"notification-service"}
