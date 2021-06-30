import SlovedIcon from 'assets/images/statusSlovedIcon.svg'
import UnslovedIcon from 'assets/images/statusUnslovedIcon.svg'
import FewPeopleIcon from 'assets/images/statusFewPeopleIcon.svg'
import LittleMorePeopleIcon from 'assets/images/statusLittleMorePeopleIcon.svg'
import CrowdedIcon from 'assets/images/statusCrowdedIcon.svg'
import WiFiGoodIcon from 'assets/images/statuWi-FiGoodIcon.svg'
import WiFiNormalIcon from 'assets/images/statusWi-FiNormalIcon.svg'
import WiFiBadIcon from 'assets/images/statusWi-FiBadIcon.svg'

export default [
  [
    {
      statusName: '存在',
      statusColor: '#dce775',
      statusIcon: SlovedIcon
    },
    {
      statusName: '資訊有誤',
      statusColor: '#FFB59F',
      statusIcon: UnslovedIcon
    }
  ],
  [
    {
      statusName: '待處理',
      statusColor: '#FFB59F',
      statusIcon: UnslovedIcon
    },
    {
      statusName: '已解決',
      statusColor: '#dce775',
      statusIcon: SlovedIcon
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
    { statusName: '人少', statusColor: '#dce775', statusIcon: FewPeopleIcon },
    {
      statusName: '人稍多',
      statusColor: '#FFCC80',
      statusIcon: LittleMorePeopleIcon
    },
    { statusName: '擁擠', statusColor: '#FFB59F', statusIcon: CrowdedIcon }
  ],
  [
    { statusName: '良好', statusColor: '#dce775', statusIcon: WiFiGoodIcon },
    {
      statusName: '正常',
      statusColor: '#FFCC80',
      statusIcon: WiFiNormalIcon
    },
    { statusName: '微弱', statusColor: '#FFB59F', statusIcon: WiFiBadIcon }
  ]
]
