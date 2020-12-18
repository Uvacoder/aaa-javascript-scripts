function insertionSort (items) {
    for (var i = 0; i < items.length; i++) {
      let value = items[i]
      for (var j = i - 1; j > -1 && items[j] > value; j--) {
        items[j + 1] = items[j]
      }
      // the last item we've reached should now hold the value of the currently sorted item
      items[j + 1] = value
    }
  
    return list
  }
  
  const list = [54, 26, 93, 17, 77, 31, 44, 55, 20]
  console.log(insertionSort(list))