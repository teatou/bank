import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'

export default function Log() {
    const [formData, setFormData] = useState(LoginForm)

    return (
        <div>
            <div className='switcher'>
                <input type="radio" id="login" name="switch" value="login" />
                <label for="login">login</label>

                <input type="radio" id="signup" name="switch" value="signup" />
                <label for="signup">signup</label>
            </div>
            <div className='form'>
                <formData/>
            </div>
        </div>
    )
}
