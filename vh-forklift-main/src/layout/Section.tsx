import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
  description2?: string;
};

const Section = (props: ISectionProps) => (
  <>
    <div
      className={`mx-auto flex flex-col items-center justify-end ${
        props.yPadding ? props.yPadding : 'py-4'
      }`}
    >
      {(props.title || props.description) && (
        <div className="mb-12 text-center">
          {props.title && (
            <h2 className="font-bold text-[#6C553E] sm:text-2xl md:text-base lg:text-4xl">
              {props.title}
            </h2>
          )}
          {props.description && (
            <div className="text-[#6C553E] sm:text-sm md:px-20 md:text-base lg:text-2xl">
              {props.description}
            </div>
          )}
          {props.description2 && (
            <div className="font-normal text-[#6C553E] md:px-20 lg:text-2xl">
              {props.description2}
            </div>
          )}
        </div>
      )}

      {props.children}
    </div>
  </>
);

export { Section };
