import React, { useEffect } from 'react';
import Navbar from '../components/Nevbar';
import { FileUploader } from './FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../redux/slices/fileSlice';
import Loading from '../components/Loading';
import FileCard from './FileCard';

const url = import.meta.env.VITE_APP_BACKEND_URL;

const Dashboard = () => {
    const { isLoding, isError, result } = useSelector(state => state.files);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles(`${url}/files`));
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Your Files</h2>
                <FileUploader />
                {isLoding ? (
                    <Loading />
                ) : (
                    <div>
                        {result?.length === 0 ? (
                            <div className="bg-white p-4 rounded shadow">
                                <p>No files uploaded yet!</p>
                            </div>
                        ) : (
                                    <div className="bg-white p-4 rounded shadow grid grid-cols-2 md:grid-cols-4 gap-4">
                                {result?.map((file, ind) => (
                                    <FileCard key={ind} {...file} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
