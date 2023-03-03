import ILLAStorage from "@illa-fe-utils/storage"

type Storage_Type = "localStorage" | "sessionStorage"

interface StorageDataShape {
  value: any
  time: number
  expire: number
}

const STORAGE_CONFIG = {
  prefix: `ILLA_BUILDER@0.0.0`, // project@version TODO: read Version from packageJSON
  defaultExpire: 5, // -1:Never expire,unit:Min
}

const autoAddPrefix = (key: string) => {
  const prefix = STORAGE_CONFIG.prefix + "/"
  return prefix + key
}

const setStorage = (
  type: Storage_Type,
  key: string,
  value: any,
  expire: number = 0,
) => {
  if (value === "" || value == undefined) {
    value = null
  }
  if (isNaN(expire) || expire === 0) {
    expire = STORAGE_CONFIG.defaultExpire
  }
  let data: StorageDataShape = {
    value,
    time: Date.now(),
    expire,
  }
  try {
    const stringifyData = JSON.stringify(data)
    window[type].setItem(autoAddPrefix(key), stringifyData)
  } catch (e) {
    console.error(`data can't stringify:`, e)
  }
}

const getStorage = (type: Storage_Type, key: string) => {
  const prefixKey = autoAddPrefix(key)
  if (!window[type].getItem(prefixKey)) {
    return null
  }
  let storage: StorageDataShape | undefined = undefined
  try {
    storage = JSON.parse(window[type].getItem(prefixKey) as string)
  } catch (e) {
    console.error("data can't parse:", e)
    return undefined
  }
  let nowTime = Date.now()
  if (storage === undefined) {
    return null
  }
  if (
    storage.expire > -1 &&
    storage.expire * 60 * 1000 < nowTime - storage.time
  ) {
    removeStorage(type, key)
    return null
  } else {
    setStorage(type, key, storage.value, storage.expire)
    return storage.value
  }
}

const removeStorage = (type: Storage_Type, key: string) => {
  window[type].removeItem(autoAddPrefix(key))
}

const clearStorage = (type: Storage_Type) => {
  window[type].clear()
}

export const setLocalStorage = (
  key: string,
  value: any,
  expire: number = 0,
) => {
  setStorage("localStorage", key, value, expire)
}

export const setSessionStorage = (
  key: string,
  value: any,
  expire: number = 0,
) => {
  setStorage("sessionStorage", key, value, expire)
}

export const getLocalStorage = (key: string) => getStorage("localStorage", key)
export const getSessionStorage = (key: string) =>
  getStorage("sessionStorage", key)

export const removeLocalStorage = (key: string) => {
  removeStorage("localStorage", key)
}
export const removeSessionStorage = (key: string) => {
  removeStorage("sessionStorage", key)
}

export const clearLocalStorage = () => {
  clearStorage("localStorage")
}

export const clearSessionStorage = () => {
  clearStorage("sessionStorage")
}

export const ILLABuilderStorage = new ILLAStorage("ILLABuilder@2.0.0", 5)
