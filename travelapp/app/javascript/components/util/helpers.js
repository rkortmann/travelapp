// Safe get
export function safeGet(obj, evalFunc, def) {
  // Our proxy handler
  const handler = {
    // Intercept all property access
    get: function(target, prop, receiver) {
      const res = Reflect.get(...arguments);

      // If our response is an object then wrap it in a proxy else just return
      return typeof res === "object" ? proxify(res) : res != null ? res : def;
    }
  };

  const proxify = target => {
    return new Proxy(target, handler);
  };

  // Call function with our proxified object
  return evalFunc(proxify(obj, handler));
}