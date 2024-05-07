import className from 'classnames';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const VerticalFeatureRow = ({ homeAboutUsData }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust as needed
  });

  const verticalFeatureClass = className(
    'mt-5',
    'flex',
    'flex-wrap',
    'items-center',
    'flex-row',
    'sm:flex-row',
    'md:flex-row',
    'overflow-x-hidden',
    'relative',
    'pb-20',
  );

  const imageClass = className(
    'transition-all',
    'duration-1000', // Longer duration for slower animation
    'ease-in-out',
    'transform',
    'w-[70%]',
    { 'opacity-0 -translate-x-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );

  const textClass = className(
    'transition-all',
    'duration-1000', // Longer duration for smoother animation
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-x-20': !inView }, // Fade right effect
    { 'opacity-100 translate-x-0': inView },
  );

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full md:w-1/2 lg:w-1/2" ref={ref}>
        <img src={homeAboutUsData.imageUrl} alt="" className={imageClass} />
      </div>
      {/* Text content div with fade-right animation */}
      <div
        className={`w-full text-center sm:pl-6 md:w-1/2 md:pl-6 lg:w-1/2 ${textClass}`}
        ref={ref}
      >
        <div className="mt-6 font-black italic text-[#f05a24] sm:mt-2 sm:text-2xl md:mt-2 lg:text-4xl">
          {homeAboutUsData.title}
        </div>
        <div className="mt-2 text-center text-[white] sm:text-sm lg:text-xl">
          <div>{homeAboutUsData.content1}</div>
          <div className="py-4">{homeAboutUsData.content2}</div>
          <div>{homeAboutUsData.content3}</div>
          <div>{homeAboutUsData.content4}</div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('${homeAboutUsData.imageUrlBelow}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          width: '100vw',
          height: 'calc(100vw*0.1)',
          marginTop: '64px',
          bottom: 0,
        }}
      ></div>
    </div>
  );
};

export { VerticalFeatureRow };
