const express = require('express') 
const cors = require('cors') //cross origin request

const authRoutes = require('./routes/auth.js')

const app = express()
const PORT = process.env.PORT || 5000;

require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

//Handles requests and responses
app.get('/', (req, res) => {
    res.send('Hello World!')


});

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body

    if (type === 'message.new') {
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if (!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        from: '+14199494749',
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err));
                }
            })

        return res.status(200).send('Message sent!');
    
    }
    return res.status(200).send('Misc Actitivity');
});

app.use('/auth', authRoutes) //authRoutes is a function that returns a router object

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))