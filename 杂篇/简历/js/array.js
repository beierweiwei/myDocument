// 打乱数组

function mixArr(arr){
  return arr.sort(() => {
      return Math.random() - 0.5;
  })
}

function shuffle(arr) {
  let m = arr.length;
  while(m > 1) {
    let idx = parseInt(Math.random() * m--)
    let idxVal = arr[idx] 
    arr[idx] = arr[m]
    arr[m] = idxVal
    
  }
  return arr
}

console.log(shuffle([1,2,3,4,5,6,7,8,9,10]))

// 数组去重

function uniq (arr) {
  return [...new Set(arr)]
}

function uniq (arr) {
  return Object.valus(arr.reduce((accu, curt) => {
    console.log(curt)
    accu[curt] = curt 
    return accu
  }, {}))
}

console.log(uniq([1,2,3,4,2,1]))