
import { Button } from '@mantine/core';
import {  useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 sm:text-8xl">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate(-1)}
          
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md !text-white !bg-indigo-600 !hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Back to Home
          </Button>
        </div>
        <div className="mt-12">
          <img
            className="mx-auto h-48 w-auto"
            src="https://source.unsplash.com/random/300x200/?lost"
            alt="404 illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;