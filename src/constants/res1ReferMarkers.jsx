import secondCafeAndParkingLotsMarkers from './markers/markers_2ndCafe_parkingLots.json' // 二餐&停車場
import activityCenterAndFirstCafeMarkers from './markers/markers_activityCenter_1stCafe.json' // 活動中心&一餐
import engThreeAndEngFourMarkers from './markers/markers_eng3_eng4.json' // 工三&工四
import libraryMarkers from './markers/markers_library.json' // 圖書館
import oldGymMarkers from './markers/markers_oldGym.json' // 舊體育館
import outdoorFieldMarkers from './markers/markers_outdoorField.json' // 室外球場
import shineMoodAndCCMarkers from './markers/markers_shinemood_cc.json' // 小木屋&校計中
import swimAndMultiGymMarkers from './markers/markers_swim_multiGym.json' // 游泳館和綜合球館

function findLocationData(locationName) {
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

  return thisLocationData
}

function findCategories(locationName) {
  const thisLocationData = findLocationData(locationName)
  const categories = new Set()

  for (let i = 0; i < thisLocationData.length; i += 1) {
    categories.add(thisLocationData[i].category.categoryName)
  }
  return Array.from(categories)
}

export { findLocationData, findCategories }
