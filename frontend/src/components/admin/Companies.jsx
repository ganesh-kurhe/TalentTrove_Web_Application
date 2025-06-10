
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react'; // Importing an icon for search
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>

                {/* Search & Add Button */}
                <div className='flex items-center justify-between my-5'>

                    {/* Search Input with Icon */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            className="w-full px-10 py-2 rounded-lg border border-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                            placeholder="Search company..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    {/* New Company Button */}
                    <Button 
                        onClick={() => navigate("/admin/companies/create")} 
                        className='px-5 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium text-lg rounded-lg transition-all duration-300 hover:from-green-500 hover:to-blue-500 hover:scale-105 shadow-lg active:scale-95'
                    >
                        + New Company
                    </Button>
                </div>

                {/* Companies Table */}
                <div className="bg-gray-50 shadow-xl rounded-xl overflow-hidden border border-gray-200 p-4">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Companies;

