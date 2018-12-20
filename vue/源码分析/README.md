version: 2.5.21

## 1、vue实例化流程
new Vue({...})

### Vue._init
initState initState, initProps, initMethods, initData, initComputed, initWatch
#### initData
     observe // 判断data是否已经被observe  if (value.__ob__ instanceof Observer) {ob = value.__ob__;} else { Observer }
     Observer 创建依赖 this.dep = new Dep()
     walk 给data上的每个一个属性进行defineReactive
     defineReactive  创建Dep实例（
        var dep = new Dep()
        ...
        Object.defineProperty(obj, key, {
          get: function(){
            // 在get中，收集依赖
          }, 
          set: function() {
            // set中修改data.key的值，然后dep.notify()
          }
        }) 

...

#### initWatch 
遍历vue.$options.watch的每个属性，调用`createWatcher vm.$watch(expOrFn, handler, options)` 。`Vue.$watch()`:  `new Watcher`的时候 vue会将Watcher实例push到`vm._watcher`中,最后拿到观察（data）属性的getter方法
`wather.get()`: 在生成watcher实例时，会将`Dep.tartet`赋值，然后去调用观察属性的get方法，这样就完成了收集依赖

### mount    
```js
Vue.$mount //（解析挂载dom, 没有render根据模板生成render函数，）
        // ...
        var ref = compileToFunctions(template, {
          shouldDecodeNewlines: shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;
```

```js
mountComponent (vm, el, hydrating) 
    ...
    callHook(vm, 'beforeMount')
    ...
    updateComponent = function () {
        vm._update(vm._render(), hydrating);
    }

    //...
    // 这里的最后一个参数为true，会实例化一个renderwatcher
    // 如果是renderwatcher vm._watcher = this(watcher)
    // 因为new Watcher的第二个参数为update render 函数，watcher实例化时，会将Dep.target = this,然后会直接调用这个函数，返回结果作为wathcer.value的值
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    callHook(vm, 'mounted');

   return vm  
```
### vue-render
```
    Vue.prototype._render = function () {
        var vm = this;
        var ref = vm.$options;
        var render = ref.render
        var _parent = ref._parentVnode
        ...
        vnode = render.call(vm._renderProxy, vm.$createElement)
        ...
    }
```

### 渲染视图时，会去获取视图中绑定的数据，所以会触发proxyGetter
### proxyGetter && reactiveGetter 
```js
    defineReactive () {
        ...
        Object.defineProperty(obj, key, {
            ...
            get: function reactiveGetter () {
                //收集依赖
            }，
            set: function reactiveSetter () {
                // 更新视图
            }
        }
    }
```

### 疑问
在new Observer时，生成了一个新的deps挂载到observer实例上，后续的watcher是如何被添加进来的？

1、数据绑定

`/src/instance/observer` 

```js

 /**
   * Define a reactive property on an Object.
   */
  function defineReactive (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        // Dep.target 在new Watcher时，会将Dep.target = this（Watcher实例），然后去拿一下观察的属性的值（调用getter），然后就走到这里，搜集依赖
        if (Dep.target) {
          // dep.depend => watcher.newDeps.push(dep) && dep.addSub(Dep.target)  
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

```

### 两种wathcer
render watcher 
vue.option.wather (userWathcer)
