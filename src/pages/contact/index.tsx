import WantToHire from '@/feature/WantToHide';
import WorkWithUs from '@/feature/WorkWithUs';
import WorkWithUsMobile from '@/feature/WorkWithUsMobile';

import sanityClient from '../../lib/sanityClient';

export const getStaticProps = async () => {
  const contactQuery = `*[_type == "contact"] | order(_createdAt asc)[0...4]{
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

  const contactData = await sanityClient.fetch(contactQuery);

  const processedContactData = contactData.map((contact: any) => ({
    title: contact.title,
    body: contact.body
      .map((block: any) =>
        block.children.map((child: any) => child.text).join(' '),
      )
      .join('\n'),
    imageUrl: contact.image?.asset.url,
  }));

  return {
    props: {
      contactData: processedContactData,
    },
  };
};

function ContactUs({ contactData }: any) {
  return (
    <div>
      <div>
        <WantToHire />
      </div>
      <div className="my-[20vh]">
        <div className="hidden sm:block">
          <WorkWithUs contactData={contactData} />
        </div>
        <div className="block sm:hidden">
          <WorkWithUsMobile contactData={contactData} />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
