import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  accountSetting: {
    general: {
      avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg'),
      username: 'akghosh',
      fullName: 'Amit Kumar Ghosh',
      email: 'akghosh@unofficed.com',
      company: 'Unofficed',
    },
    info: {
      bio: "Aloha, I'm Amit Ghosh, a web entrepreneur, trader and an avid blogger. Bitten by entrepreneurial bug, I got kicked out from college and ended up being unofficed. I manage a stock market Trading Forum in Slack. If you’re a trader then you’re welcome there. I write blog at Amit Ghosh. I run an IT company named Aeron7.",
      dob: '1993-04-03',
      country: 'India',
      website: 'http://www.amitghosh.net/',
      phone: 9658986525,
    },
    social: {
      socialLinks: {
        twitter: 'https://twitter.com/unofficedtweets',
        facebook: 'https://www.facebook.com/unofficed/',
        google: 'https://www.aeron7.com/',
        linkedIn: 'https://www.linkedin.com/unofficed',
        instagram: 'https://unofficed.com/trading-forum/',
        quora: 'https://www.quora.com/profile/Amit-Ghosh-280',
      },
      connections: {
        twitter: {
          profileImg: require('@/assets/images/avatars/akg.jpg'),
          id: 'unofficedtweets',
        },
        google: {
          profileImg: require('@/assets/images/avatars/aakg.jpg'),
          id: 'unofficed',
        },
        facebook: {},
        github: {},
      },
    },
    notification: {
      commentOnArticle: true,
      AnswerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false,
    },
  },
}
/* eslint-disable global-require */
mock.onGet('/account-setting/data').reply(() => [200, data.accountSetting])
