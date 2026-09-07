import json, os, threading, time
import pika
from app.services.order_service import update_payment_status

AMQP_URL=os.getenv("AMQP_URL","amqp://guest:guest@rabbitmq:5672/%2F")
def _consume():
    while True:
        try:
            conn=pika.BlockingConnection(pika.URLParameters(AMQP_URL)); ch=conn.channel()
            ch.exchange_declare(exchange="restaurant.events",exchange_type="topic",durable=True)
            q=ch.queue_declare(queue="order.payments",durable=True).method.queue
            ch.queue_bind(q,"restaurant.events","payment.processed")
            def callback(channel,method,_,body):
                data=json.loads(body); update_payment_status(data["order_id"],data["status"]); channel.basic_ack(method.delivery_tag)
            ch.basic_consume(q,callback); ch.start_consuming()
        except Exception: time.sleep(3)
def start_consumer(): threading.Thread(target=_consume,daemon=True).start()
