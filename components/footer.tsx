import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-black text-white py-2 mt-auto fixed bottom-0 left-0 w-full'>
            <div className='flex justify-center'>
                <p>&copy; {new Date().getFullYear()} AIVOLVE. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
