# Le Maître — Sistema de Restaurante

Sistema de restaurante baseado em microsserviços. O cliente pode consultar o cardápio, criar uma conta, montar o carrinho, criar pedidos e acompanhar o resultado do pagamento.

## Arquitetura

O projeto possui os seguintes serviços:

| Serviço | Porta local | Responsabilidade |
| --- | ---: | --- |
| Frontend | 5178 | Interface React do cliente. |
| Product Service | 8000 | Cardápio, preços e disponibilidade dos produtos. |
| Order Service | 8001 | Criação, consulta e atualização dos pedidos. |
| User Service | 8002 | Cadastro, login e emissão do token de acesso. |
| Payment Service | 8003 | Simulação do processamento de pagamento. |
| Notification Service | 8004 | Registro dos eventos que gerariam notificações ao cliente. |
| RabbitMQ | 5672 / 15672 | Comunicação assíncrona entre os serviços. |

## Fluxo de um pedido

1. O cliente se cadastra ou entra na aplicação.
2. O frontend consulta o Product Service para mostrar o cardápio.
3. Ao finalizar o carrinho, o frontend envia os itens ao Order Service.
4. O Order Service consulta o Product Service, valida preços e disponibilidade e cria o pedido.
5. O Order Service publica o evento `order.created` no RabbitMQ.
6. O Payment Service consome o evento e publica `payment.processed` com o resultado simulado.
7. O Order Service recebe o resultado e atualiza o status do pedido.
8. O Notification Service recebe os eventos e os registra como notificações.

## RabbitMQ

O RabbitMQ é o intermediário de mensagens do sistema. Ele permite que os serviços trabalhem de forma desacoplada: o serviço de pedidos publica um evento e os serviços de pagamento e notificação o recebem sem que o Order Service precise esperar por eles.

Com Docker em execução, o painel do RabbitMQ está disponível em `http://localhost:15672` (usuário e senha padrão: `guest`).

## Executar com Docker

Com Docker Desktop aberto, na raiz do projeto execute:

```powershell
docker compose up --build -d
```

O Docker inicia o frontend, os microsserviços e o RabbitMQ. Depois abra `http://127.0.0.1:5178`.

Para encerrar os contêineres:

```powershell
docker compose down
```

## Executar sem Docker

Crie o ambiente Python e instale as dependências de cada serviço:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r product-service\requirements.txt
.\.venv\Scripts\python.exe -m pip install -r order-service\requirements.txt
.\.venv\Scripts\python.exe -m pip install -r user-service\requirements.txt
cd frontend
npm.cmd ci
```

Inicie cada serviço em um terminal separado:

```powershell
cd product-service
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

```powershell
cd user-service
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8002
```

```powershell
cd order-service
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

```powershell
cd frontend
npm.cmd run dev -- --host 127.0.0.1 --port 5178 --strictPort
```

Sem o Docker, Product, User, Order e Frontend funcionam normalmente. Para usar o processamento assíncrono de pagamentos e notificações, inicie todos os serviços com Docker Compose e RabbitMQ.

## APIs

- Product Service: `http://127.0.0.1:8000/docs`
- Order Service: `http://127.0.0.1:8001/docs`
- User Service: `http://127.0.0.1:8002/docs`
- Payment Service: `http://127.0.0.1:8003/docs`
- Notification Service: `http://127.0.0.1:8004/docs`

## Estado atual e próximos passos

- O catálogo, usuários, pedidos, pagamentos simulados e notificações estão armazenados em memória. Eles serão integrados ao banco de dados desenvolvido pelo outro integrante.
- O Payment Service ainda é uma simulação; não há cobrança real.
- O Notification Service registra eventos, mas ainda não envia e-mails, mensagens ou notificações visuais.
- Para produção, os segredos devem ficar em variáveis de ambiente seguras e a autenticação deve ser reforçada.

## Validação

```powershell
cd frontend
npm.cmd run lint
npm.cmd run build
```

```powershell
cd order-service
..\.venv\Scripts\python.exe -m pytest tests\api tests\unit -q
```
