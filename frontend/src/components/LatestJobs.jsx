import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-5'>
            {/* Animated Heading */}
            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className='text-4xl font-bold text-center'
            >
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-500'>
                    Latest & Top
                </span> Job Openings
            </motion.h1>

            {/* Job Cards Container */}
            <motion.div 
                className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 my-10'
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                {
                    allJobs.length <= 0 ? 
                        <span className="text-gray-500 text-lg">No Job Available</span> :
                        allJobs.slice(0, 6).map((job) => (
                            <motion.div key={job._id} variants={fadeInUp}>
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                }
            </motion.div>
        </div>
    );
}

export default LatestJobs;
