import Link from 'next/link';

import { Background } from '@/background/Background';

import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';

const Hero = ({ homeHeroData }: any) => (
  <Background
    backgroundUrl="/home.png"
    style={{
      backgroundImage: `url('${homeHeroData?.imageUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'static',
      width: '100%',
      height: 'calc(100vw*0.6)',
      marginTop: '64px',
    }}
  >
    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={homeHeroData?.title}
        subTitle={homeHeroData?.subTitle}
        titleHighlight={homeHeroData?.titleHighlight}
        description=""
        button={
          <Link href="https://5t3m.my/nroc2024/">
            <Button xl>Thông tin cuộc thi</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
