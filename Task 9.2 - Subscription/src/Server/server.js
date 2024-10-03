const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51Q4xNaDRVqAMvGKsaDmchOoNxPcRwBQxBUbRZLrQhisyj6FCKKtoszw2nhHY6Tuo5GtNMW4OzzOHHsBkzARGHIjB004N9YG1S0');

const app = express();
const PORT = process.env.PORT || 5000;

const mg = new Mailgun(formData);
const client = mg.client({username: 'api', key: 'b87668d23af324b1e79498394cc88233-0f1db83d-b16a5083'});

app.use(express.json());

// Allow requests from http://localhost:3000 (front-end)
//app.use(cors({ origin: 'http://localhost:3000'}));

app.use(cors());

app.use(express.static(path.join(__dirname, '../../build'))); // Serve static files from React app

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.post('/send-welcome', async (req, res) => {
    const { email } = req.body;

    const data = {
        from: 'Excited User <tamlac20121996@gmail.com>',
        to: email,
        subject: 'Welcome to DEV@Deakin',
        
        // Including Both Versions: While just having the html field is technically sufficient for clients that support HTML, including both text and html versions ensures wider compatibility and accessibility.
        // Enhancing HTML Emails: Use HTML to make the email more appealing and user-friendly, but ensure that the plain text version is also provided for clients or users who cannot view HTML emails.
        // Best Practices: By providing both versions, you enhance the likelihood that your email is readable and accessible to all recipients, regardless of their email client or settings.
        text: 'Thank you for subscribing to DEV@Deakin. You can re-visit website here: http://localhost:3000',

        // HTML in Email Data:
        // The html field allows you to send formatted emails with clickable links and styled content.
        // Ensures compatibility with various email clients and provides a better user experience.
        html: '<p>Thank you for subscribing to DEV@Deakin. You can re-visit website <a href = "http://localhost:3000">here</a></p>'
    };

    try {
        const response = await client.messages.create('sandbox1fb334f607f146f18bcbc8124dd23510.mailgun.org', data);
        console.log('Email sent:', response);
        res.status(200).json({message: 'Welcome email sent successfully!', response});
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({error: error.message});
    }
});

// Add the Stripe checkout session creation route
app.post('/create-checkout-session', async (req, res) => {
    const { plan } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [{
                price: plan,  // plan can be the price ID from Stripe
                quantity: 1,
            }],
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel'
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/success', async (req, res) => {
    const { session_id } = req.query;
  
    try {
        // Retrieve session details from Stripe using session_id
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items']
        });
  
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
  
        // Get the price ID from the session
        const lineItems = session.line_items;
        const priceId = lineItems.data[0].price.id;
  
        // Return the priceId to the frontend
        res.status(200).json({ priceId });
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        res.status(500).json({ error: error.message });
    }
});

  

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});