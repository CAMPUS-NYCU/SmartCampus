// 圖書館

import LibraryMarkers from '../markers/markers2.json'

// 櫃台在哪裡？figma上面有但marker上沒有
// 因為她是 noise ? 所以我們不提供noise的選項囉？

// 物體：飲水機、櫃台、公用電腦
// 空間：一般座位區、沙發區

// const LibraryOptions = LibraryData
/**
 * LibraryOptions = {
 *  floor: '', // B1, 1, 2, 3, 4...
 *  categoryType:  '', // 物體空間
 *  categoryName: '', // 飲水機
 *  categoryDescName: '' // 飲水機1
 * }
 */

const LibraryOptions = {
  floorOptions: [],
  uniqueCateOfFloors: [],
  optionData: []
}

function findFloor(str) {
  const regex = /([B0-9]+)-([0-9]+)/
  const match = str.match(regex)

  if (match && match.length === 3) {
    const floor = match[1]
    return floor
  }

  return null
}

function findCategoryType(str) {
  let thisCateType = ''

  switch (str) {
    case '飲水機':
    case '櫃台':
    case '公用電腦':
      thisCateType = '物體'
      break

    case '一般座位區':
    case '沙發區':
    case '高腳椅區':
      thisCateType = '空間'
      break

    default:
      thisCateType = '不明'
      break
  }

  return thisCateType
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

LibraryMarkers.map((item) => {
  const thisFloor = findFloor(item?.category?.categoryDescName)
  const thisCateType = findCategoryType(item?.category?.categoryName)

  const thisDataOption = {
    floor: thisFloor,
    categoryType: thisCateType,
    categoryName: item?.category?.categoryName,
    categoryDescName: item?.category?.categoryDescName
  }

  if (!LibraryOptions.floorOptions.includes(thisFloor)) {
    LibraryOptions.floorOptions.push(thisFloor)
  }

  addUniqueCateOfFloor(LibraryOptions.uniqueCateOfFloors, thisDataOption)

  LibraryOptions.optionData.push(thisDataOption)

  return null
})

export default LibraryOptions
