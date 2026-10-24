# VoltEdge Batteries — Battery Industry Website

A full-stack battery catalog, business enquiry, and administration website built with **FastAPI**, **PostgreSQL**, **SQLAlchemy ORM**, **Alembic**, **Next.js 14 (App Router)**, **Tailwind CSS**, **Nginx**, and **Docker**.

---


## Battery website update

The public website uses the working brand **VoltEdge Batteries**, with automotive, inverter/UPS, solar storage, and industrial battery ranges. It includes bundled SVG product concepts, responsive navigation, category links, catalog search, battery detail pages, and application-specific quote requests.

- Battery ranges and artwork are illustrative demo content, not verified stock or technical specifications. Confirm real company branding, models, prices, warranty terms, and contact details before launch.
- A fresh backend database seeds six battery ranges across four categories. Existing inventory is preserved. Manage existing records through the staff portal.
- If the API is unavailable, the public catalog shows labelled illustrative ranges. Search, category filters, and detail pages still work; enquiry submission needs the API. Demo selections are sent as general enquiries with the range name in the message, never as database product IDs.
- Configure a real `WHATSAPP_BUSINESS_NUMBER` in `backend/.env` and `NEXT_PUBLIC_WHATSAPP_NUMBER` in `frontend/.env.local` to enable WhatsApp links. No placeholder business number is shown.


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

### Option 1: 1-Click Automated Setup (Windows / PowerShell)

1. **First-time Setup** (Installs all dependencies, prepares environment files, and seeds the database):
   ```powershell
   .\setup.ps1
   # OR double-click setup.bat
   ```

2. **Start Both Services** (Launches Backend & Frontend concurrently):
   ```powershell
   .\start.ps1
   # OR double-click start.bat
   ```
   - **Frontend Web App**: `http://localhost:3000`
   - **Product Catalog**: `http://localhost:3000/products`
   - **Admin Portal**: `http://localhost:3000/admin/login` (Login: `admin@company.com` / `AdminPassword123!`)
   - **Backend OpenAPI Docs**: `http://127.0.0.1:8000/docs`

---

### Option 2: Docker Multi-Container Composition (Docker Desktop)

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

### Option 3: Local Development Setup (Manual)

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
Built for battery product discovery, application guidance, and business enquiries.
