import { FC } from 'react';
import { Callout } from '@uniformdev/mesh-sdk-react';

const CalloutNonThemeSelected: FC = () => (
  <Callout type="info">
    It seems that none of the themes is selected. Please visit the &quot;Integrations &gt; Theme pack &quot;
    page to select the theme
  </Callout>
);

export default CalloutNonThemeSelected;
