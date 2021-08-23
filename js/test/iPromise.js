function IPromise (main) {
	console.log('Promise', this)
	this._next = null
	this._errCallbacks = null
	this._callback = null
	this._res = ''
	this._state = 'pending'
	if (main) {setTimeout(() => main(resolve.bind(this), reject), 0)}
	const resolve = (val) => {
		this._state = 'success'
		let callbackRes = val
		console.log(callbackRes)

		const next = (promiseInstance, isError) => {

			if (promiseInstance) {
				try {
					if (!isError) {
						callbackRes = promiseInstance._callback(callbackRes)
						promiseInstance._state = 'success'
					} else {
						if (typeof  promiseInstance._errCallback === 'function') {

							 callbackRes = promiseInstance._errCallback(callbackRes)
							 promiseInstance._state = 'success'
						} else {
							return next(promiseInstance._next, 'error')
							promiseInstance._state = 'success'
						}
					}
				} catch (err) {
					promiseInstance._state = 'error'
					if (typeof promiseInstance._errCallback === 'function') {
						callbackRes = promiseInstance._errCallback(err)
					} else {
						callbackRes = err
						return next(promiseInstance._next, 'error')
					}
				}
				next(promiseInstance._next)
			}
		}
		next(this._next)
		// this._next && this._next.callback(val)
	}

	function reject () {
		this._state = 'fail'
	}
// 调用所有的then callback
}
IPromise.prototype.then = function(callback, errCallback) {
	// 返回promise实例
	// 缓存callback
	this._next = new IPromise()
	this._next._callback = function (val) {
		return callback && callback(val)
	}
	if (errCallback === 'function') this._next._errCallback = errCallback
	return this._next
}

IPromise.prototype.catch = function(errCallback) {
	// 返回promise实例
	// 缓存callback
	this._next = new IPromise()
	this._next._errCallback = function (val) {
		return errCallback && errCallback(val)
	}
	return this._next
}

new IPromise((resolve, reject) => resolve(10)).then(res => res.a.b).then(res => res + 10).catch(err => console.log(err.message)).then(res => console.log(res))

// IPromise.prototype.catch = function(callback) {
// 	this._failCallbacks.push(callback)
// 	return IPromise ()
// }


// // 调用流程
// new IPromise(function(resolve, reject) {
// 	aJax.get('url', function(res) {
// 		console.log(res)
// 		resolve(res)
// 	}, function (err) {
// 		console.log(err.message)
// 	}).then(() => {
// 		combineData(res)
// 	}).catch(err => {

// 	})
// })
//
//
//


// 别人写的
// 1.iPromise 定义实例属性： state, value, error, callbacks
// 2.定义实例方法:then
// 	 2.1 then方法返回一个iPromise实例，其次将传入的回调函数缓存到callbacks中
// 3.iPromise 初始化最后调用fn主函数。
//  3.1 因为主函数是异步函数，（通过resolve方法将控制权交回主程序），然后程序回调用then方法，then方法将回调存储到iPromise的缓存变量callbacks中。
//
function iPromise(fn) {
    let state = 'pending',
        value = null,
        error = null,
        callbacks = []

    this.then = function (onFulfilled, onRejected) {
        return new iPromise((resolve, reject) => {
            transition({
                onFulfilled: onFulfilled,
                onRejected: onRejected,
                resolve: resolve,
                reject: reject
            })
        })
    }

    function transition(callback) {
        let result
        switch (state) {
            case 'pending':
                callbacks.push(callback)
                return
            case 'resolved':
                try {
                    if (callback.onFulfilled) result = callback.onFulfilled(value)
                } catch (e) {
                    if (callback.onRejected) result = callback.onRejected(e)
                }
                break
            case 'rejected':
                if (callback.onRejected) result = callback.onRejected(error)
                break
        }
        if (result instanceof iPromise) {
            result.then(callback.resolve, callback.reject)
            return
        }
        state === 'resolved' ? callback.resolve(result) : callback.reject(result)
    }

    function resolve(newValue) {
        state = 'resolved'
        value = newValue
        execute()
    }

    function reject(err) {
        state = 'rejected'
        error = err
        execute()
    }

    function execute() {
        callbacks.length ? callbacks.map(callback => transition(callback)) : null
    }

    fn(resolve, reject)
}

var p = new iPromise((resolve) => {
    setTimeout(() => resolve(2333), 1000)
})

p.then(res =>
    new iPromise((resolve) => {
        setTimeout(() => {
            resolve(res)
        }, 2000)
    })
).then(res =>
    new iPromise((resolve, reject) => {
        reject(res)
    })
).then(null, err => console.error(err)) // 2333