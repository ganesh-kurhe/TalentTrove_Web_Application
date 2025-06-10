import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div 
            onClick={() => navigate(`/description/${job._id}`)}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(150, 100, 255, 0.4)" }}
            className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#f8f9fa] to-[#ffffff] border border-gray-200 cursor-pointer transition-all"
        >
            
            <div>
                <h1 className="font-semibold text-xl text-[#5A189A]">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">{job?.company?.location}</p>
            </div>

           
            <div>
                <h1 className="font-bold text-lg my-2 text-[#240046]">{job?.title}</h1>
                <p className="text-sm text-gray-700">{job?.description}</p>
            </div>

           
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-700 font-bold">{job?.position} Positions</Badge>
                <Badge className="bg-red-100 text-red-600 font-bold">{job?.jobType}</Badge>
                <Badge className="bg-purple-100 text-purple-700 font-bold">{job?.salary}LPA</Badge>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;



