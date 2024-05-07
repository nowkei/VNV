import className from 'classnames';
import type { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface WorkWithUsIconProps {
  iconUrl: string;
  title: string;
  content: string | ReactNode;
  degree: number;
  paddingRight: number;
  margin: string;
  inView: boolean;
}

const iconConfigs = [
  {
    degree: 120,
    paddingRight: 20,
    margin: '5%',
    paddingRightContent: '',
  },
  {
    degree: 160,
    paddingRight: 0,
    margin: '5%',
    paddingRightContent: '34%',
  },
  {
    degree: 200,
    paddingRight: 0,
    margin: '5%',
    paddingRightContent: '30%',
  },
  {
    degree: 240,
    paddingRight: 0,
    margin: '5%',
    paddingRightContent: '10%',
  },
];
function WorkWithUsIcon({
  iconUrl,
  title,
  content,
  degree, // width=,
  paddingRight,
  margin,
  inView,
}: WorkWithUsIconProps) {
  return (
    <div
      className={`absolute w-[1331px] transition-all duration-[2s] ease-in-out`}
      style={{
        opacity: inView ? 100 : 0,
        transform: inView ? `rotate(${degree}deg)` : `rotate(0deg)`,
      }}
    >
      <div
        style={{
          transformOrigin: 'center left',
          transform: inView ? `rotate(-${degree}deg)` : `rotate(0deg)`,
          margin,
        }}
        className="flex"
      >
        <div
          className={`animate-follow absolute flex h-[118px] w-[118px] items-center justify-center`}
        >
          <img alt="vnv" src={iconUrl} />
        </div>
        <div
          className={`ignore-zoom ml-[20%]  text-white transition-all delay-[2s] duration-[1s] ease-in-out`}
          style={{
            opacity: inView ? 100 : 0,
          }}
        >
          <div className="text-[2vw] font-semibold lg:text-[1.5vw]">
            {title}
          </div>
          <div
            className="text-[1.5vw] font-semibold md:text-[1.5vw] lg:text-[1vw]"
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

function WorkWithUs({ contactData }: any) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust as needed
  });

  const circleBgClasses = className(
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

  const circleBackgroundClasses = className(
    'absolute',
    'h-[1331px]',
    'w-[1331px]',
    'rounded-full',
    'bg-white',
    'opacity-[14%]',
  );

  const joinWithUsTxtClasses = className(
    'ignore-zoom',
    'text-[3vw]',
    'font-bold',
    'text-white',
    'transition-all',
    'duration-[3s]',
    'ease-in-out',
    'transform',
    { 'opacity-0': !inView }, // Fade left effect
    { 'opacity-100': inView },
  );
  return (
    <div className="trandition-all w-full" ref={ref}>
      <div className="rounded-both-zoom-responsive mb-[300px] ml-[-246px] flex h-[1331px] w-[1331px] items-center">
        <div className={circleBackgroundClasses}></div>
        <div className="absolute ml-[382px]">
          <div className={joinWithUsTxtClasses}>
            Đồng hành cùng <div className="inline text-orange-1">VNV</div>
          </div>
          <img alt="vnv" className={circleBgClasses} src="/anhnen2.png" />
        </div>
        {/* <WorkWithUsIcon
          iconUrl="/Group 2017.png"
          title="Access to the Latest Equipment"
          content="You can access the latest technology and innovation This allows you to benefit from the best equipment for your specific job."
          degree={120}
          paddingRight={20}
          margin="5%"
          inView={inView}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2016.png"
          title="Maintenance and Support"
          margin="5%"
          content={
            <>
              <br />
              <div
                style={{
                  paddingRight: `34%`,
                }}
              >
                Your forklift hire service can include maintenance and support
                don’t have to worry about servicing the equipment, sourcing
                spare parts, or dealing with unexpected breakdowns
              </div>
            </>
          }
          degree={160}
          paddingRight={0}
          inView={inView}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2014.png"
          title="Cost Saving"
          margin="5%"
          content={
            <>
              <br />
              <div
                style={{
                  paddingRight: `30%`,
                }}
              >
                Your forklift hire service can include maintenance and support
                don’t have to worry about servicing the equipment, sourcing
                spare parts, or dealing with unexpected breakdowns
              </div>
            </>
          }
          degree={200}
          paddingRight={0}
          inView={inView}
        />
        <WorkWithUsIcon
          iconUrl="/Group 2015.png"
          title="Flexibility and Scalability"
          margin="5%"
          content={
            <>
              <br />
              <div
                style={{
                  paddingRight: `10%`,
                }}
              >
                Forklift rental provides flexibility to match your specific
                needs. You can quickly adjust the number and type of forklifts
                based on changing demands or project requirements
              </div>
            </>
          }
          degree={240}
          paddingRight={0}
          inView={inView}
        /> */}
        {contactData.map((data: any, index: any) => {
          const config = iconConfigs[index];
          if (!config) return [];
          return (
            <WorkWithUsIcon
              key={index}
              iconUrl={data.imageUrl}
              title={data.title}
              content={
                <>
                  <div
                    style={{
                      paddingRight: `${config.paddingRightContent}`,
                    }}
                  >
                    {data.body}
                  </div>
                </>
              }
              degree={config.degree}
              paddingRight={config.paddingRight}
              margin={config.margin}
              inView={inView}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WorkWithUs;
