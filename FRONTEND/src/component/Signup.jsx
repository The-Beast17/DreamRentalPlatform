import React, { useState } from 'react'
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {Axios} from '../axios/Axios';


const Signup = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitHandler = async(data) => {
        console.log(data);
        try{
        const response = await Axios.post("/user/signup",data)
        console.log(response.data);
        reset();
        setIsAuthenticated(true);
        navigate('/Properties');
        }catch(err){
            console.log(err.response.data.message)
        }
    }

    return (
        <main className='Signup-login-main'>
            <div className='signup-form'>
                <h1>Signup From</h1>
                <button className='cls-btn'
                    onClick={()=>navigate('/')}
                >
                    <i className="ri-close-large-line"></i></button>
                <hr />
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className={`i-wrap`}>
                        <i className="ri-user-3-fill"></i>
                        <input type="text" placeholder="Enter Full Name"
                            {...register("userName", {
                                required: { value: true, message: "please Enter your name" },
                                minLength: { value: 2, message: "minimum length is 2" },
                                maxLength: { value: 30, message: "minimum length is 30" }
                            })}
                        />
                    </div>
                    {errors.fullname && <p className='e-msg'>{errors.fullname.message}</p>}


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


                    <div className={`i-wrap`}>
                        <i className="ri-phone-fill"></i>
                        <input type="number" placeholder="Mobile number"
                            {...register("mobileNumber", {
                                required: { value: true, message: "please Enter your mobile number" },
                                maxLength: { value: 12, message: "minimum length is : 12" }
                            })}
                        />
                    </div>
                    {errors.mobileNumber && <p className='e-msg'>{errors.mobileNumber.message}</p>}


                    <div className='gender'>
                        <p>I am :</p>

                        <label htmlFor="male">
                            <input type="radio" id="male" name="gender" value="male"
                                {...register("gender", {
                                    required: true,
                                })} /> Male
                        </label>


                        <label htmlFor="female">
                            <input type="radio" id="female" name="gender" value="female"
                                {...register("gender", {
                                    required: true,
                                })} /> Female
                        </label>
                    </div>
                    {errors.gender && <p className='e-msg'>Please select the gender</p>}


                    <div className='address'>
                        <select {...register("state", {
                            required: true,
                        })}>
                            <option value="">State</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                        </select>

                        <select {...register("city", {
                            required: true,
                        })}>
                            <option value="" >city</option>
                            <option value="Indore">Indore</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Jabalpur">Jabalpur</option>
                            <option value="Dhar">Dhar</option>
                        </select>
                    </div>


                    {errors.city && errors.state && <p className="e-msg text-center">please select the state and city</p> ||
                        errors.state && <p className="e-msg" >please select the state</p> ||
                        errors.city && <p className='e-msg text-end mr-12'>please select the city</p>
                    }


                    {/* <textarea placeholder='Write somthing'
                        {...register("message")}></textarea> */}

                    <button type="submit">Create Account</button>
                </form>
                <hr />

                <div className='bottom'>
                    <p>Already have an account ? </p>
                    <button className='switch-btn' onClick={()=>navigate('/Login')}> Login</button>
                </div>
            </div>
        </main>
    )
}

export default Signup