import type { ReactNode } from 'react';
import React from 'react';

import Header from '@/header/Header';
import { Footer } from '@/templates/Footer';
import { AppConfig } from '@/utils/AppConfig';

import { Meta } from './Meta';

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className="font-custom text-gray-600 antialiased"
      style={{
        backgroundImage: `url('/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100vw',
        height: '100%',
        marginTop: '64px',
      }}
    >
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
