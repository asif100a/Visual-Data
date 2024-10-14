import React from 'react';

const loading = () => {
    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
            </div>
        </section>
    );
};

export default loading;