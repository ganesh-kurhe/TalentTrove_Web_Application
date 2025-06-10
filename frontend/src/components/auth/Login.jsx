import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    return (
        <div>
            <Navbar />
            <motion.div
                className="flex items-center justify-center min-h-screen bg-gray-100 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form
                    onSubmit={submitHandler}
                    className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <h1 className="font-bold text-2xl text-center mb-5 text-gray-700">Login</h1>

                    {/* Email */}
                    <div className="my-3">
                        <Label className="text-gray-600">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="my-3">
                        <Label className="text-gray-600">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="flex items-center gap-4 my-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label className="text-gray-600">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label className="text-gray-600">Recruiter</Label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full my-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold p-2 rounded-lg flex justify-center transition-all duration-300 ease-in-out hover:from-indigo-500 hover:to-purple-500">
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <motion.button
                            type="submit"
                            className="w-full my-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 text-white font-semibold p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </motion.button>
                    )}

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
                    </p>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Login;
