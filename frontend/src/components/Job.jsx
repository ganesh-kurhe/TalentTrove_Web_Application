import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <motion.div 
            className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {/* Job Posting Time & Bookmark */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full hover:bg-gray-200" size="icon">
                    <Bookmark className="text-gray-600 hover:text-[#7209b7]" />
                </Button>
            </div>

            {/* Company Logo & Name */}
            <div className="flex items-center gap-3 my-4">
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </motion.div>
                <div>
                    <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.company?.location}</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-xl my-2 text-[#333]">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            {/* Job Details - Tags */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold bg-red-100 px-3 py-1">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold bg-purple-100 px-3 py-1">{job?.salary} LPA</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-5">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="border-[#7209b7] text-[#7209b7] hover:bg-[#7209b7] hover:text-white">
                    Details
                </Button>
                <Button className="bg-[#7209b7] hover:bg-[#5e08a0] text-white">Save For Later</Button>
            </div>
        </motion.div>
    );
};

export default Job;
