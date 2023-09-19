import detailStatusMaintenanceIcon from '../assets/images/res1-detailStatusMaintenance.svg' // 保養狀態
import detailStatusCleanIcon from '../assets/images/res1-detailStatusClean.svg' // 清潔
import detailStatusCrowdIcon from '../assets/images/res1-detailStatusCrowd.svg' // 人潮
import detailStatusFunctionIcon from '../assets/images/res1-detailStatusFunction.svg' // 功能
import detailStatusNoiseIcon from '../assets/images/res1-detailStatusNoise.svg' // 噪音
import detailStatusOutlookIcon from '../assets/images/res1-detailStatusOutlook.svg' // 外觀
import detailStatusThermalComfortIcon from '../assets/images/res1-detailStatusThermalComfort.svg' // 體感
import detailStatusUsageIcon from '../assets/images/res1-detailStatusUsage.svg' // 使用
import detailStatusOccupationIcon from '../assets/images/res1-detailStatusOccupation.svg' // 占用

export default [
  // 物體的五個狀態
  {
    status: '保養狀態',
    statusColor: '#9CD6D6',
    statusIcon: detailStatusMaintenanceIcon,
    statusOptions: ['保養完成', '保養中'],
    categoryType: '物體'
  },
  {
    status: '功能狀態',
    statusColor: '#A4D6FF',
    statusIcon: detailStatusFunctionIcon,
    statusOptions: ['功能正常', '尚可使用', '無法使用'],
    categoryType: '物體'
  },
  {
    status: '外觀狀態',
    statusColor: '#A6B6B6',
    statusIcon: detailStatusOutlookIcon,
    statusOptions: ['完好無損', '外觀破損'],
    categoryType: '物體'
  },
  {
    status: '佔用狀態',
    statusColor: '#99B1D4',
    statusIcon: detailStatusOccupationIcon,
    statusOptions: ['無人使用', '有人佔用'],
    categoryType: '物體'
  },
  {
    status: '清潔狀態',
    statusColor: '#DAAEDB',
    statusIcon: detailStatusCleanIcon,
    statusOptions: ['整潔', '普通', '髒亂'],
    categoryType: '物體'
  },
  // 空間的五個狀態
  {
    status: '使用狀態',
    statusColor: '#FDAFC6',
    statusIcon: detailStatusUsageIcon,
    statusOptions: ['尚有空位', '空位有限', '已無空位'],
    categoryType: '空間'
  },
  {
    status: '人潮狀態',
    statusColor: '#FA8888',
    statusIcon: detailStatusCrowdIcon,
    statusOptions: ['擁擠', '普通', '沒人'],
    categoryType: '空間'
  },
  {
    status: '噪音狀態',
    statusColor: '#D3AAB1',
    statusIcon: detailStatusNoiseIcon,
    statusOptions: ['安靜', '普通', '吵雜'],
    categoryType: '空間'
  },
  {
    status: '體感狀態',
    statusColor: '#FCA6D4',
    statusIcon: detailStatusThermalComfortIcon,
    statusOptions: ['舒適', '普通', '不適'],
    categoryType: '空間'
  },
  {
    status: '清潔狀態',
    statusColor: '#DAAEDB',
    statusIcon: detailStatusCleanIcon,
    statusOptions: ['整潔', '普通', '髒亂'],
    categoryType: '空間'
  }
]
