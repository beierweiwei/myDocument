const fs = require('fs')
const path = require('path')
const sep = path.sep
let readDir = process.argv[2] || process.env.PWD

readDir = path.resolve(process.env.PWD, readDir)
const readStuff = (file, final, deep) => {
    deep = deep || 1
    const fileArr = file.split(sep)
    const filePathArr = file.split(sep)
    const name = filePathArr[filePathArr.length - 1]
    fs.stat(file, function(err, stats) {   
        if (err) return console.log(err.message)
        let isDir = stats.isDirectory()
        if (isDir) {
            console.log(Array(deep).join('>>>') + fileArr[fileArr.length -1])
            fs.readdir(file, function (err, files) {
                if (err) console.log(err)
                files = files.map(filename => {
                   return path.join(file, filename)
                })
                walk (files, final, deep)
            })
        } else {
            console.log(Array(deep).join('---') + fileArr[fileArr.length -1])
            final && final()
        }
    })
}

readStuff(readDir, () => {console.log('final')})
const walk = (files, final, deep) => {
    ++ deep
    let next = (() => {
        let i = 1
        let len = files.length
        let _next = () => {
            if (_next.hasNext()) {
                ++ i
                readStuff(files[i - 1], next, deep) 
            } else {
                final && final()
            }          
        }
        _next.deep = deep
        _next.hasNext = function () {
            return i < len
        }
        return _next
    })()
    next()
}


