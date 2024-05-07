import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

import { Background } from '@/background/Background';

import { sendContactForm } from '../lib/api';

const KeepInTouch = ({ homeKeepInTouchData }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const toast = useToast();

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      toast({
        title: 'Message sent.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
      await sendContactForm({ name, email, service });
    } catch (error) {
      toast({
        title: 'Sent failed. Please try again',
        status: 'error',
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  return (
    // <div className="relative flex h-[calc(100vw*0.4)] w-full items-center justify-center">
    //   <div className="absolute inset-0 bg-[url('/keep-in-touch.png')] bg-cover bg-center opacity-70 blur-[2px]"></div>

    // </div>
    <Background
      className="relative mt-16 flex h-[calc(200vw*0.6)] w-full items-center justify-center bg-cover bg-center md:h-[calc(100vw*0.6)] lg:h-[calc(75vw*0.6)]"
      style={{
        backgroundImage: `url('${homeKeepInTouchData?.imageUrl}')`,
      }}
    >
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 1s ease forwards;
        }

        .contact-button {
          transition: all 0.3s ease;
          display: inline-block;
        }

        .contact-button:hover {
          background-color: white;
          color: #f05924;
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .text-2xl,
        .text-sm,
        .text-lg,
        .font-bold,
        .italic {
        }
        .contact-button {
          transition: all 0.3s ease;
          display: inline-block;
        }
      `}</style>
      <div className="relative w-full max-w-lg p-4 md:max-w-xl lg:max-w-3xl">
        <div className="w-full text-center">
          <h2 className="mb-2 text-base font-extrabold italic text-white sm:text-lg md:text-base lg:text-lg xl:text-xl">
            {homeKeepInTouchData?.title}
          </h2>
          <hr className="mt-2 border-t border-white" />
          <h3 className="text-sm text-white sm:text-base md:text-sm lg:text-base">
            {homeKeepInTouchData?.content1}
          </h3>
          <h3 className="text-sm text-white sm:text-base md:text-sm lg:text-base">
            {homeKeepInTouchData?.content2}
          </h3>
        </div>
        <div className="mt-4 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col space-y-3 px-4 sm:space-y-4"
          >
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full border-2 p-2 text-sm sm:text-base"
              placeholder="Họ và Tên"
              required
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-2 p-2 text-sm sm:text-base"
              placeholder="Email"
              required
            />
            <textarea
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="h-32 rounded-lg border-2 p-2 text-sm sm:text-base"
              placeholder="Nội dung"
              required
            />

            <button
              type="submit"
              className="contact-button mx-auto w-20 rounded-full bg-[#f05a24] p-2 text-sm font-bold text-white hover:bg-orange-400 hover:text-white sm:w-24 sm:text-base"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </Background>
  );
};

export default KeepInTouch;
