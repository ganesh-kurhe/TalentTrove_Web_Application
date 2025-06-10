import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg'>
                <h1 className='font-bold text-2xl my-5 text-gray-700'>
                    Applicants <span className="text-blue-500">{applicants?.applications?.length}</span>
                </h1>
                <div className="overflow-x-auto">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants;
