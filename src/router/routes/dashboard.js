export default [
  {
    path: '/dashboard/positions',
    name: 'dashboard-positions',
    component: () => import('@/views/dashboard/positions/Positions.vue'),
  },
  {
    path: '/dashboard/positionsv1',
    name: 'dashboard-positionsv1',
    component: () => import('@/views/dashboard/positionsv1/PositionsV1.vue'),
  },
  {
    path: '/dashboard/squareoff',
    name: 'dashboard-squareoff',
    component: () => import('@/views/dashboard/squareoff/Squareoff.vue'),
  },
  {
    path: '/dashboard/mtmpnltriggers',
    name: 'dashboard-mtmpnltriggers',
    component: () => import('@/views/dashboard/mtmpnltriggers/Mtmpnltriggers.vue'),
  },
  {
    path: '/dashboard/dateandtime',
    name: 'dashboard-dateandtime',
    component: () => import('@/views/dashboard/dateandtime/Dateandtime.vue'),
  },
  {
    path: '/dashboard/powerkill',
    name: 'dashboard-powerkill',
    component: () => import('@/views/dashboard/powerkill/Powerkill.vue'),
  },
  {
    path: '/dashboard/api',
    name: 'dashboard-api',
    component: () => import('@/views/dashboard/api/Api.vue'),
  },

  {
    path: '/dashboard/apidata',
    name: 'dashboard-apidata',
    component: () => import('@/views/dashboard/apidata/Apidata.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
    },
  },
  {
    path: '/dashboard/apidata:folder',
    name: 'dashboard-apidata-folder',
    component: () => import('@/views/dashboard/apidata/Apidata.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'dashboard-apidata',
    },
    beforeEnter(to, _, next) {
      if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) next()
      else next({ name: 'error-404' })
    },
  },
  {
    path: '/dashboard/apidata/label/:label',
    name: 'dashboard-apidata-label',
    component: () => import('@/views/dashboard/apidata/Apidata.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'email-application',
      navActiveLink: 'dashboard-apidata',
    },
    beforeEnter(to, _, next) {
      if (['personal', 'company', 'important', 'private'].includes(to.params.label)) next()
      else next({ name: 'error-404' })
    },
  },
]
