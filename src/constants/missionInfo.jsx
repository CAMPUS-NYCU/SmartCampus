export const missionInfo = [
  {
    missionName: '設施回報',
    missionDescription: '回報此處設施，例如無障礙設施與交通設施。'
  },
  {
    missionName: '問題回報',
    missionDescription: '回報待解決的問題，例如積水與道路施工。'
  },
  {
    missionName: '動態回報',
    missionDescription: '回報固定地點的人潮，例如餐廳的擁擠程度。'
  }
]

export const missionGuide = [
  {
    missionName: '校園設施',
    missionDescription: '校園中的各種設施，包含無障礙與交通設施等等。'
  },
  {
    missionName: '校園問題',
    missionDescription: '校園中待解決的問題，像是積水、道路施工等等。'
  },
  {
    missionName: '校園動態',
    missionDescription: '校園各個地點的人潮，像是餐廳、球場等等。'
  }
]
export const missionName = [
  {
    missionName: '設施類型',
    missionDescription: '具體設施'
  },
  {
    missionName: '問題類型',
    missionDescription: '具體問題'
  },
  {
    missionName: '動態類型',
    missionDescription: '請選擇目前狀態'
  }
]
export const facilitySubType = [
  [
    {
      subTypeName: '無障礙設施',
      target: [
        {
          targetName: '無障礙坡道'
        },
        {
          targetName: '無障礙電梯'
        },
        {
          targetName: '扶手'
        },
        {
          targetName: '升降梯'
        },
        {
          targetName: '廁所'
        },
        {
          targetName: '樓梯'
        },
        {
          targetName: '避難層坡道'
        },
        {
          targetName: '其他'
        }
      ]
    },
    {
      subTypeName: 'Wi-Fi',
      target: [
        {
          targetName: 'NYCU'
        }
      ]
    }
  ],
  [
    {
      subTypeName: '道路不通',
      target: [
        {
          targetName: '地面損毀'
        },
        {
          targetName: '地面積水'
        },
        {
          targetName: '垃圾堆積'
        },
        {
          targetName: '樹木倒塌'
        },
        {
          targetName: '工程施工'
        }
      ]
    },
    {
      subTypeName: '道路/設施維修',
      target: [
        {
          targetName: '路燈沒亮'
        }
      ]
    },
    {
      subTypeName: '環境衛生',
      target: [
        {
          targetName: '垃圾桶已滿'
        }
      ]
    }
  ],
  [
    // {
    //   subTypeName: '餐廳人潮'
    // },
    // {
    //   subTypeName: '車站排隊人潮'
    // },
    // {
    //   subTypeName: '運動場館人潮'
    // },
    {
      subTypeName: 'Wi-Fi 訊號'
    }
  ]
]
