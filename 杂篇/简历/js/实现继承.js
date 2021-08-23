function extendFn (sub, sup) {
  const fn = new Function();
  fn.prototype = sup.prototype
  const instance = new fn()
  sub.prototype = instance
  instance.constructor = sub;
  return sub;
}

function Child () {
  this.name = 'child'
}
function Parent () {
  this.name = 'parent'
}
Parent.prototype.say = function() {
  console.log(this.name)
}

extendFn(Child, Parent);
const child = new Child()
child.say();

function myInstanceof (theInstance, theClass) {
  let proto = theInstance.__proto__
  if (proto === null) return false;
  if (proto !== theClass.prototype) {
    return myInstanceof(proto, theClass)
  } else {
    return true;
  }
}
console.log(myInstanceof(child, Child))
console.log(myInstanceof(Child, Parent))
console.log(myInstanceof(child, Parent))
