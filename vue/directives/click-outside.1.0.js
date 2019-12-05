export default clickoutside = {
  id: 'clickoutside',
  bind: function bind() {
    var _this = this;

    this.handler = function (e) {
      if (_this.vm && !_this.el.contains(e.target)) {
        _this.vm.$eval(_this.expression);
      }
    };
    document.addEventListener(this.arg || 'click', this.handler);
  },
  unbind: function unbind() {
    document.removeEventListener(this.arg || 'click', this.handler);
  },
  install: function install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    });
  }
}