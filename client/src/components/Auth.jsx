import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

//Images
import signinImage from '../assets/signup.jpg'


const cookies = new Cookies()

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''

}

const Auth = () => {

    const [form, setform] = useState(initialState) //Set Form Default Values to an Empty string
    const [isSignup, setIsSignup] = useState(true) //If on Signup then true else false
   

    const handleChange = (e) =>{
        setform({...form, [e.target.name]: e.target.value}) //Set the form values
    
    }

    const handleSubmit = async (e) =>{
       e.preventDefault() //Prevent the page from refreshing 
       const {fullName, username, password, confirmPassword, phoneNumber, avatarURL} = form //Destructure the form values

       const URL = 'http://localhost:5000/auth'

       const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,{
        username, password, fullName, phoneNumber, avatarURL,
       }) //Make a post request to the server with the form values and passing all its data destructured

       //Setting up user info in cookies

       cookies.set('token',token)  
       cookies.set('username',username)
       cookies.set('fullName',fullName)
       cookies.set('userId',userId)

       if (isSignup) {
        cookies.set('phoneNumber',phoneNumber)
        cookies.set('avatarURL',avatarURL)
        cookies.set('hashedPassword',hashedPassword)
       
       }
       window.location.reload() //Reload the page
    
    }

    
       
    

    //toggle between Signup and Signin
    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }
 // MAIN form from where we will take the data from the user and send it to the handleSubmit() function
  return (
    <div className='auth__form-container'>
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
            <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
            
            <form action="" onSubmit={handleSubmit}>
                <button>{isSignup ? 'Sign Up OAuth' : 'Sign In OAuth'}</button>
                {isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" placeholder='Full Name' onChange={handleChange} required/>
                    </div>
                )}

                    {/*Required Both on Signup And Signin*/}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder='Username' onChange={handleChange} required/>
                    </div>
                {isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="phoneNumber">Phone No.</label>
                        <input type="text" name="phoneNumber" placeholder='Phone No.' onChange={handleChange} required/>
                    </div>
                )}
                {isSignup && (
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="avatarURL">Avatar URL</label>
                        <input type="text" name="avatarURL" placeholder='Avatar URL' onChange={handleChange} required/>
                    </div>
                )}

                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Password' onChange={handleChange} required/>
                    </div>
                
                {isSignup && (
                    <div className="auth__form-container_fields-content_input">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} required/>
                    </div>
                )}

                <div className="auth__form-container_fields-content_button">
                    <button>{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </div>

            </form>
            <div className="auth__form-container_fields-account">
                <p>
                    {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
                
                    <span onClick={switchMode}>
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>
            </div>


        </div>

      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="signin" />
      </div>
    </div>
  )
}

export default Auth