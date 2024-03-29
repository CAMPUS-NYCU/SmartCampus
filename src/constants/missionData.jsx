import { SubOptionOther } from '../utils/contexts/MissionContext'

export default [
  // ==================== 無障礙設施 ====================
  {
    id: 1,
    name: '無障礙設施',
    subOption: {
      title: '這裡有什麼？',
      options: [
        {
          id: 1,
          name: '無障礙設施'
        },
        {
          id: 2,
          name: '扶手'
        },
        {
          id: 3,
          name: '升降梯'
        },
        {
          id: 4,
          name: '樓梯'
        },
        {
          id: 5,
          name: '避難層坡道'
        },
        {
          id: 6,
          name: '廁所'
        },
        {
          id: SubOptionOther,
          name: '其他'
        }
      ]
    },
    subRate: {
      title: 'Accessibility：',
      textMin: '不能使用',
      textMax: '方便使用',
      textEachStar: [
        '完全無法使用',
        '不方便使用',
        '可以使用，些微損毀',
        '能使用',
        '方便使用'
      ]
    }
  },
  // ==================== ./無障礙設施 ====================
  // ==================== 道路障礙 ====================
  {
    id: 2,
    name: '道路障礙',
    subOption: {
      title: '這裡發生什麼？',
      options: [
        {
          id: 1,
          name: '走道破損'
        },
        {
          id: 2,
          name: '樓梯損毀'
        },
        {
          id: 3,
          name: '淹水'
        },
        {
          id: 4,
          name: '樹木倒塌'
        },
        {
          id: 5,
          name: '垃圾堆積'
        },
        {
          id: SubOptionOther,
          name: '其他'
        }
      ]
    },
    subRate: {
      title: '嚴重程度',
      textMin: '可以通行',
      textMax: '不能通行',
      textEachStar: [
        '完全無法通行',
        '不方便通行',
        '有點危險但仍可以通行',
        '能通行',
        '方便通行'
      ]
    }
  }
  // ==================== ./道路障礙 ====================
]
