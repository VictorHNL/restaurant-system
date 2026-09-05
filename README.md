# Le Maître — sistema de restaurante

Frontend React/Vite e APIs FastAPI de produtos e pedidos.

## Executar localmente (PowerShell)

Na raiz, crie o ambiente Python e instale as dependências:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r order-service/requirements.txt
cd frontend
npm.cmd ci
```

Em três terminais separados, a partir da raiz:

```powershell
cd product-service
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

```powershell
cd order-service
..\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

```powershell
cd frontend
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Abra http://127.0.0.1:5173/cardapio. As APIs estão documentadas em
http://127.0.0.1:8000/docs e http://127.0.0.1:8001/docs.
Como alternativa, o backend pode ser iniciado com `docker compose up --build`.

## Integração implementada

- Cardápio e destaques consultam o Product Service; imagens são locais por categoria.
- O catálogo inicial de 11 produtos está no repositório Python em memória.
- Finalizar o carrinho envia somente IDs e quantidades à API de pedidos.
- A API consulta preços e disponibilidade, calcula subtotais e total e retorna 201.
- Pedidos recebem ID, data UTC, itens e estado CRIADO.
- A lista e a tela de detalhes consultam os pedidos registrados.
- Falhas preservam o carrinho; cliques repetidos são bloqueados durante o envio.
- CORS aceita localhost:5173 e 127.0.0.1:5173.

O contrato de POST/PUT /orders mudou: o corpo antigo com product_id e quantity
deve ser substituído por uma lista de itens:

```json
{"items": [{"product_id": 1, "quantity": 2}, {"product_id": 4, "quantity": 1}]}
```

O servidor rejeita lista vazia, quantidade inválida, produto inexistente ou indisponível.
Itens repetidos são somados, com limite de 100 unidades por produto.
Nenhum pedido parcial é salvo quando uma validação falha.

## Configuração

- Backend: CORS_ORIGINS (origens separadas por vírgula).
- Order Service: PRODUCT_SERVICE_URL (padrão http://localhost:8000; Docker usa http://product-service:8000).
- Frontend: VITE_PRODUCT_API_URL e VITE_ORDER_API_URL, definidas no ambiente do Vite.

## Validação

No frontend: `npm.cmd run build` e `npm.cmd run lint`.
Em cada serviço: `..\.venv\Scripts\python.exe -m pytest -q`.
Os testes de integração do Order Service exigem Product Service ativo na porta 8000.

## Limites desta etapa

Persistência em memória: reiniciar os serviços perde produtos alterados e pedidos.
A implementação do banco fica com o integrante responsável; ainda será preciso integrar sua camada de persistência.
Não há autenticação nem separação de pedidos por usuário. Login/cadastro continuam sendo telas demonstrativas.
Pagamento, evolução dos estados, notificações, gateway e mensageria são etapas futuras.
O carrinho não persiste ao recarregar a página.
Esta etapa impede cliques duplicados durante o envio, mas ainda não implementa idempotência para novas tentativas após falha de rede.
Nenhum pagamento real é executado.
