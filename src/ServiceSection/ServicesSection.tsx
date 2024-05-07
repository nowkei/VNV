// components/ServicesSection.tsx

import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  href: any;
  description: string;
  imageUrl: string;
  buttonLabel: string;
}

const hrefConfigs = [
  {
    href: '/services',
  },
  {
    href: '/services',
  },
  {
    href: '/services',
  },
];

const ServiceCard: React.FC<ServiceCardProps> = ({
  href,
  description,
  imageUrl,
  buttonLabel,
}) => {
  return (
    <div
      className="lg:h-700 h-700 relative mb-5 overflow-hidden shadow-sm sm:w-96"
      style={{
        height: 'calc(25vw/0.62)',
        width: '25vw',
        minWidth: '300px',
        minHeight: '500px',
        maxWidth: '480px',
        maxHeight: 'calc(480px/0.62)',
      }}
    >
      <img
        src={imageUrl}
        alt=""
        className="absolute z-50 h-2/4 w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-2/3 items-center bg-[#484848] from-black to-transparent p-4 pt-[80px]">
        <div className="w-full text-center">
          <style jsx>{`
            .hover-button {
              transition: all 0.3s ease;
              display: inline-block; /* Đảm bảo rằng transition hoạt động đúng */
            }

            .hover-button:hover {
              background-color: white;
              color: black;
              transform: scale(1.05) translateY(-5px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
          `}</style>

          <Link href={href} passHref>
            <div className="lg:3/5 lg:text-md hover-button mx-auto mb-2 mt-4 w-4/5 rounded-full bg-[#f05a24] px-6 py-2 text-sm font-medium text-white md:w-4/5">
              {buttonLabel}
            </div>
          </Link>
          <p className="mb-4 text-sm text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ServicesSection: React.FC<{ serviceCards: any[] }> = ({
  serviceCards,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust as needed
  });

  const backgroundClass = classNames(
    'mx-auto my-10',
    'transition-all',
    'duration-1000', // Duration for the animation
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-y-10': !inView }, // Fade-up effect
    { 'opacity-100 translate-y-0': inView },
  );

  if (!serviceCards || !Array.isArray(serviceCards)) {
    return <p>No Service Cards Available</p>;
  }

  return (
    <div className={backgroundClass} ref={ref}>
      <div className="mb-5 flex h-auto flex-wrap justify-center sm:w-full sm:flex-row xl:justify-between">
        {serviceCards.length > 0 ? (
          serviceCards.map((card, index) => {
            const config = hrefConfigs[index];
            if (!config) return [];
            return (
              <div key={index} className="sm:mx-0 md:ml-16 lg:ml-16 xl:mx-0">
                <ServiceCard
                  href={config.href}
                  description={card.body}
                  imageUrl={card.imageUrl}
                  buttonLabel={card.title}
                />
              </div>
            );
          })
        ) : (
          <p>No Service Cards Available</p>
        )}
      </div>
    </div>
  );
};

export default ServicesSection;
