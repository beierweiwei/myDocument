function getJsonp (url) {
  const query = url.split('?').pop();
  const cbRegExpRes = query.match(/&?cb=([^&]*)/)
  const cb = cbRegExpRes && cbRegExpRes[1]
  let scriptEle = document.createElement('script')
  scriptEle.attributes.src = url;
  document.body.append(scriptEle)
  return eval(cb)
}

getJsonp('test/123?cc=dd&cb=test&name=123&cd=456')