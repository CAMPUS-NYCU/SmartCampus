import SlovedIcon from '../assets/images/statusSlovedIcon.svg'
import UnslovedIcon from '../assets/images/statusUnslovedIcon.svg'
import PeopleFewIcon from '../assets/images/statusPeopleFewIcon.svg'
import PeopleNormalIcon from '../assets/images/statusPeopleNormalIcon.svg'
import PeopleCrowdedIcon from '../assets/images/statusPeopleCrowdedIcon.svg'
import WiFiGoodIcon from '../assets/images/statusWi-FiGoodIcon.svg'
import WiFiNormalIcon from '../assets/images/statusWi-FiNormalIcon.svg'
import WiFiBadIcon from '../assets/images/statusWi-FiBadIcon.svg'
import OnSlovedIcon from '../assets/images/statusOnSlovedIcon.svg'
import OnUnslovedIcon from '../assets/images/statusOnUnslovedIcon.svg'
import OnPeopleFewIcon from '../assets/images/statusOnPeopleFewIcon.svg'
import OnPeopleNormalIcon from '../assets/images/statusOnPeopleNormalIcon.svg'
import OnPeopleCrowdedIcon from '../assets/images/statusOnPeopleCrowdedIcon.svg'
import OnWiFiGoodIcon from '../assets/images/statusOnWi-FiGoodIcon.svg'
import OnWiFiNormalIcon from '../assets/images/statusOnWi-FiNormalIcon.svg'
import OnWiFiBadIcon from '../assets/images/statusOnWi-FiBadIcon.svg'

export const tagData = [
  {
    statusName: '人少',
    statusColor: '#dce775'
  },
  { statusName: '人稍多', statusColor: '#FFCC80' },
  { statusName: '擁擠', statusColor: '#FFB59F' },
  { statusName: '良好', statusColor: '#dce775' },
  { statusName: '正常', statusColor: '#FFCC80' },
  { statusName: '微弱', statusColor: '#FFB59F' }
]
export default [
  [
    {
      statusName: '存在',
      statusColor: '#dce775',
      statusIcon: SlovedIcon,
      statusOnIcon: OnSlovedIcon
    },
    {
      statusName: '資訊有誤',
      statusColor: '#FFB59F',
      statusIcon: UnslovedIcon,
      statusOnIcon: OnUnslovedIcon
    }
  ],
  [
    {
      statusName: '待處理',
      statusColor: '#FFB59F',
      statusIcon: UnslovedIcon,
      statusOnIcon: OnUnslovedIcon
    },
    {
      statusName: '已解決',
      statusColor: '#dce775',
      statusIcon: SlovedIcon,
      statusOnIcon: OnSlovedIcon
    }
  ],
  [
    {
      statusName: '人少',
      statusColor: '#dce775'
    },
    { statusName: '人稍多', statusColor: '#FFCC80' },
    { statusName: '擁擠', statusColor: '#FFB59F' },
    { statusName: '微弱', statusColor: '#FFB59F' },
    { statusName: '正常', statusColor: '#FFCC80' },
    { statusName: '良好', statusColor: '#dce775' }
  ],
  [
    {
      statusName: '人少',
      statusColor: '#dce775',
      statusIcon: PeopleFewIcon,
      statusOnIcon: OnPeopleFewIcon
    },
    {
      statusName: '人稍多',
      statusColor: '#FFCC80',
      statusIcon: PeopleNormalIcon,
      statusOnIcon: OnPeopleNormalIcon
    },
    {
      statusName: '擁擠',
      statusColor: '#FFB59F',
      statusIcon: PeopleCrowdedIcon,
      statusOnIcon: OnPeopleCrowdedIcon
    }
  ],
  [
    {
      statusName: '良好',
      statusColor: '#dce775',
      statusIcon: WiFiGoodIcon,
      statusOnIcon: OnWiFiGoodIcon
    },
    {
      statusName: '正常',
      statusColor: '#FFCC80',
      statusIcon: WiFiNormalIcon,
      statusOnIcon: OnWiFiNormalIcon
    },
    {
      statusName: '微弱',
      statusColor: '#FFB59F',
      statusIcon: WiFiBadIcon,
      statusOnIcon: OnWiFiBadIcon
    }
  ]
]
