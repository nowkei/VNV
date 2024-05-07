import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
  subTitle: string;
  titleHighlight: string;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="rounded-zoom-responsive absolute bottom-0  flex h-full flex-col justify-end pb-2 text-center " >
    <div className="text-[15px] font-black text-white sm:mb-2 sm:text-sm md:mb-2 md:text-3xl lg:mb-4 lg:text-4xl">
      {props.title}{' '}
      <span className="text-[#f05a24]">{props.titleHighlight}</span>
      <br />
      {props.subTitle}
    </div>
    <div className="text-sx sm:text-2lg md:text-3lg lg:text-4lg text-[50px] font-light text-white lg:mb-4">
      {props.button}
    </div>
  </header>
);

export { HeroOneButton };
