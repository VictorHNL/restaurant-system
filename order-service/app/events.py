import json, os
import pika

AMQP_URL = os.getenv("AMQP_URL", "amqp://guest:guest@rabbitmq:5672/%2F")
def publish(key: str, payload: dict):
    try:
        connection = pika.BlockingConnection(pika.URLParameters(AMQP_URL))
        channel = connection.channel()
        channel.exchange_declare(exchange="restaurant.events", exchange_type="topic", durable=True)
        channel.basic_publish("restaurant.events", key, json.dumps(payload).encode())
        connection.close()
    except Exception:
        # A pedido permanece em estado consistente e poderá ser reconciliado.
        return False
    return True
