// components/Loading.js
import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );
};

export default Loading;
