# Nitro Mail Endpoint

**Problem Statement**  
Cloudflare Workers (running on the Edge) do not allow sending emails directly. This repository provides a simple, lightweight endpoint that you can call from your Cloudflare Worker (or any other client) to send emails via SMTP. This endpoint requires an `auth_key` for authorization and is configured through environment variables.

---

## How It Works

1. **Cloudflare Worker or Other Client** calls this endpoint and includes:
   - `to` email address
   - `from` email address
   - `subject`
   - `html` content
   - `auth_key` (for authorization)

2. **Email Endpoint** verifies the `auth_key` against your environment variable.
3. **Email Endpoint** uses [nodemailer](https://nodemailer.com/) to send the email through your specified SMTP server.
4. **Response** is returned indicating success or error.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lschvn/nitro-mail-endpoint.git
cd nitro-mail-endpoint
```

### 2. Install Dependencies

```bash
npm install
```

*(Or use your preferred package manager.)*

### 3. Set Environment Variables

Create a `.env` file (or use your platform’s environment variable configuration) with the following variables:

```env
NITRO_AUTH_KEY=
NITRO_SMTP_HOST=
NITRO_SMTP_PORT=
NITRO_SMTP_USER=
NITRO_SMTP_PASSWORD=
```

| Variable              | Description                                                               |
|-----------------------|---------------------------------------------------------------------------|
| `NITRO_AUTH_KEY`      | A key used to authorize requests to your endpoint.                        |
| `NITRO_SMTP_HOST`     | Host address of your SMTP provider (e.g., `smtp.gmail.com`).              |
| `NITRO_SMTP_PORT`     | Port used for SMTP (e.g., `587`).                                         |
| `NITRO_SMTP_USER`     | Username for your SMTP authentication.                                    |
| `NITRO_SMTP_PASSWORD` | Password for your SMTP authentication.                                    |

### 4. Run the Server

Depending on your setup (e.g., Nuxt/Nitro or a standalone Node server):

```bash
npm run dev
```

The endpoint will be available at (for example) `http://localhost:3000/api/email` (adjust to your actual route if necessary).

---

## Usage

### Request Body

When calling this endpoint, your JSON payload must have the following fields:

- `to`: Recipient’s email address
- `from`: Sender’s email address
- `subject`: Email subject line
- `html`: Body of the email in HTML
- `auth_key`: Must match `NITRO_AUTH_KEY` from your environment variables

### Example cURL Request

```bash
curl -X POST \
  http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "from": "sender@example.com",
    "subject": "Hello from the Edge!",
    "html": "<p>This is a test email.</p>",
    "auth_key": "YOUR_AUTH_KEY"
  }'
```

## Contributing

Feel free to open an [issue](../../issues) or a [pull request](../../pulls) for any improvements, suggestions, or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE). You’re free to modify, distribute, and use this code in your own projects.

---

### Thank You

Thank you for using this Cloudflare Edge Email Endpoint! If you find it useful, consider giving the repository a ⭐ on GitHub. Happy emailing!
