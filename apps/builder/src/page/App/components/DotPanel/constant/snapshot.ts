import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"

class Snapshot {
  snapshot: ComponentNode[] = []

  constructor() {
    this.snapshot = []
  }

  setSnapshot(snapshot: ComponentNode[]) {
    this.snapshot = snapshot
  }

  getSnapshot() {
    return this.snapshot
  }

  clearSnapshot() {
    this.snapshot = []
  }

  updateSnapshot(component: ComponentNode[]) {
    component.forEach((item) => {
      const index = this.snapshot.findIndex(
        (i) => i.displayName === item.displayName,
      )
      if (index !== -1) {
        this.snapshot[index] = item
      }
    })
  }
}

export const illaSnapshot = new Snapshot()
