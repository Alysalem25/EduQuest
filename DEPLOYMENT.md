# EduQuest VPS Deployment Guide

This guide documents all the necessary steps to deploy the **EduQuest** application on an Ubuntu Linux VPS using **Node.js, PM2, MongoDB, Nginx, and SSL (Certbot)**.

---

## Server Information

- **VPS IP:** `191.218.162.173`
- **Domain:** `eqraa.me`
- **OS:** Ubuntu 22.04 / 24.04 LTS
- **Application Directory:** `/var/www/EduQuest`

---

## 1. Prerequisites & Initial Server Setup

SSH into your server:
```bash
ssh root@191.218.162.173
```

Update system packages and install basic utilities:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl gnupg nginx
```

### Install Node.js (v20 LTS) & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

---

## 2. Install & Configure MongoDB

Install MongoDB Community Edition 7.0 on the VPS:

```bash
# 1. Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# 2. Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# 4. Start & enable MongoDB service on boot
sudo systemctl start mongod
sudo systemctl enable mongod

# 5. Check status
sudo systemctl status mongod
```

---

## 3. Clone Repository & Setup Environment

```bash
# Navigate to web root
cd /var/www

# Clone repository
sudo git clone https://github.com/Alysalem25/EduQuest.git
cd EduQuest
```

### Backend Setup & Environment Variables
```bash
cd /var/www/EduQuest/server
npm install

# Create environment file
nano .env
```

Add the following to `/var/www/EduQuest/server/.env`:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/EduQuest
JWT_SECRET=your_secure_random_jwt_secret_here
CLIENT_URL=http://eqraa.me
JWT_EXPIRE=7d
```

### Start Backend Process with PM2
```bash
pm2 start app.js --name "eduquest-api"
pm2 save
pm2 startup
```

---

## 4. Build Frontend

```bash
cd /var/www/EduQuest/client

# Create/update client environment file
nano .env
```
Add:
```env
VITE_API_URL=http://eqraa.me
```

Install dependencies and build production bundle:
```bash
npm install
npm run build
```
*(The build output will be generated inside `/var/www/EduQuest/client/dist`)*.

---

## 5. Configure Nginx Web Server

Create Nginx site configuration file:
```bash
sudo nano /etc/nginx/sites-available/eduquest
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name eqraa.me www.eqraa.me 191.218.162.173;

    # Serve built React frontend
    root /var/www/EduQuest/client/dist;
    index index.html;

    # React Router fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy backend API calls to Node.js / Express
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -sf /etc/nginx/sites-available/eduquest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. Configure SSL Certificate (HTTPS)

Once DNS for `eqraa.me` is pointing to `191.218.162.173`, run Certbot to enable HTTPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d eqraa.me -d www.eqraa.me
```
Follow the interactive prompts to enable SSL redirection.

---

## 7. Creating Admin Account

To register an initial admin account via HTTP request:

```bash
curl -X POST http://eqraa.me/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@eqraa.me",
    "password": "YourSecurePassword123",
    "role": "admin",
    "number": "01281518900"
  }'
```

---

## 8. Deployment Maintenance & Updates

When updating the application code in the future:

```bash
cd /var/www/EduQuest
git pull origin main

# Update Backend
cd /var/www/EduQuest/server
npm install
pm2 restart eduquest-api

# Update Frontend
cd /var/www/EduQuest/client
npm install
npm run build
```

---

### Useful Status & Log Commands
- **Check Backend status:** `pm2 status`
- **Check Backend logs:** `pm2 logs eduquest-api`
- **Check Nginx status:** `sudo systemctl status nginx`
- **Check MongoDB status:** `sudo systemctl status mongod`
