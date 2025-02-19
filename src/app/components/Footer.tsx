import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3F4F44] text-[#DCD7C9] rounded-lg shadow-sm m-4 p-8">
      <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
      </div>
      <div className="w-full mx-auto max-w-screen-xl mt-4 text-center">
        <span className="text-sm">
          © 2023{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
