function call (fn, context, ...args) {
  context.fn = fn;
  context.fn(...args)
  delete context.fn
}

function bind (fn, context) {
  context.fn = fn;
  return (...args) => {
    context.fn(...args)
  }
}