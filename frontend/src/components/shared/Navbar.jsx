import React from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] shadow-lg"
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo with animation */}
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className='text-2xl font-bold text-white'
                >
                    Job<span className='text-yellow-300'>Portal</span>
                </motion.h1>

                {/* Navigation Items */}
                <motion.ul 
                    className='flex font-medium items-center gap-6 text-white'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {user && user.role === 'recruiter' ? (
                        <>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/admin/companies">Companies</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/admin/jobs">Jobs</Link>
                            </motion.li>
                        </>
                    ) : (
                        <>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/">Home</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/jobs">Jobs</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link to="/browse">Browse</Link>
                            </motion.li>
                        </>
                    )}
                </motion.ul>

                {/* Auth Buttons */}
                {!user ? (
                    <div className='flex items-center gap-3'>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link to="/login">
                                <Button variant="outline" className="border-white text-black hover:bg-white hover:text-[#6A38C2] transition-all">
                                    Login
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link to="/signup">
                                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 transition-all">
                                    Signup
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            </motion.div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 z-50 bg-white shadow-md rounded-md p-3">
                            <div className='flex gap-2 space-y-2'>
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                    <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div className='flex flex-col my-2 text-gray-600'>
                                {user?.role === 'student' && (
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2 />
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
                                )}
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </motion.div>
    );
}

export default Navbar;
