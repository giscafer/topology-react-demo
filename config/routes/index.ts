export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },

  {
    path: '/welcome',
    name: '总览',
    icon: 'rh-icon-gongyezujian-yibiaopan',
    component: './Welcome',
  },
  {
    path: '/table',
    name: '表格示例',
    icon: 'rh-icon-liebiao',
    routes: [
      {
        path: '/table/simple',
        name: '简单表格',
        component: './table/simple',
      },
      {
        path: '/table/complex',
        name: '复杂表格',
        component: './table/complex',
      },
      {
        path: '/table/mock',
        name: 'mock 表格',
        component: './table/mock',
      },
    ],
  },
  {
    path: '/form',
    name: '表单',
    icon: 'rh-icon-shiyongwendang',
    routes: [
      {
        path: '/form/basic',
        name: '基础表单',
        component: './form/basic-form',
      },
    ],
  },
  {
    path: '/charts',
    name: '图表',
    icon: 'rh-icon-tubiao-bingtu',
    component: './charts',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
