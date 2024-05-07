import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface WorkWithUsIconProps {
  iconUrl: string;
  title: string;
  content: string | ReactNode;
  degree: number;
  paddingRight: number;
  margin: string;
  index: number;
  inView: boolean;
}

const iconConfigs = [
  {
    index: 0,
  },
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
];

function WorkWithUsIcon({
  iconUrl,
  title,
  content,
  degree, // width=,
  paddingRight,
  index,
  inView,
}: WorkWithUsIconProps) {
  return (
    <div
      // eslint-disable-next-line tailwindcss/classnames-order
      className={`transition-all duration-[3s] ease-in-out`}
      style={{
        transform: `rotate(${degree}deg)`,
        marginBottom: '6%',
        opacity: inView ? 100 : 0,
        transitionDelay: `${index / 3}s`,
      }}
    >
      <div
        style={{
          transformOrigin: 'center left',
          transform: `rotate(-${degree}deg)`,
          // margin,
        }}
        className="flex"
      >
        <div
          className={`animate-follow mr-[5%] h-[20%] w-[20%] items-center justify-center`}
        >
          <img src={iconUrl} alt="" />
        </div>
        <div
          // eslint-disable-next-line prettier/prettier, prefer-template, tailwindcss/classnames-order
          className={`ignore-zoom  text-white`}
        >
          <div className="text-[4vw] font-semibold">{title}</div>
          <div
            className="text-[3vw] font-semibold md:text-[1.5vw]"
            style={{
              paddingRight: `${paddingRight}%`,
            }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkWithUsMobile({ contactData }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust as needed
  });
  const [refList, inViewList] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust as needed
  });
  const joinWithUsTxtClasses = classNames(
    'ignore-zoom',
    'text-[4vw]',
    'font-bold',
    'text-white',
    'transition-all',
    'duration-[3s]',
    'ease-in-out',
    'transform',
    { 'opacity-0': !inView }, // Fade left effect
    { 'opacity-100': inView },
  );
  const circleBgClasses = classNames(
    'ml-[-356px]',
    'mt-[8px]',
    'w-[1546px]',
    'transition-all',
    'duration-1000',
    'ease-in-out',
    'transform',
    { 'opacity-0 -translate-x-20': !inView }, // Fade left effect
    { 'opacity-100 translate-x-0': inView },
  );
  return (
    <div className="w-full">
      <div className="rounded-both-zoom-responsive ml-[246px] flex h-[1331px] w-[1331px] items-center">
        <div className="absolute h-[1331px] w-[1331px] rounded-full bg-white opacity-[14%]"></div>
        <div className="absolute ml-[382px]" ref={ref}>
          <div className={joinWithUsTxtClasses}>Đồng hành cùng <div className="inline text-orange-1">VNV</div></div>
          <img
            alt=""
            className={circleBgClasses}
            src="/anhnen2.png"
          />
        </div>
      </div>
      <div
        className="rounded-both-zoom-responsive m-[5%] items-center"
        ref={refList}
      >
        {contactData.map((data: any, index: any) => {
          const config = iconConfigs[index];
          if (!config) return [];
          return (
            <WorkWithUsIcon
              key={index}
              iconUrl={data.imageUrl}
              title={data.title}
              content={<div>{data.body}</div>}
              degree={0}
              paddingRight={0}
              margin="0%"
              index={config.index}
              inView={inViewList}
            />
          );
        })}
        {/* <WorkWithUsIcon
          iconUrl="/Group 2017.png"
          title="Access to the Latest Equipment"
          content={
            <div>
              You can access the latest technology and innovation This allows
              you to benefit from the best equipment for your specific job.
            </div>
          }
          degree={0}
          paddingRight={0}
          margin="0%"
          index={0}
          inView={inViewList}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2016.png"
          title="Maintenance and Support"
          margin="0%"
          content={
            <>
              <br />
              <div>
                Your forklift hire service can include maintenance and support
                don’t have to worry about servicing the equipment, sourcing
                spare parts, or dealing with unexpected breakdowns
              </div>
            </>
          }
          degree={0}
          paddingRight={0}
          index={1}
          inView={inViewList}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2014.png"
          title="Cost Saving"
          margin="0%"
          content={
            <>
              <br />
              <div>
                Your forklift hire service can include maintenance and support
                don’t have to worry about servicing the equipment, sourcing
                spare parts, or dealing with unexpected breakdowns
              </div>
            </>
          }
          degree={0}
          paddingRight={0}
          index={2}
          inView={inViewList}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2015.png"
          title="Flexibility and Scalability"
          margin="0%"
          content={
            <>
              <br />
              <div>
                Forklift rental provides flexibility to match your specific
                needs. You can quickly adjust the number and type of forklifts
                based on changing demands or project requirements
              </div>
            </>
          }
          degree={0}
          paddingRight={0}
          index={3}
          inView={inViewList}
        /> */}
      </div>
    </div>
  );
}

export default WorkWithUsMobile;
