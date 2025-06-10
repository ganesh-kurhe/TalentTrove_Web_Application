import React, { useEffect, useState, useMemo } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const navigate = useNavigate();

    // Optimized filtering using useMemo
    const filteredCompanies = useMemo(() => {
        return companies?.filter(company => {
            return !searchCompanyByText || company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
                <TableCaption className="text-gray-500 text-sm">A list of your recent registered companies</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow className="text-gray-700 font-semibold">
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies?.map((company) => (
                        <TableRow 
                            key={company._id} 
                            className="hover:bg-gray-50 transition-all duration-200"
                        >
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo || '/default-logo.png'} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{company.name}</TableCell>
                            <TableCell>{company.createdAt ? company.createdAt.split("T")[0] : 'N/A'}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger className="p-2 rounded-md hover:bg-gray-200">
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 shadow-lg border border-gray-300 rounded-md p-2 bg-white">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                        >
                                            <Edit2 className="w-4 text-blue-500" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
