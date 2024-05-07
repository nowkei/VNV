import { useToast } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { sendContactForm } from '@/lib/api';
import ServicesSection from '@/ServiceSection/ServicesSection';

import sanityClient from '../../lib/sanityClient';

export const getServerSideProps = async () => {
  const headerQuery = `*[_type == "HeaderServices"]{
    title,
    body[]{
      children[]{
        text
      }
    }
  }`;

  const serviceCardQuery = `*[_type == "serviceCard"] | order(_createdAt desc)[0...3]{
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

  const rightColumnQuery = `*[_type == "rightServicesColumn"] | order(_createdAt asc) {
    title,
    body[]{
      children[]{
        text
      }
    },
    images[]{
      asset->{
        url
      }
    }
  }`;

  const leftColumnQuery = `*[_type == "leftServicesColumn"]{
    title,
    body[]{
      children[]{
        text
      }
    },
    images[]{
      asset->{
        url
      }
    }
  }`;

  const rightColumnData: any = await sanityClient.fetch(rightColumnQuery);
  const leftColumnData: any = await sanityClient.fetch(leftColumnQuery);
  const headerData = await sanityClient.fetch(headerQuery);
  const serviceCardsData = await sanityClient.fetch(serviceCardQuery);

  const processedServiceCardsData = serviceCardsData.map((card: any) => ({
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

  const processedBody =
    headerData.length > 0 && headerData[0].body
      ? headerData[0].body
          .map((block: any) =>
            block.children.map((child: any) => child.text).join(' '),
          )
          .join('\n')
      : 'No content available';

  const processedRightColumnData: any = rightColumnData.map((item: any) => {
    return {
      title: item.title,
      text: item.body
        ? item.body.map((block: any) =>
            block.children.map((child: any) => child.text).join('\n'),
          )
        : [],
      images: item.images
        ? item.images.map((image: any) => image.asset.url)
        : [],
    };
  });

  const processedLeftColumnData: any = leftColumnData.map((item: any) => {
    return {
      title: item.title,
      text: item.body
        ? item.body.map((block: any) =>
            block.children.map((child: any) => child.text).join('\n'),
          )
        : [],
      images: item.images
        ? item.images.map((image: any) => image.asset.url)
        : [],
    };
  });

  const finalRightColumnData: any = processedRightColumnData.map(
    (item: any) => {
      const newItem = { ...item };
      if (!newItem.title) newItem.title = '';
      if (newItem.text.length === 0) newItem.text = [''];
      if (newItem.images.length === 0) newItem.images = ['No images available'];
      return newItem;
    },
  );

  const finalLeftColumnData: any = processedLeftColumnData.map((item: any) => {
    const newItem = { ...item };
    if (!newItem.title) newItem.title = '';
    if (newItem.text.length === 0) newItem.text = [''];
    if (newItem.images.length === 0) newItem.images = ['No images available'];
    return newItem;
  });

  return {
    props: {
      leftColumnData: finalLeftColumnData,
      rightColumnData: finalRightColumnData,
      headerTitle: headerData.length > 0 ? headerData[0].title : 'No title',
      headerBody: processedBody,
      serviceCardsData: processedServiceCardsData,
    },
  };
};

function Services({
  rightColumnData,
  leftColumnData,
  headerBody,
  headerTitle,
  serviceCardsData,
}: any) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

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

  const fadeUpStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Adjust the distance you want to fade up
    transition: 'opacity 1.0s ease, transform 1.0s ease',
  };

  return (
    <div className="">
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
      <div
        className={`rounded-zoom-responsive fade-up container mx-auto px-6 pb-[10%]`}
      >
        <ServicesSection serviceCards={serviceCardsData} />
      </div>
      <div ref={ref} style={fadeUpStyle}>
        <div className="rounded-zoom-responsive  relative  mx-auto w-[95%]   pb-[10%] md:w-4/5  lg:w-4/5">
          <div className="pt-10 text-center text-2xl font-bold text-[#FFFFFF] md:text-2xl lg:text-5xl">
            {headerTitle}
          </div>
          <div className="md:text-md px-8 text-center text-sm  text-[#FFFFFF] lg:text-lg">
            {headerBody}
          </div>
          <div className="md:text-md  mt-[5%] text-sm text-[#FFFFFF]  lg:text-lg">
            <div className="flex flex-col md:flex-col lg:flex lg:flex-row">
              <div className="w-full px-8 lg:w-1/2">
                {leftColumnData.map((item: any, index: any) => (
                  <div key={index}>
                    <div className="mb-2 font-bold italic">{item.title}</div>
                    <div>
                      {item.text.map((paragraph: any, pIndex: any) => (
                        <div key={pIndex} className="mb-6">
                          {paragraph}
                        </div>
                      ))}
                    </div>
                    {item.images &&
                      item.images[0] !== 'No images available' && (
                        <div>
                          {item.images.map((image: any, imgIndex: any) => (
                            <img
                              className="mb-6"
                              key={imgIndex}
                              src={image}
                              alt={`Image for ${item.title}`}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <div className="w-full px-8 lg:w-1/2 ">
                {rightColumnData.map((item: any, index: any) => (
                  <div key={index}>
                    <div className="mb-2 font-bold italic">{item.title}</div>
                    <div>
                      {item.text.map((paragraph: any, pIndex: any) => (
                        <div key={pIndex} className="mb-6">
                          {paragraph}
                        </div>
                      ))}
                    </div>
                    {item.images &&
                      item.images[0] !== 'No images available' && (
                        <div>
                          {item.images.map((image: any, imgIndex: any) => (
                            <img
                              className="mb-6"
                              key={imgIndex}
                              src={image}
                              alt={`Image for ${item.title}`}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                ))}
                <form onSubmit={handleSubmit} className={formClasses}>
                  <div className=" mb-2 mt-6 flex justify-center border-b border-white text-base font-extrabold italic text-white sm:text-lg md:text-base lg:text-lg xl:text-2xl">
                    Liên hệ với chúng tôi
                  </div>
                  {/* <hr className="w-1/2 mt-2 flex justify-center border-t border-white" /> */}
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
                    className="mx-auto w-[8vw] min-w-[6rem] rounded-full bg-[#f05a24] p-2 font-bold text-white hover:bg-orange-400 hover:text-white sm:text-[0.8vw]"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
