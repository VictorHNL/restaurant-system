import json, os, threading, time
import pika
from fastapi import FastAPI

app = FastAPI(title="Payment Service")
AMQP = os.getenv("AMQP_URL","amqp://guest:guest@rabbitmq:5672/%2F")
outcomes: dict[int,str] = {}
def publish(event, payload):
    params=pika.URLParameters(AMQP); conn=pika.BlockingConnection(params); ch=conn.channel()
    ch.exchange_declare(exchange="restaurant.events", exchange_type="topic", durable=True)
    ch.basic_publish("restaurant.events", event, json.dumps(payload).encode()); conn.close()
def consume():
    while True:
        try:
            conn=pika.BlockingConnection(pika.URLParameters(AMQP)); ch=conn.channel()
            ch.exchange_declare(exchange="restaurant.events", exchange_type="topic", durable=True)
            q=ch.queue_declare(queue="payment.orders", durable=True).method.queue; ch.queue_bind(q,"restaurant.events","order.created")
            def callback(channel, method, _, body):
                order=json.loads(body); result=outcomes.pop(order["id"], "APPROVED")
                publish("payment.processed", {"order_id":order["id"],"status":result})
                channel.basic_ack(method.delivery_tag)
            ch.basic_consume(q,callback); ch.start_consuming()
        except Exception: time.sleep(3)
@app.on_event("startup")
def start(): threading.Thread(target=consume,daemon=True).start()
@app.post("/payments/{order_id}/outcome/{status}")
def set_outcome(order_id:int,status:str):
    status=status.upper()
    if status not in {"APPROVED","DECLINED","PENDING"}: return {"error":"Use APPROVED, DECLINED ou PENDING"}
    outcomes[order_id]=status; return {"order_id":order_id,"next_outcome":status}
@app.get("/health")
def health(): return {"status":"healthy","service":"payment-service"}
