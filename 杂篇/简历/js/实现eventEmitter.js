class EventEmitter {
  constructor () {
    this.eventHandleMaps = {};

  }
  on (name, handle) {
    if (!this.eventHandleMaps[name]) this.eventHandleMaps[name] = [];
    this.eventHandleMaps[name].push(handle)
  }
  emit (name, ...payload) {
    if (this.eventHandleMaps[name]) this.eventHandleMaps[name].forEach(handle => handle.call(this, ...payload))
  }
  off (name, handle) {
    if (this.eventHandleMaps[name]) this.eventHandleMaps[name].filter(_handle => _handle !== handle)
  }
  once (name, handle) {
    this.on(name, () => handle() && this.off(name))

  }
}