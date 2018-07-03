# Hindley-Milner 类型签名

```
    // capitalize :: String -> String 
    var capitalize = function (s) {
        return toUppserCase(head(s)) + toLowerCase(tail(s))
    } 

```

在 Hindley-Milner 系统中，函数都写成类似 a -> b 这个样子，其中 a 和b 是任意类型的变量。因此，capitalize 函数的类型签名可以理解为“一个接受 String 返回 String 的函数”。换句话说，它接受一个 String 类型作为输入，并返回一个 String 类型的输出。

```
    // strLength :: Stirng -> Number
    var strLength = function (s) {
        return s.length
    }

    // join :: String -> [String] -> String 
    var join = curry(function (what, s) {
        return what.join(s)
    })

    // match :: Regex -> String -> [String]
    var match = curry(function (reg, s) {
        return s.match(reg)    
    })

    // replace :: Regex -> String -> String -> String 
    var replace = curry(function (reg, rp, what) {
        return what.replace(reg, rp)
    })

```
