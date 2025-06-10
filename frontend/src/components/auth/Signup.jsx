import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-4xl mx-auto px-4 py-10 bg-gray-50 min-h-screen'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full md:w-2/3 bg-white shadow-xl rounded-lg p-8 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl'
                >
                    <h1 className='font-bold text-2xl text-center mb-6 text-gray-800'>Create an Account</h1>
                    
                    <div className='space-y-4'>
                        <div>
                            <Label className="text-gray-600">Full Name</Label>
                            <Input 
                                type='text' 
                                value={input.fullname} 
                                name='fullname' 
                                onChange={changeEventHandler} 
                                placeholder='Enter your full name' 
                                className='rounded-lg border-gray-300 mt-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            />
                        </div>
                        <div>
                            <Label className="text-gray-600">Email</Label>
                            <Input 
                                type='email' 
                                value={input.email} 
                                name='email' 
                                onChange={changeEventHandler} 
                                placeholder='Enter your email' 
                                className='rounded-lg border-gray-300 mt-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            />
                        </div>
                        <div>
                            <Label className="text-gray-600">Phone Number</Label>
                            <Input 
                                type='text' 
                                value={input.phoneNumber} 
                                name='phoneNumber' 
                                onChange={changeEventHandler} 
                                placeholder='Enter phone number' 
                                className='rounded-lg border-gray-300 mt-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            />
                        </div>
                        <div>
                            <Label className="text-gray-600">Password</Label>
                            <Input 
                                type='password' 
                                value={input.password} 
                                name='password' 
                                onChange={changeEventHandler} 
                                placeholder='Enter your password' 
                                className='rounded-lg border-gray-300 mt-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-between mt-6 space-y-3 md:space-y-0'>
                        <RadioGroup className='flex items-center gap-4'>
                            <div className='flex items-center space-x-2'>
                                <Input 
                                    type='radio' 
                                    name='role' 
                                    value='student' 
                                    checked={input.role === 'student'} 
                                    onChange={changeEventHandler} 
                                    className="cursor-pointer"
                                />
                                <Label className="text-gray-600">Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input 
                                    type='radio' 
                                    name='role' 
                                    value='recruiter' 
                                    checked={input.role === 'recruiter'} 
                                    onChange={changeEventHandler} 
                                    className="cursor-pointer"
                                />
                                <Label className="text-gray-600">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-3'>
                            <Label className="text-gray-600">Profile</Label>
                            <Input 
                                accept='image/*' 
                                type='file' 
                                onChange={changeFileHandler} 
                                className='cursor-pointer border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200'
                            />
                        </div>
                    </div>

                    <div className='mt-6'>
                        {loading ? (
                            <Button className='w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-purple-500' disabled>
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button 
                                type='submit' 
                                className='w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105'
                            >
                                Sign Up
                            </Button>
                        )}
                    </div>

                    <p className='text-sm text-center mt-4 text-gray-600'>
                        Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
