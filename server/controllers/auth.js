const { connect } = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')

const signup = async (req,res) => {
    try {
        const { fullName , username , password , phoneNumber }= req.body //We request this data from the frontend

        const userId = crypto.randomBytes(16).toString('hex') //Encrypting User Data into a Randomly generated Hexdecimal String

        const serverClient = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID)
        
        const hashedPassword = await bcrypt.hash(password, 10) //Hashing the Password

        const token = serverClient.createUserToken(userId) //Creating a User Token for the User

        res.status(200).json({ token , fullName , username , userId , hashedPassword , phoneNumber})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : error})       
    
    
}
}

const login = async(req,res) => {
    try {
        const { username , password  }= req.body
        
        const serverClient = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET, process.env.STREAM_APP_ID)

        const client = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)

        const { users } = await client.queryUsers({ name: username }) //We take the username and run a query against all users to check it it exists

        if(!users.length) return res.status(400).json({ message : 'User not found'}) //If the user is not found we return an error

        const success = await bcrypt.compare(password, users[0].hashedPassword) //If the user is found we compare the password with the hashed password

        const token = serverClient.createUserToken(users[0].id) //Creating a User Token for the User

        if (success) {
            res.status(200).json({ token , fullName : users[0].fullName , username , userId : users[0].id})
        }
        else {
            res.status(500).json({message : 'Incorrect Password'}) //If the password is incorrect we return an error
        }
        
    
    
    }
    
        
     catch (error) {
        console.log(error)
        res.status(500).json({message : error})
     }
    
    
}



module.exports = { signup , login }