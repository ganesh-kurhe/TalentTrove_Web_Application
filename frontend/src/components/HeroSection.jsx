import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="text-center bg-gradient-to-b from-[#f3f4f6] to-white py-20 px-4">
            <motion.div 
                className="flex flex-col gap-6 max-w-4xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                {/* Top Badge */}
                <motion.span 
                    className="mx-auto px-5 py-2 rounded-full bg-[#FFF5E5] text-[#F83002] font-semibold text-sm shadow-md"
                    whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(255, 105, 85, 0.3)" }}
                >
                    Talent Trove Website
                </motion.span>

                {/* Main Heading */}
                <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
                    Search, Apply & <br /> Get Your 
                    <span className="bg-gradient-to-r from-[#6A38C2] to-[#b5179e] text-transparent bg-clip-text"> Dream Jobs</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600">
                    "Find your dream job or hire top talent with ease on Talent Trove – connecting opportunities with the right people!"
                </p>

                {/* Search Bar */}
                <motion.div 
                    className="flex w-full sm:w-[50%] shadow-lg border border-gray-200 pl-5 pr-1 rounded-full items-center gap-3 mx-auto bg-white transition-all"
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-gray-700 text-lg py-3"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-full bg-[#6A38C2] hover:bg-[#5a2fa0] p-3 transition-all shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <Search className="h-6 w-6 text-white" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
