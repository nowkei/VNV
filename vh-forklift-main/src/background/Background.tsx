import className from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import useImageLoader from '@/hooks/useImageLoader';

type IBackgroundProps = {
  children: ReactNode;
  style?: CSSProperties;
  backgroundUrl?: string;
  className?: string;
};

const Background = (props: IBackgroundProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust as needed
  });

  const { isImageLoaded } = useImageLoader(props.backgroundUrl ?? '');

  const backgroundClass = className(
    props.className,
    'transition-all',
    'duration-1000', // Duration for the animation
    'ease-in-out',
    'transform',
    { 'opacity-0 translate-y-10': !inView }, // Fade-up effect
    { 'opacity-100 translate-y-0': inView },
  );

  return (
    <div
      ref={ref}
      className={backgroundClass}
      style={{ ...props.style, opacity: isImageLoaded ? 1 : 0 }}
    >
      {props.children}
    </div>
  );
};

export { Background };
