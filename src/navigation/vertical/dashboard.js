// export default [
//   {
//     title: 'Dashboards',
//     // route: 'apps-email',
//     icon: 'HomeIcon',
//   },
//   {
//     title: 'Positions',
//     route: 'dashboard-positions',
//     icon: 'ServerIcon',
//   },
//   {
//     title: 'Square Off',
//     route: 'dashboard-squareoff',
//     icon: 'AlertTriangleIcon',
//   },
// ]
export default [
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    tag: '2',
    tagVariant: 'light-success',
    children: [
      {
        title: 'Positions',
        route: 'dashboard-positions',
        icon: 'ServerIcon',
      },
      {
        title: 'Grouped Positions',
        route: 'dashboard-positionsv1',
        icon: 'ServerIcon',
      },
    ],
  },
  {
    title: 'Beta Function',
    icon: 'CodesandboxIcon',
    tag: '4',
    tagVariant: 'light-danger',
    children: [
      {
        title: 'MTM P&L Triggers',
        route: 'dashboard-mtmpnltriggers',
        icon: 'ZapIcon',
      },
      {
        title: 'Power Kill',
        route: 'dashboard-powerkill',
        icon: 'XSquareIcon',
      },
      {
        title: 'Date & Time',
        route: 'dashboard-dateandtime',
        icon: 'CalendarIcon',
      },
      {
        title: 'Capital Percentage',
        route: 'dashboard-squareoff',
        icon: 'AlertTriangleIcon',
      },
    ],
  },
  {
    title: 'API Credentials',
    route: 'dashboard-api',
    icon: 'KeyIcon',
  },
  {
    title: 'Under Progress',
    icon: 'CoffeeIcon',
    tag: '1',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'API Data',
        route: 'dashboard-apidata',
        icon: 'DatabaseIcon',
      },
    ],
  },
]
