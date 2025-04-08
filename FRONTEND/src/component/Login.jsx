import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {Axios} from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
const Login = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState("")
    const submitHandler = async (data) => {
        console.log(data)
        try{
        const response = await Axios.post("/user/login",data)
        console.log(response.data.token);
        reset();
        setIsAuthenticated(true);
        navigate('/Properties');
        }catch(err){
            console.log(err.response.data.message)
            setMessage(err.response.data.message)
        }
    }

    return (
        <main className='Signup-login-main'>
            <div className='signup-form'>
                <h1>Login </h1>
                <button className='cls-btn'
                onClick={()=>navigate('/')}
                >
                    <i className="ri-close-large-line"></i></button>
                <hr />
                <form onSubmit={handleSubmit(submitHandler)}>
                    {/* <div className={`i-wrap`}>
                        <i className="ri-user-3-fill"></i>
                        <input type="text" placeholder="Enter Full Name"
                            {...register("userName", {
                                required: { value: true, message: "please Enter your name" },
                                minLength: { value: 2, message: "minimum length is 2" },
                                maxLength: { value: 30, message: "minimum length is 30" }
                            })}
                        />
                    </div>
                    {errors.fullname && <p className='e-msg'>{errors.fullname.message}</p>} */}


                    <div className={`i-wrap`}>
                        <i className="ri-mail-line"></i>
                        <input type="email" placeholder="email@example.com"
                            {...register("email", {
                                required: { value: true, message: "please Enter your email" },
                            })}
                        />
                    </div>
                    {errors.email && <p className='e-msg'>{errors.email.message}</p>}



                    <div className={`i-wrap`}>
                        <i className="ri-lock-line"></i>
                        <input type="Password" placeholder="Create Strong Password"
                            {...register("password", {
                                required: { value: true, message: "please Enter the password" },
                                minLength: { value: 6, message: "minimum length is : 6" }
                            })}
                        />
                    </div>
                    {errors.password && <p className='e-msg'>{errors.password.message}</p>}
                    
                    {message && <span className='text-red-500'>{message}</span>}
                    <button type="submit">Login</button>
                </form>
                <hr />

                    <div className='bottom'>
                        <p>Don't have an account ? </p>
                        <button className='switch-btn' onClick={()=>navigate('/Signup')}> create account</button>
                    </div>
                    
            </div>
        </main>
    )
   }


export default Login