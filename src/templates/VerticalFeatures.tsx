import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = ({ homeAboutUsData }: any) => (
  <Section>
    <VerticalFeatureRow homeAboutUsData={homeAboutUsData} />
  </Section>
);

export { VerticalFeatures };
