
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 p-4 bg-white shadow-md rounded-lg'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            placeholder="🔍 Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")} 
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all"
          >
            + New Jobs
          </Button>
        </div>
        <div className="overflow-x-auto">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs;
