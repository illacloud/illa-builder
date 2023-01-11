export const MOBILE_SCREEN_WIDTH = 780

export const isMobileByWindowSize = (currentWidth: number) => {
  return currentWidth < MOBILE_SCREEN_WIDTH
}
