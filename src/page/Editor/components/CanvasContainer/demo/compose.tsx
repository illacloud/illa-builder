// 中转函数
import FrameLayout from "./frame-layout"
import TextView from "./text-view"
import {
  DslFrame,
  DslLayout,
  DslText,
  DslView,
} from "@/redux/reducers/editorReducer/dslReducer/interface"
import { DslType } from "../../../constants/dragConfig"

export function applyDslLayout(dslLayout: DslLayout) {
  switch (dslLayout.type) {
    case DslType.DslFrame: {
      return <FrameLayout key={dslLayout.id} {...(dslLayout as DslFrame)} />
    }
  }
  return null
}

export function applyDslView(dslView: DslView) {
  switch (dslView.type) {
    case DslType.DslText: {
      return <TextView key={dslView.id} {...(dslView as DslText)} />
    }
  }
  return null
}
