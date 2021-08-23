function cloneDeep (obj) {
  if(Array.isArray(obj)) {
    return obj.map(item => {
      return cloneDeep(item)
    })
  } else if (typeof obj === 'object') {
    let _obj = {}
    Object.keys(obj).forEach(key => {
      _obj[key] = cloneDeep(obj[key])
    })
    return _obj;
  } else {
    return obj;
  }
}

const originObj = {a: 1, b: [1, 2, 3, {name: 'test'}]};
const testObj = cloneDeep(originObj)
// console.log(originObj, testObj)
console.log(originObj.b, testObj.b, originObj.b[3],testObj.b[3])

// console.log(originObj === testObj, originObj.b === testObj.b, originObj.b[3] === testObj.b[3])
