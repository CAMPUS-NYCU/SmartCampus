import veryUnCrowded from '../assets/images/veryUnCrowded.svg'
import unCrowded from '../assets/images/unCrowded.svg'
import normalCrowded from '../assets/images/normalCrowded.svg'
import Crowded from '../assets/images/Crowded.svg'
import veryCrowded from '../assets/images/veryCrowded.svg'
import notOpen from '../assets/images/notOpen.svg'
import bigVeryUnCrowded from '../assets/images/bigVeryUnCrowded.svg'
import bigUnCrowded from '../assets/images/bigUnCrowded.svg'
import bigNormalCrowded from '../assets/images/bigNormalCrowded.svg'
import bigCrowded from '../assets/images/bigCrowded.svg'
import bigVeryCrowded from '../assets/images/bigVeryCrowded.svg'
import bigNotOpen from '../assets/images/bigNotOpen.svg'

export const fixedTagContext = [
  {
    locationName: '圖書館',
    information: [
      {
        floor: 'B1'
      },
      {
        floor: '2F'
      },
      {
        floor: '3F'
      },
      {
        floor: '4F'
      },
      {
        floor: '5F'
      },
      {
        floor: '6F'
      },
      {
        floor: '7F'
      }
    ]
  },
  {
    locationName: '第二餐廳',
    information: [
      {
        floor: '1F'
      },
      {
        floor: '2F'
      }
    ]
  },
  {
    locationName: '小木屋鬆餅',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '第一餐廳',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '女二餐廳 - B棟',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '女二餐廳 - A棟',
    information: [
      {
        floor: '1F'
      },
      {
        floor: '2F'
      }
    ]
  },
  {
    locationName: '研三餐廳',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '綜合球館',
    information: [
      {
        floor: 'B1'
      },
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '游泳館',
    information: [
      {
        floor: '1F'
      },
      {
        floor: '2F'
      }
    ]
  },
  {
    locationName: '西區球場（籃球場）',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '西區球場（排球場）',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '西區球場（網球場）',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '東區球場（羽球舊館）',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '東區球場（戶外網球場）',
    information: [
      {
        floor: '1F'
      }
    ]
  },
  {
    locationName: '體育館',
    information: [
      {
        floor: 'B1'
      },
      {
        floor: '1F'
      }
    ]
  }
]

export const fixedTagStatus = [
  {
    id: 0,
    statusName: '非常不擁擠',
    color: '#D3E430',
    img: veryUnCrowded,
    bigImg: bigVeryUnCrowded
  },
  {
    id: 1,
    statusName: '不擁擠',
    color: '#FAE391',
    img: unCrowded,
    bigImg: bigUnCrowded
  },
  {
    id: 2,
    statusName: '普通',
    color: '#FFCC80',
    img: normalCrowded,
    bigImg: bigNormalCrowded
  },
  {
    id: 3,
    statusName: '擁擠',
    color: '#FFAB6E',
    img: Crowded,
    bigImg: bigCrowded
  },
  {
    id: 4,
    statusName: '非常擁擠',
    color: '#FF8965',
    img: veryCrowded,
    bigImg: bigVeryCrowded
  },
  {
    id: 5,
    statusName: '暫停服務',
    color: '#D8D8D8',
    img: notOpen,
    bigImg: bigNotOpen
  },
  {
    id: 5,
    statusName: '未營業',
    color: '#D8D8D8',
    img: notOpen,
    bigImg: bigNotOpen
  },
  {
    id: 5,
    statusName: '未開放',
    color: '#D8D8D8',
    img: notOpen,
    bigImg: bigNotOpen
  }
]
