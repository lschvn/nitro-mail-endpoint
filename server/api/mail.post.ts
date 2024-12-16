import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {

    type EmailBody = {
        to: string;
        from: string;
        subject: string;
        html: string;
        auth_key: string;
    }

    const body = await readBody<EmailBody>(event);
    console.log(body);

    const config = useRuntimeConfig(event);

    if (body.auth_key !== config.auth_key) {
        throw new Error("Invalid auth key");
    }

    const transporter = nodemailer.createTransport({
        host: config.smtp_host,
        port: config.smtp_port,
        secure: false,
        auth: {
            user: config.smtp_user,
            pass: config.smtp_password
        }
    });

    const mailOptions = {
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html
    };

    await transporter.sendMail(mailOptions);

    return new Response("Email sent", {status: 200});
});