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
          <Link href="https://cdn2.me-qr.com/pdf/22173796.pdf">
            <Button xl>Thông tin cuộc thi ROBOTHON 2024</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
