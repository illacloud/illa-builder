type eventbusCallback = (...args: unknown[]) => unknown
class EventBus {
  private readonly events: Record<string, eventbusCallback[]>
  constructor() {
    this.events = {}
  }

  emit(eventName: string, ...args: unknown[]) {
    const cb = this.events[eventName]
    if (!cb) {
      return this
    }
    cb.forEach((fn) => fn.apply(this, args))
    return this
  }

  on(eventName: string, cb: eventbusCallback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
    return this
  }

  onOnce(eventName: string, cb: eventbusCallback) {
    const func = (...args: unknown[]) => {
      this.off(eventName, func)
      cb.apply(this, args)
    }
    this.on(eventName, func)
  }

  off(eventName: string, cb: eventbusCallback) {
    if (!cb) {
      return this
    } else {
      const oldCb = this.events[eventName]
      if (!oldCb || !Array.isArray(oldCb) || oldCb.length === 0) {
        return this
      }
      this.events[eventName] = this.events[eventName].filter(
        (item) => item !== cb,
      )
    }
    return this
  }
}
export const ILLAEventbus = new EventBus()

export const PAGE_EDITOR_EVENT_PREFIX = "PAGE_EDITOR"
