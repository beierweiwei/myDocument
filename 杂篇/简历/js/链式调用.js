/**
 * 实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。
 */

class _LazyMan {
  constructor (name) {
    if (!this instanceof LazyMan) return new LazyMan(name)
    this.name = name;
    this.queue = [];
    this.queue.push(() => { console.log(`hi, this is ${name}!`); this.next()})
    setTimeout(() => this.next(), 0)

  }
  sleepFirst (s) {
    this.queue.unshift(() => setTimeout( () => {console.log(`wake up after ${s} s! `);this.next()}, s * 1000))
    return this;
  }
  sleep (s) {
    this.queue.push(() => setTimeout( () => { console.log(`wake up after ${s} s! `) ;this.next()}, s * 1000))
    return this;

  }
  eat (food) {
    this.queue.push(() => {
      console.log(`Eat ${food} ~`)
    })
    return this;

  }
  next () {
    const fn = this.queue.shift()
    fn && fn.call(this)
  }
}
function LazyMan (name) {
  return new _LazyMan(name);
}
LazyMan("Hank").sleep(10).eat("dinner")
LazyMan("Hank").eat("dinner").eat("supper")
LazyMan("Hank").sleepFirst(5).eat("supper")