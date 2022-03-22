import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'RootHub Scaffold',
  pwa: false,
  logo: '/icons/logo.svg',
  iconfontUrl: '//at.alicdn.com/t/font_2875265_kc45d9jar1k.js',
};

export default Settings;
