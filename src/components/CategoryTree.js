import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/EndPoint';

const CategoryTree = ({ token, onLogout }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.apiEndpoint}/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [token]);

    const renderTree = (category) => (
        <li key={category.id} className="ml-4 mt-2">
            <div className="font-medium text-gray-700">{category.name}</div>
            {category.children && category.children.length > 0 && (
                <ul className="ml-4 border-l-2 border-gray-200 pl-4">
                    {category.children.map(child => renderTree(child))}
                </ul>
            )}
        </li>
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Category Tree</h1>
                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            <ul className="list-disc">
                {categories.map(category => renderTree(category))}
            </ul>
        </div>
    );
};

export default CategoryTree;