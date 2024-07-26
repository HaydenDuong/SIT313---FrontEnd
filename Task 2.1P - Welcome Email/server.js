const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const PORT = 3000;

const mg = new Mailgun(formData);
const client = mg.client({username: 'api', key: 'b87668d23af324b1e79498394cc88233-0f1db83d-b16a5083'});

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/send-welcome', async (req, res) => {
    const { email } = req.body;

    const data = {
        from: 'Excited User <tamlac20121996@gmail.com>',
        to: email,
        subject: 'Welcome to DEV@Deakin',
        text: 'Thank you for subscribing to DEV@Deakin.'
    };

    try {
        const response = await client.messages.create('sandbox1fb334f607f146f18bcbc8124dd23510.mailgun.org', data);
        console.log('Email sent:', response); // Log the response for debugging
        res.status(200).json({message: 'Welcome email sent successfully!', response});
    } catch (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});