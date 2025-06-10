import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

// Data for filters
const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <motion.div 
            className='w-full bg-white p-5 rounded-lg shadow-lg border border-gray-200'
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className='font-extrabold text-xl text-[#6A38C2]'>🎯 Filter Jobs</h1>
            <hr className='mt-3 mb-4 border-gray-300' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <h2 className='font-semibold text-lg text-gray-800'>{data.filterType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <motion.div 
                                    key={itemId} 
                                    className='flex items-center space-x-2 my-2 p-2 rounded-md cursor-pointer hover:bg-[#f3f0fa] transition-all'
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <RadioGroupItem value={item} id={itemId} className='text-[#6A38C2]' />
                                    <Label htmlFor={itemId} className="text-gray-700">{item}</Label>
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </motion.div>
    );
};

export default FilterCard;

