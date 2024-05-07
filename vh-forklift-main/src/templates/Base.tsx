import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Hero } from './Hero';
import KeepInTouch from './KeepInTouch';
import { VerticalFeatures } from './VerticalFeatures';
import Welcome from './Welcome';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <div className="container mx-10">
      <VerticalFeatures />
      <Welcome />
      <KeepInTouch />
    </div>
  </div>
);

export { Base };
