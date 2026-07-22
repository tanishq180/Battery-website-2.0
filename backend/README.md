# Import/Export Business Web Application - Backend

Complete modular FastAPI backend built with SQLAlchemy ORM models, PostgreSQL database migrations via Alembic, JWT authentication security, public product catalog, B2B quote inquiry submission, protected admin dashboard CRUD, transactional email notifications (Resend/SendGrid), non-blocking background tasks, and pre-filled WhatsApp click-to-chat integration.

---

## 📁 Project Structure

```text
backend/
├── app/
│   ├── api/
│   │   ├── deps.py            # Auth & DB session dependencies (get_current_admin)
│   │   └── v1/
│   │       ├── router.py             # Primary API Router mounting all endpoints
│   │       ├── auth.py               # Admin login (/admin/login) & profile (/admin/me)
│   │       ├── categories.py         # Public category endpoint (/categories)
│   │       ├── products.py           # Public catalog & product endpoints (/products, /products/{id})
│   │       ├── enquiries.py          # Public quote enquiry submission (/enquiries with background email & WhatsApp link)
│   │       ├── admin_products.py     # Protected admin product CRUD (/admin/products)
│   │       └── admin_enquiries.py    # Protected admin lead dashboard (/admin/enquiries)
│   ├── core/
│   │   ├── config.py          # Pydantic Settings for DB, JWT, Email API, & WhatsApp
│   │   ├── database.py        # SQLAlchemy Engine, SessionLocal & Base setup
│   │   ├── mail.py            # Transactional HTML email compilation & dispatch utilities
│   │   └── security.py        # Password hashing & JWT token helpers
│   ├── crud/                  # Database CRUD query operations
│   │   ├── __init__.py
│   │   ├── crud_category.py   # Category query handlers
│   │   ├── crud_product.py    # Product & price tier CRUD handlers
│   │   └── crud_enquiry.py    # Enquiry & status update handlers
│   ├── models/                # SQLAlchemy ORM Models
│   │   ├── __init__.py
│   │   ├── user.py            # User model
│   │   ├── category.py        # Category model
│   │   ├── product.py         # Product model (with JSONB use_cases)
│   │   ├── price_tier.py      # PriceTier model
│   │   └── enquiry.py         # Enquiry model
│   ├── schemas/               # Pydantic validation & serialization schemas
│   │   ├── __init__.py
│   │   ├── auth.py            # Auth schemas
│   │   ├── category.py        # Category schemas
│   │   ├── product.py         # Product & PriceTier schemas
│   │   └── enquiry.py         # Enquiry schemas (includes whatsapp_url response field)
│   ├── services/              # Business logic & external integrations
│   │   ├── __init__.py
│   │   └── whatsapp.py        # WhatsApp click-to-chat deep-link generator
│   ├── templates/             # Jinja2 HTML Email Templates
│   │   ├── customer_ack.html  # Customer quote acknowledgment email
│   │   └── admin_notify.html  # Sales staff new lead alert email
│   └── main.py                # FastAPI entry point
├── alembic/                   # Alembic migration files
│   ├── versions/
│   │   └── 001_initial_schema_setup.py
│   ├── env.py
│   └── script.py.mako
├── scripts/
│   └── seed_admin.py          # Admin user seeding script
├── alembic.ini
├── .env
├── .env.example
├── requirements.txt
└── README.md
```

---

## 🛠️ Setup & Running

### 1. Virtual Environment Activation
```powershell
cd backend
.\venv\Scripts\Activate.ps1
```

### 2. Database Migrations & Admin Seeding
```powershell
# Run database migrations
alembic upgrade head

# Seed initial admin user (admin@company.com / AdminPassword123!)
python scripts/seed_admin.py
```

### 3. Development Server
```powershell
uvicorn app.main:app --reload
```

---

## ⚙️ Environment Variables Configuration (`.env`)

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/import_export_db
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Email Configuration (Resend or SendGrid API Key)
EMAIL_API_KEY=re_123456789
SENDER_EMAIL=quotes@yourimportexport.com
ADMIN_NOTIFICATION_EMAIL=sales@yourimportexport.com

# WhatsApp Business Contact Number (E.164 without + or dashes)
WHATSAPP_BUSINESS_NUMBER=15550192834
```

---

## 📡 Complete API Endpoint Matrix

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/admin/login` | Public | Admin login issuing JWT bearer access token |
| `GET` | `/api/v1/admin/me` | Admin | Fetch logged-in admin profile |
| `GET` | `/api/v1/categories` | Public | Retrieve all product categories |
| `GET` | `/api/v1/products` | Public | Paginated products (`search`, `category_slug`, `page`, `size`) |
| `GET` | `/api/v1/products/{id}` | Public | Get single product with price break tiers |
| `POST` | `/api/v1/enquiries` | Public | Submit customer quote request (Triggers background email & returns `whatsapp_url`) |
| `POST` | `/api/v1/admin/products` | Admin | Create new product with price tiers (HTTP 201 Created) |
| `PUT` | `/api/v1/admin/products/{id}` | Admin | Update product details & price break tiers |
| `DELETE` | `/api/v1/admin/products/{id}` | Admin | Delete product and cascade remove price tiers |
| `GET` | `/api/v1/admin/enquiries` | Admin | Paginated lead dashboard filtered by status (`Received` / `Attended`) |
| `PATCH` | `/api/v1/admin/enquiries/{id}/status` | Admin | Update enquiry status (`Received`/`Attended`) and append internal log notes |
