import React, { useState } from 'react'
import Navbar from '../shared/Navbar' 
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty!");
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error registering company. Try again!");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> 

            <div className="flex justify-center items-center mt-12">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Your Company Name</h1>
                    <p className="text-gray-500 text-center mb-6">
                        Choose a name for your company. You can change it later.
                    </p>

                    <div className="mb-4">
                        <Label className="text-lg text-gray-700">Company Name</Label>
                        <Input
                            type="text"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="JobHunt, Microsoft, etc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-6 justify-center">
                        <Button
                            variant="outline"
                            className="px-6 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;




