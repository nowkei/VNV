import React from 'react';

const Footer: React.FC = () => {
  return (
    <div
      className="rounded-zoom-responsive bg-brown-700 p-4 text-white md:h-64 lg:h-64"
      style={{ backgroundColor: '#000', width: '100%' }}
    >
      <div className="mx-auto mt-8 flex flex-col items-center justify-between md:w-4/5 md:flex-row">
        <div>
          <img className="h-40 w-40" src="/logo2.jpg" alt="Your Company" />
        </div>

        <div className="my-2 flex items-center text-base sm:justify-center">
          <img className="pr-3" src="icon-footer-3.svg" />
          <div>0982566688</div>
        </div>
        <div className="my-2 flex items-center text-base">
          <img className="pr-3" src="icon-footer-2.svg" />
          <div>congnghegiaoducvinguoiviet@gmail.com</div>
        </div>
        <div className="my-2 flex items-center text-base">
          <img className="pr-3" src="icon-footer-1.svg" />
          <div>Số 24-H2 Khu đô thị Yên Hòa, Ngõ 6, <br></br>Phố Trần Kim Xuyến, Phường Yên Hòa,<br></br> Quận Cầu Giấy, thành phố Hà Nội, Việt Nam</div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
