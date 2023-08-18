import detailStatusMaintenanceIcon from '../assets/images/res1-detailStatusMaintenance.svg'
import detailStatusCleanIcon from '../assets/images/res1-detailStatusClean.svg'
import detailStatusCrowdIcon from '../assets/images/res1-detailStatusCrowd.svg'
import detailStatusFunctionIcon from '../assets/images/res1-detailStatusFunction.svg'
import detailStatusNoiseIcon from '../assets/images/res1-detailStatusNoise.svg'
import detailStatusOutlookIcon from '../assets/images/res1-detailStatusOutlook.svg'
import detailStatusThermalComfortIcon from '../assets/images/res1-detailStatusThermalComfort.svg'
import detailStatusUsageIcon from '../assets/images/res1-detailStatusUsage.svg'
import detailStatusOccupationIcon from '../assets/images/res1-detailStatusOccupation.svg'

export default [
  {
    status: '維護狀態',
    statusColor: '#9CD6D6',
    statusIcon: detailStatusMaintenanceIcon
  },
  {
    status: '功能狀態',
    statusColor: '#A4D6FF',
    statusIcon: detailStatusFunctionIcon
  },
  {
    status: '外觀狀態',
    statusColor: '#A6B6B6',
    statusIcon: detailStatusOutlookIcon
  },
  {
    status: '佔用狀態',
    statusColor: '#99B1D4',
    statusIcon: detailStatusOccupationIcon
  },
  {
    status: '清潔狀態',
    statusColor: '#DAAEDB',
    statusIcon: detailStatusCleanIcon
  },
  {
    status: '使用狀態',
    statusColor: '#FDAFC6',
    statusIcon: detailStatusUsageIcon
  },
  {
    status: '人潮狀態',
    statusColor: '#FA8888',
    statusIcon: detailStatusCrowdIcon
  },
  {
    status: '噪音狀態',
    statusColor: '#D3AAB1',
    statusIcon: detailStatusNoiseIcon
  },
  {
    status: '體感狀態',
    statusColor: '#FCA6D4',
    statusIcon: detailStatusThermalComfortIcon
  }
]
