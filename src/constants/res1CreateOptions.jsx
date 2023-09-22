import secondCafeAndParkingLotsMarkers from './markers/markers_2ndCafe_parkingLots.json' // 二餐&停車場
import activityCenterAndFirstCafeMarkers from './markers/markers_activityCenter_1stCafe.json' // 活動中心&一餐
import engThreeAndEngFourMarkers from './markers/markers_eng3_eng4.json' // 工三&工四
import libraryMarkers from './markers/markers_library.json' // 圖書館
import oldGymMarkers from './markers/markers_oldGym.json' // 舊體育館
import outdoorFieldMarkers from './markers/markers_outdoorField.json' // 室外球場
import shineMoodAndCCMarkers from './markers/markers_shinemood_cc.json' // 小木屋&校計中
import swimAndMultiGymMarkers from './markers/markers_swim_multiGym.json' // 游泳館和綜合球館

function findFloor(str) {
  const regex = /([B0-9]+)-([0-9]+)/
  const match = str.match(regex)

  if (match && match.length === 3) {
    if (match[1] === 'B1') {
      return match[1]
    }
    return `${match[1]}F`
  }

  return null
}

function findCategoryType(str) {
  let thisCateType = ''

  switch (str) {
    case '一般座位區':
    case '高腳椅區':
    case '沙發區':
    case '教職員停車區':
    case '無障礙停車區':
    case '腳踏車停車區':
    case '一般停車區':
      thisCateType = '空間'
      break
    case '櫃台':
    case '公用電腦':
    case '飲水機':
    case '路邊教職員停車位':
    case '路邊殘障停車位':
    case 'ATM':
    case '販賣機':
    case '路邊無障礙停車位':
    case '路邊一般停車位':
    case '室內排球場': // 是嗎？
    case '室內籃球場': // 是嗎？
    case '室外排球場': // 是嗎？
    case '室外籃球場': // 是嗎？
    case '置物櫃':
    case '跑步機':
    case '轉體機':
    case '桌球場': // 是嗎？
      thisCateType = '物體'
      break

    default:
      thisCateType = '不明'
      break
  }

  return thisCateType
}

function updateFloorOptions(floorOptions, newInput) {
  const existingFloorOption = floorOptions.find(
    (option) => option.floor === newInput.floor
  )

  if (existingFloorOption) {
    if (
      !existingFloorOption.reportableCateType.includes(newInput.categoryType)
    ) {
      existingFloorOption.reportableCateType.push(newInput.categoryType)
    }
  } else {
    floorOptions.push({
      floor: newInput.floor,
      reportableCateType: [newInput.categoryType]
    })
  }

  return null
}

function addUniqueCateOfFloor(arr, newItem) {
  const isDuplicate = arr.some(
    (item) =>
      item.floor === newItem.floor && item.categoryName === newItem.categoryName
  )

  if (!isDuplicate) {
    const thisUniqueCateOfFloor = {
      floor: newItem.floor,
      categoryType: newItem.categoryType,
      categoryName: newItem.categoryName
    }

    arr.push(thisUniqueCateOfFloor)
    return null
  }

  return null
}

function findCorrespondingOptions(locationName) {
  let thisLocationData

  if (/^二餐&停車場/.test(locationName)) {
    thisLocationData = secondCafeAndParkingLotsMarkers
  } else if (/^活動中心&一餐/.test(locationName)) {
    thisLocationData = activityCenterAndFirstCafeMarkers
  } else if (/^工三&工四/.test(locationName)) {
    thisLocationData = engThreeAndEngFourMarkers
  } else if (/^圖書館/.test(locationName)) {
    thisLocationData = libraryMarkers
  } else if (/^舊體育館/.test(locationName)) {
    thisLocationData = oldGymMarkers
  } else if (/^室外球場/.test(locationName)) {
    thisLocationData = outdoorFieldMarkers
  } else if (/^小木屋&校計中/.test(locationName)) {
    thisLocationData = shineMoodAndCCMarkers
  } else if (/^游泳館&綜合球館/.test(locationName)) {
    thisLocationData = swimAndMultiGymMarkers
  } else {
    thisLocationData = []
  }

  const res1CreateOptions = {
    floorOptions: [], // 這棟建築物有哪些樓層可回報，另外，該樓層有哪些種類可以回報
    uniqueCateOfFloors: [], // 每層樓有那些空間&物體可回報 // 可以的話把物體和空間也分開
    optionData: [] // json 全部資料
  }

  for (let i = 0; i < thisLocationData.length; i += 1) {
    const thisFloor = findFloor(thisLocationData[i]?.category?.categoryDescName)
    const thisCateType = findCategoryType(
      thisLocationData[i]?.category?.categoryName
    )
    const thisDataOption = {
      floor: thisFloor, // B1, 1, 2, 3, 4...
      categoryType: thisCateType, // 物體空間
      categoryName: thisLocationData[i]?.category?.categoryName, // 飲水機
      categoryDescName: thisLocationData[i]?.category?.categoryDescName // 飲水機1
    }

    updateFloorOptions(res1CreateOptions.floorOptions, thisDataOption)

    addUniqueCateOfFloor(res1CreateOptions.uniqueCateOfFloors, thisDataOption)

    res1CreateOptions.optionData.push(thisDataOption)
  }

  return res1CreateOptions
}

export { findCorrespondingOptions }
