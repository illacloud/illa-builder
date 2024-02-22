const MOBILE_USER_AGENT = /Android|webOS|iPhone|iPod|ipad|BlackBerry/i

export const getUserPlatform = () => {
  const platform =
    "userAgentData" in navigator
      ? // @ts-ignore
        (navigator.userAgentData.platform as string)
      : navigator.platform

  const localStringForPlatform = platform.toLocaleLowerCase()
  if (/(mac|iphone|ipod|ipad)/i.test(localStringForPlatform)) {
    return "macOS"
  }
  if (/(win)/i.test(localStringForPlatform)) {
    return "Windows"
  }
  if (/(linux)/i.test(localStringForPlatform)) {
    return "Linux"
  }
}

export const isMAC = () => {
  return getUserPlatform() === "macOS"
}

export const isWindows = () => {
  return getUserPlatform() === "Windows"
}

export const isLinux = () => {
  return getUserPlatform() === "Linux"
}

export const isMobileByUserAgent = () => {
  return MOBILE_USER_AGENT.test(navigator?.userAgent)
}

export const isIOSMobileByUserAgent = () => {
  return /iPhone|iPad|iPod/i.test(navigator?.userAgent)
}
