import React from 'react';

const Welcome: React.FC<{ isService?: boolean }> = ({ isService = false }) => {
  const backgroundColor = isService ? '#FFFFFF' : '#6C553E';
  const fontColor = isService ? 'text-[#6C553E]' : 'text-white';
  const borderButton = isService ? 'border-[#6C553E]' : 'border-white';
  const backgroundHover = isService ? 'bg-[#6C553E]' : 'bg-white';
  const backgroundHoverText = isService ? 'text-white' : 'text-[#6C553E]';

  return (
    <div className="rounded-zoom-responsive mx-auto mb-10">
      <div
        className={`bg-brown-800 py-10 text-center ${fontColor}`}
        style={{ backgroundColor }}
      >
        <div className="text-sx mb-2 font-semibold sm:text-3xl lg:text-4xl">
          WELCOME TO YOUR OASIS OF BEAUTY!
        </div>
        <div className="lg:text-4lg mb-6 text-[10px] sm:text-sm">
          Book Any Service Today and Receive a FREE Skin Consultation.
        </div>
        <a
          href="https://bookings.gettimely.com/trademarkskinco/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F197619%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:${backgroundHoverText}-800 hover:${backgroundHoverText} border ${borderButton} bg-transparent px-4 py-2 font-medium ${fontColor} hover:${backgroundHover}`}
        >
          BOOK NOW
        </a>
      </div>
    </div>
  );
};

export default Welcome;
