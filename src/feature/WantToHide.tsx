import { useToast } from '@chakra-ui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { sendContactForm } from '../lib/api';

function WantToHire() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const toast = useToast();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust as needed
  });

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

  const wantToHireClasses = classNames(
    'sm:text-[4vw]',
    'text-[8vw]',
    'font-semibold',
    'delay-500',
    'text-white',
    'transition-all',
    'duration-[1s]',
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-x-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );

  const aForkLift = classNames(
    'sm:text-[4vw]',
    'text-[8vw]',
    'font-semibold',
    'text-white',
    'transition-all',
    'duration-[1s]',
    'sm:delay-1000',
    'delay-500',
    'ease-in-out',
    'transform',
    { 'opacity-0 -translate-x-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );

  const forkLiftImage = classNames(
    'w-full',
    'transition-all',
    'duration-[1s]',
    'sm:delay-1000',
    'delay-500',
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-x-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );

  const formClasses = classNames(
    'flex',
    'w-full',
    'flex-col',
    'justify-center',
    'space-y-4',
    'sm:text-[0.8vw]',
    'text-[2vw]',
    'transition-all',
    'duration-[1s]',
    'sm:delay-1000',
    'delay-1000',
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-y-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );

  return (
    <div className="grid grid-cols-1 pt-[5%] sm:grid-cols-2" ref={ref}>
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
      <div>
        <img className={forkLiftImage} src="/logo.png" alt="VNV" />
      </div>
      <div>
        <div className="h-full px-[10%]">
          <div className="text-center text-lg">
            <div className={wantToHireClasses}>Liên hệ ngay</div>
            <div className={aForkLift}>
              với <div className="inline text-orange-1">VNV</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={formClasses}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full border-2 p-2 italic text-black"
              placeholder="Họ và Tên"
              required
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-2 p-2 italic text-black"
              placeholder="Email"
              required
            />
            <textarea
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="h-32 rounded-lg border-2 p-2 italic text-black"
              placeholder="Nội dung"
              required
            />

            <button
              type="submit"
              className="contact-button mx-auto w-[8vw] min-w-[6rem] rounded-full bg-[#f05a24] p-2 font-bold text-white hover:bg-orange-400 hover:text-white sm:text-[0.8vw]"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WantToHire;
