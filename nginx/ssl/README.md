# SSL Certificate Mounts & Let's Encrypt Setup

Place your SSL certificates in this directory or use Let's Encrypt Certbot to automatically provision TLS certificates for your domain.

### Let's Encrypt Provisioning Command:
```bash
docker run -it --rm --name certbot \
  -v "$(pwd)/nginx/ssl:/etc/letsencrypt" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot \
  -w /var/www/certbot \
  -d yourdomain.com -d www.yourdomain.com
```
