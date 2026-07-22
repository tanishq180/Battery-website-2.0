# Import/Export Business Web Application

A full-stack, enterprise-grade Import/Export Business Web Application built with **FastAPI**, **PostgreSQL**, **SQLAlchemy ORM**, **Alembic**, **Next.js 14 (App Router)**, **Tailwind CSS**, **Nginx**, and **Docker**.

---

## 🏛️ System Architecture

```text
                                  +-------------------+
                                  |   Client Browser  |
                                  +---------+---------+
                                            |
                                            v  (Ports 80 / 443)
                                  +---------+---------+
                                  |   Nginx Proxy     |
                                  +----+---------+----+
                                       |         |
                     /api/* & /docs    |         |  / (All web routes)
                                       v         v
                     +-----------------+--+   +--+----------------+
                     | FastAPI Backend    |   | Next.js Frontend  |
                     | (Python / Uvicorn) |   | (Node.js App)     |
                     +--------+-----------+   +-------------------+
                              |
                              v
                     +--------+-----------+
                     | PostgreSQL Database|
                     +--------------------+
```

---

## 🚀 Key Features

- **Public Product Catalog & Dynamic Calculator**: Search & filter products by category, inspect tier-based bulk volume breaks, calculate custom pricing in real-time, and generate pre-filled WhatsApp quote links.
- **Request for Quote (RFQ) Form**: Client-side validation, transactional email acknowledgments (Resend API / HTML templates), and backend background tasks.
- **Administrative Portal**: JWT authentication (`HS256`, 24h expiry), role-based middleware guards, executive dashboard, full product CRUD with **Dynamic Price Tier Builder**, and lead status tracking with internal communication logs.
- **Enterprise DevOps Pipeline**: Multi-stage Docker containerization, Docker Compose orchestration, Nginx reverse proxying with SSL security headers, and automated GitHub Actions CI/CD.

---

## 🛠️ Quick Start Guide

### Option 1: Docker Multi-Container Composition (Recommended for Production & Testing)

1. **Clone & Configure Environment**:
   ```bash
   cp backend/.env.example .env
   ```

2. **Launch Full Stack with Docker Compose**:
   ```bash
   docker compose up -d --build
   ```
   - **Public Website**: `http://localhost`
   - **Product Catalog**: `http://localhost/products`
   - **Contact Us & RFQ**: `http://localhost/contact`
   - **Admin Portal**: `http://localhost/admin/login` (Seed: `admin@company.com` / `AdminPassword123!`)
   - **FastAPI OpenAPI Docs**: `http://localhost/docs`

---

### Option 2: Local Development Setup (Manual)

#### 1. Backend Setup (FastAPI & SQLite / PostgreSQL):
```bash
cd backend

# Create & activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows
source venv/bin/activate      # On Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Run Alembic migrations & seed admin user
alembic upgrade head
python scripts/seed_admin.py

# Start FastAPI dev server
uvicorn app.main:app --reload
```
Backend API will run at `http://127.0.0.1:8000`.

#### 2. Frontend Setup (Next.js 14):
```bash
cd frontend

# Install npm dependencies
npm install

# Start Next.js dev server
npm run dev
```
Frontend web application will run at `http://localhost:3000`.

---

## 📡 API Endpoint Matrix

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/categories` | Public | Fetch all product categories |
| `GET` | `/api/v1/products` | Public | Browse catalog with keyword search & pagination |
| `GET` | `/api/v1/products/{id}` | Public | Fetch product details & quantity price tiers |
| `POST` | `/api/v1/enquiries` | Public | Submit RFQ inquiry (triggers background emails) |
| `POST` | `/api/v1/admin/login` | Public | Authenticate staff admin & obtain JWT token |
| `GET` | `/api/v1/admin/me` | Protected | Verify active admin JWT session |
| `POST` | `/api/v1/admin/products` | Admin | Create product with volume price breaks |
| `PUT` | `/api/v1/admin/products/{id}` | Admin | Update product & replace price breaks |
| `DELETE`| `/api/v1/admin/products/{id}` | Admin | Delete product from catalog |
| `GET` | `/api/v1/admin/enquiries` | Admin | Fetch leads filtered by status (`Received`/`Attended`)|
| `PATCH` | `/api/v1/admin/enquiries/{id}/status`| Admin | Update lead status & append internal log notes |

---

## 🛡️ Production Security & SSL Setup

1. **Security Headers**:
   Nginx is configured in `nginx/nginx.conf` with `X-Frame-Options SAMEORIGIN`, `X-Content-Type-Options nosniff`, `X-XSS-Protection "1; mode=block"`, and Content-Security-Policy headers.

2. **SSL / TLS Certificate Provisioning**:
   Mount your Let's Encrypt certificates into `nginx/ssl/` and uncomment the Port 443 HTTPS block in `nginx/nginx.conf`.

---

## 📄 License & Credits
Developed for International Trade & Wholesale Import/Export Operations. All rights reserved.
