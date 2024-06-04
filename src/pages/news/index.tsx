import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import sanityClient from '../../lib/sanityClient';
import Link from 'next/link';

export const getStaticProps = async () => {
  const headerQuery = `*[_type == "HeaderNews"]{
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

  const rightColumnQuery = `*[_type == "rightBodyNewsColumn"] | order(_createdAt asc) {
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
    },
    url
  }`;

  const themeNews = `*[_type == "themeNews"] | order(_createdAt asc) {
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
    },
    url
  }`;

  const rightBottomColumnQuery = `*[_type == "rightBottomBodyNews"] | order(_createdAt asc) {
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
    },
    url
  }`;

  const leftBottomColumnQuery = `*[_type == "leftBottomBodyNews"] | order(_createdAt asc) {
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
    },
    url
  }`;

  const leftColumnQuery = `*[_type == "leftBodyNewsColumn"]{
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
    },
    url
  }`;

  const leftNewsColumnQuery = `*[_type == "leftNewsColumn"] | order(_createdAt asc) {
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
  const headerData: any = await sanityClient.fetch(headerQuery);
  const rightBottomData: any = await sanityClient.fetch(rightBottomColumnQuery);
  const leftBottomData: any = await sanityClient.fetch(leftBottomColumnQuery);
  const leftNewsColumnData: any = await sanityClient.fetch(leftNewsColumnQuery);
  const themeNewsData: any = await sanityClient.fetch(themeNews);

  const processedBody =
    headerData.length > 0 && headerData[0].body
      ? headerData[0].body
          .map((block: any) =>
            block.children.map((child: any) => child.text).join(' '),
          )
          .join('\n')
      : 'No content available';

  const processData = (data: any) =>
    data.map((item: any) => ({
      title: item.title,
      text: item.body
        ? item.body.map((block: any) =>
            block.children.map((child: any) => child.text).join('\n'),
          )
        : [],
      images: item.images ? item.images.map((image: any) => image.asset.url) : [],
      url: item.url || '#',
    }));

  const finalData = (data: any) =>
    processData(data).map((item: any) => ({
      ...item,
      title: item.title || '',
      text: item.text.length > 0 ? item.text : [''],
      images: item.images.length > 0 ? item.images : ['No images available'],
    }));

  return {
    props: {
      leftColumnData: finalData(leftColumnData),
      rightBottomData: finalData(rightBottomData),
      leftBottomData: finalData(leftBottomData),
      rightColumnData: finalData(rightColumnData),
      leftNewsColumnData: finalData(leftNewsColumnData),
      themeNewsData: finalData(themeNewsData),
      headerBody: processedBody,
    },
  };
};

function Services({
  rightColumnData,
  rightBottomData,
  leftColumnData,
  leftBottomData,
  leftNewsColumnData,
  headerBody,
  headerTitle,
  themeNewsData
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

  const fadeUpStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
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

        .hover-effect {
          transition: all 0.3s ease;
        }

        .hover-effect:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .text-2xl,
        .text-sm,
        .text-lg,
        .font-bold,
        .italic {
        }
      `}</style>
      <div ref={ref} style={fadeUpStyle}>
        <div className="rounded-zoom-responsive relative mx-auto w-[95%] pb-[10%] md:w-5/5 lg:w-5/5">
          <div className="pt-10 text-center text-2xl font-bold text-[#000] md:text-2xl lg:text-5xl">
            {themeNewsData.map((item: any, index: any) => (
                      <div key={index}>
                        <Link href={item.url} passHref>
                          <div className="mb-2 font-bold italic">{item.title}</div>
                          <div>
                            {item.text.map((paragraph: any, pIndex: any) => (
                              <div key={pIndex} className="mb-6">
                                {paragraph}
                              </div>
                            ))}
                          </div>
                          {item.images && item.images[0] !== 'No images available' && (
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
                        </Link>
                      </div>
                    ))}
          </div>
          <div className="md:text-md mt-[5%] text-sm text-[#000] lg:text-lg">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-1 border border-green-500 p-4 rounded-lg shadow-md hover-effect">
                {leftNewsColumnData.map((item: any, index: any) => (
                  <div key={index}>
                    <div className="mb-2 font-bold italic">{item.title}</div>
                    <div>
                      {item.text.map((paragraph: any, pIndex: any) => (
                        <div key={pIndex} className="mb-6">
                          {paragraph}
                        </div>
                      ))}
                    </div>
                    {item.images && item.images[0] !== 'No images available' && (
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
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-green-500 p-4 rounded-lg shadow-md hover-effect">
                    {leftColumnData.map((item: any, index: any) => (
                      <div key={index}>
                        <Link href={item.url} passHref>
                          <div className="mb-2 font-bold italic">{item.title}</div>
                          <div>
                            {item.text.map((paragraph: any, pIndex: any) => (
                              <div key={pIndex} className="mb-6">
                                {paragraph}
                              </div>
                            ))}
                          </div>
                          {item.images && item.images[0] !== 'No images available' && (
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
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="border border-green-500 p-4 rounded-lg shadow-md hover-effect">
                    {rightColumnData.map((item: any, index: any) => (
                      <div key={index}>
                        <Link href={item.url} passHref>
                          <div className="mb-2 font-bold italic">{item.title}</div>
                          <div>
                            {item.text.map((paragraph: any, pIndex: any) => (
                              <div key={pIndex} className="mb-6">
                                {paragraph}
                              </div>
                            ))}
                          </div>
                          {item.images && item.images[0] !== 'No images available' && (
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
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="border border-green-500 p-4 rounded-lg shadow-md hover-effect">
                    {leftBottomData.map((item: any, index: any) => (
                      <div key={index}>
                        <Link href={item.url} passHref>
                          <div className="mb-2 font-bold italic">{item.title}</div>
                          <div>
                            {item.text.map((paragraph: any, pIndex: any) => (
                              <div key={pIndex} className="mb-6">
                                {paragraph}
                              </div>
                            ))}
                          </div>
                          {item.images && item.images[0] !== 'No images available' && (
                            <div>
                              {item.images.map((image: any, imgIndex: any) => (
                                <img
                                  className="mb-6"
                                  key={imgIndex}
                                  src={image}
                                  alt={`Image for {item.title}`}
                                />
                              ))}
                            </div>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="border border-green-500 p-4 rounded-lg shadow-md hover-effect">
                    {rightBottomData.map((item: any, index: any) => (
                      <div key={index}>
                        <Link href={item.url} passHref>
                          <div className="mb-2 font-bold italic">{item.title}</div>
                          <div>
                            {item.text.map((paragraph: any, pIndex: any) => (
                              <div key={pIndex} className="mb-6">
                                {paragraph}
                              </div>
                            ))}
                          </div>
                          {item.images && item.images[0] !== 'No images available' && (
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
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
