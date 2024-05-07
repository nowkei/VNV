// pages/index.js
import React from 'react';

import sanityClient from '@/lib/sanityClient';
import ServicesSection from '@/ServiceSection/ServicesSection';
import Advertisement from '@/templates/advertisement';
import { Hero } from '@/templates/Hero';
import KeepInTouch from '@/templates/KeepInTouch';
import { VerticalFeatures } from '@/templates/VerticalFeatures';

export const getStaticProps = async () => {
  const logoBannerQuery = `*[_type == "logoBannerss"]{
    "imageUrl": image.asset->url
  }`;
  const logoBannersData = await sanityClient.fetch(logoBannerQuery);
  const serviceCardQuery = `*[_type == "serviceCard"]{
    title,
    body[]{
      children[]{
        text
      }
    },
    image{
      asset->{
        url
      }
    }
  }`;

  const serviceCardsData = await sanityClient.fetch(serviceCardQuery);

  const processedServiceCardsData = await serviceCardsData
    .slice(0, 3)
    .map((card: any) => ({
      title: card.title || 'No Title Provided',
      body: card.body
        ? card.body
            .map((block: any) =>
              block.children.map((child: any) => child.text).join(' '),
            )
            .join('\n')
        : 'No Content Available',
      imageUrl: card.image?.asset.url || '/vnv.png',
    }));

  const homeHeroQuery = `*[_type == "homeHero"]{
    title,
    "imageUrl": image.asset->url,
    buttonLabel,
    titleHighlight,
    subTitle
  }`;
  const homeHero = await sanityClient.fetch(homeHeroQuery);
  const homeHeroData =
    homeHero && homeHero.length > 0
      ? homeHero.map((e: any) => {
          return {
            title: e.title ? e.title : '',
            buttonlabel: e.buttonlabel ? e.buttonlabel : 'CONTACT US',
            imageUrl: e.imageUrl ? e.imageUrl : '/home.png',
            titleHighlight: e.titleHighlight ? e.titleHighlight : '',
            subTitle: e.subTitle ? e.subTitle : '',
          };
        })[0]
      : {
          title: 'Hire a',
          titleHighlight: 'Forklift',
          subTitle: 'Today',
          buttonlabel: 'CONTACT US',
          imageUrl: '/home.png',
        };

  const homeAboutUsQuery = `*[_type == "HomeAboutUs"]{
    title,
    content1,
    content2,
    content3,
    content4,
    "imageUrl": image.asset->url,
    "imageUrlBelow": imageBelow.asset->url
  }`;
  const homeAboutUs = await sanityClient.fetch(homeAboutUsQuery);

  const homeAboutUsData =
    homeAboutUs && homeAboutUs.length > 0
      ? homeAboutUs.map((e: any) => {
          return {
            title: e.title ? e.title : 'ABOUT US',
            content1: e.content1 ? e.content1 : '',
            content2: e.content2 ? e.content2 : '',
            content3: e.content3 ? e.content3 : '',
            content4: e.content4 ? e.content4 : '',
            imageUrl: e.imageUrl ? e.imageUrl : 'logo2.jpg',
            imageUrlBelow: e.imageUrlBelow ? e.imageUrlBelow : '',
          };
        })[0]
      : {
          title: 'VỀ CHÚNG TÔI',
          content1:
            'Welcome to VH Forklifts, Your Trusted Forklift Solution Provider.',
          content2: 'Are you in need of top-notch forklift solutions?',
          content3:
            'With a reputation built on reliability, quality, & exceptional customer service,',
          content4:
            'We are your one-stop destination for all your forklift needs.',
          image: 'logo2.jpg',
        };

  const homeKeepInTouchQuery = `*[_type == "HomeKeepInTouch"]{
          title,
          content1,
          content2,
          "imageUrl": image.asset->url
        }`;
  const homeKeepInTouch = await sanityClient.fetch(homeKeepInTouchQuery);

  const homeKeepInTouchData =
    homeKeepInTouch && homeKeepInTouch.length > 0
      ? homeKeepInTouch.map((e: any) => {
          return {
            title: e.title ? e.title : 'Liên hệ với chúng tôi',
            content1: e.content1 ? e.content1 : '',
            content2: e.content2 ? e.content2 : '',
            imageUrl: e.imageUrl ? e.imageUrl : '/anhnen1.jpg',
          };
        })[0]
      : {
          title: 'Liên hệ với chúng tôi',
          content1: 'Chúng tôi sẵn sàng giải đáp những thắc mắc của bạn.',
          content2:
            'Liên hệ ngay với VNV để chúng tôi nắm bắt nhu cầu của bạn. Đội ngũ của chúng tôi sẵn sàng hộ trợ bạn.',
          imageUrl: '/anhnen1.jpg',
        };
  return {
    props: {
      serviceCardsData: processedServiceCardsData,
      logoBannersData,
      homeHeroData,
      homeAboutUsData,
      homeKeepInTouchData,
    },
  };
};

function Home({
  serviceCardsData,
  logoBannersData,
  homeHeroData,
  homeAboutUsData,
  homeKeepInTouchData,
}: any) {
  return (
    <div>
      <Hero homeHeroData={homeHeroData} />
      <div className="rounded-zoom-responsive container mx-auto px-6">
        <VerticalFeatures homeAboutUsData={homeAboutUsData} />
      </div>
      <Advertisement logoBanners={logoBannersData} />
      <div className="rounded-zoom-responsive container mx-auto px-6">
        <ServicesSection serviceCards={serviceCardsData} />
      </div>
      <KeepInTouch homeKeepInTouchData={homeKeepInTouchData} />
    </div>
  );
}

export default Home;
