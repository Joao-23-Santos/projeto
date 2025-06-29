const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/enviar-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Configura o transporte (exemplo para Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // define no Render
            pass: process.env.EMAIL_PASS  // define no Render
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // o teu email
        subject: `Novo contacto de ${nome}`,
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ mensagem: 'Email enviado com sucesso!' });
    } catch (err) {
        res.status(500).json({ mensagem: 'Erro ao enviar email.' });
    }
});

// Render exige que uses process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));