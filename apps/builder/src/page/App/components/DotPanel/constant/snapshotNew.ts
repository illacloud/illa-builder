import { WidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoState"

class SnapShot {
  snapshot: Record<string, WidgetLayoutInfo> = {}
  isInit: boolean = false

  constructor() {
    this.snapshot = {}
  }

  setSnapshot(snapshot: Record<string, WidgetLayoutInfo>) {
    this.isInit = true
    this.snapshot = snapshot
  }

  getSnapshot() {
    return this.snapshot
  }

  clearSnapshot() {
    this.snapshot = {}
  }
  getSnapShotArray() {
    return Object.values(this.snapshot)
  }
  getSnapShotArrayByParentDisplayName(parentDisplayName: string) {
    return Object.values(this.snapshot).filter(
      (item) => item.parentNode === parentDisplayName,
    )
  }
}

export const illaSnapshot = new SnapShot()
