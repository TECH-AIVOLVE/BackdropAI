import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-black text-white py-4 mt-auto'>
            <div className='flex justify-center'>
                <p>&copy; {new Date().getFullYear()} AIVOLVE. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
