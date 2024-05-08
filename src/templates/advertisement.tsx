import React from 'react';

interface AdvertisementProps {
  logoBanners: [{ imageUrl: string }];
}

const Advertisement: React.FC<AdvertisementProps> = ({ logoBanners }) => {
  return (
    <div className="logos bg-[#47b1c9]">
      <div className="logos-slide w-max px-4 py-2">
        {logoBanners?.map((imageUrl, index) => (
          <div key={index} className="px-4" style={{ display: 'inline' }}>
            <img
              src={imageUrl.imageUrl}
              alt={`Logo ${index}`}
              style={{ display: 'inline' }}
            />
          </div>
        ))}
      </div>
      <div className="logos-slide w-max px-4 py-2">
        {logoBanners?.map((imageUrl, index) => (
          <div key={index} className="px-4" style={{ display: 'inline' }}>
            <img
              src={imageUrl.imageUrl}
              alt={`Logo ${index}`}
              style={{ display: 'inline' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
