import { klona } from "klona"

const blacklistSet = new Set([
  "top",
  "window",
  "self",
  "globalThis",
  "global",
  "frames",
  "parent",
  "fetch",
  "XMLHttpRequest",
  "document",
  "MutationObserver",
])

const globalVarNames = new Set<PropertyKey>([
  "window",
  "globalThis",
  "self",
  "global",
])

function runUsersCode(code: string) {
  const finalCode = `with(this){
    return (function() {
      'use strict';
      return (${code});
    }).call(this);
  }`
  return new Function(finalCode)
}

function isDomElement(obj: any): boolean {
  return obj instanceof Element || obj instanceof HTMLCollection
}

function getPropertyFromNativeWindow(prop: PropertyKey) {
  const ret = Reflect.get(window, prop)
  if (typeof ret === "function" && !ret.prototype) {
    return ret.bind(window)
  }
  // get DOM element by id, serializing may cause error
  if (isDomElement(ret)) {
    return undefined
  }
  return ret
}

function createBlackHole(): any {
  return new Proxy(
    function () {
      return createBlackHole()
    },
    {
      get(t, p) {
        if (p === "toString") {
          return function () {
            return ""
          }
        }
        if (p === Symbol.toPrimitive) {
          return function () {
            return ""
          }
        }
        return createBlackHole()
      },
    },
  )
}

function createMockWindow(base?: object) {
  const win: any = new Proxy(Object.assign({}, base), {
    has() {
      return true
    },
    set(target, p, newValue) {
      return Reflect.set(target, p, newValue)
    },
    get(target, p) {
      if (p in target) {
        return Reflect.get(target, p)
      }
      if (globalVarNames.has(p)) {
        return win
      }
      if (typeof p === "string" && blacklistSet.has(p)) {
        return createBlackHole()
      }
      return getPropertyFromNativeWindow(p)
    },
  })
  return win
}

function proxySandbox(context: any) {
  const isProtectedVar = (key: PropertyKey) => {
    return key in context || globalVarNames.has(key)
  }
  const mockWindow = createMockWindow(undefined)

  return new Proxy(mockWindow, {
    has() {
      return true
    },
    get(target, p, receiver) {
      if (p === Symbol.unscopables) {
        return undefined
      }

      if (p === "toJSON") {
        return target
      }

      if (globalVarNames.has(p)) {
        return target
      }

      if (p in context) {
        let value = Reflect.get(context, p, receiver)
        if (typeof value === "object" && value !== null) {
          Object.freeze(value)
          Object.values(value).forEach(Object.freeze)
        }
        return value
      }

      return Reflect.get(target, p, receiver)
    },

    set(target, p, value, receiver) {
      if (isProtectedVar(p)) {
        throw new Error(p.toString() + " can't be modified")
      }
      return Reflect.set(target, p, value, receiver)
    },

    defineProperty(target, p, attributes) {
      if (isProtectedVar(p)) {
        throw new Error("can't define property:" + p.toString())
      }
      return Reflect.defineProperty(target, p, attributes)
    },

    deleteProperty(target, p) {
      if (isProtectedVar(p)) {
        throw new Error("can't delete property:" + p.toString())
      }
      return Reflect.deleteProperty(target, p)
    },

    setPrototypeOf() {
      throw new Error("can't invoke setPrototypeOf")
    },
  })
}

export const evalScript = (script: string, dataTree: Record<string, any>) => {
  const userCode = runUsersCode(script)
  const sandbox = proxySandbox(dataTree)
  const result = userCode.call(sandbox)
  return klona(result)
}
