import sanityClient from '@/lib/sanityClient';

import Home from './home';

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
      imageUrl: card.image?.asset.url || '/pythaverse.png',
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
            imageUrl: e.imageUrl ? e.imageUrl : '/home.png',
            titleHighlight: e.titleHighlight ? e.titleHighlight : '',
            subTitle: e.subTitle ? e.subTitle : '',
          };
        })[0]
      : {
          // title: 'Hire a',
          // titleHighlight: 'Forklift',
          // subTitle: 'Today',
          buttonlabel: 'Thông tin cuộc thi',
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
            title: e.title ? e.title : 'VỀ CHÚNG TÔI',
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
            'Vì Người Việt” là công ty đi đầu trong lĩnh vực công nghệ giáo dục tại Việt Nam.',
          content2:
            'Công ty trở thành đơn vị đầu tiên đem giải pháp học tập STEM thông qua Robot và nền tảng học tập kỹ thuật số.',
          content3:
            'Đồng hành cùng 60.000 + học sinh trong đó có hơn 10.000 + học sinh tham gia các cuộc thi trong nước và quốc tế và hơn 500 câu lạc bộ STEM và Robothon.',
          content4:
            'Tổ chức những cuộc thi quốc tế lớn như INTERNATIONAL ROBOTHON và WECODE, giúp hàng trăm em học sinh đạt thành tích xuất sắc và nâng cấp thành tích học tập xuất sắc.',
          imageUrl: 'logo2.jpg',
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
          content1: 'Chúng tôi sẵn sàng giải đáp những thắc mắc của bạn',
          content2:
            'Liên hệ ngay với VNV để chúng tôi nắm bắt nhu cầu của bạn. Đội ngũ của chúng tôi sẵn sàng hộ trợ bạn',
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

const Index = ({
  serviceCardsData,
  logoBannersData,
  homeHeroData,
  homeAboutUsData,
  homeKeepInTouchData,
}: any) => (
  <Home
    serviceCardsData={serviceCardsData}
    logoBannersData={logoBannersData}
    homeHeroData={homeHeroData}
    homeAboutUsData={homeAboutUsData}
    homeKeepInTouchData={homeKeepInTouchData}
  />
);

export default Index;
