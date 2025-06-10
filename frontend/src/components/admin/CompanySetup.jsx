
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from 'framer-motion';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
    preview: '',
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || '',
        description: singleCompany?.description || '',
        website: singleCompany?.website || '',
        location: singleCompany?.location || '',
        file: null,
        preview: singleCompany?.logo || '',
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({
        ...input,
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-all"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label className="font-semibold">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label className="font-semibold">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label className="font-semibold">Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHandler} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label className="font-semibold">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Label className="font-semibold">Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg" />
              {input.preview && (
                <motion.img
                  src={input.preview}
                  alt="Logo Preview"
                  className="mt-3 w-24 h-24 rounded-md shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          </div>

          {loading ? (
            <Button className="w-full my-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <motion.button
              type="submit"
              className="w-full my-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;



