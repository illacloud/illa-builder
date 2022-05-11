// 中转函数
import FrameLayout from "./frame-layout"
import TextView from "./text-view"
import { DslFrame, DslLayout, DslText, DslView } from "@/redux/reducers/editorReducer/dslReducer/interface"
import { DslType } from "../../../dragConfig/dragType"

export function applyDslLayout(dslLayout: DslLayout) {
  console.log(dslLayout, "dslLayout")
  switch (dslLayout.type) {
    case DslType.DslFrame: {
      return <FrameLayout key={dslLayout.dslKey} {...(dslLayout as DslFrame)} />
    }
  }
  return null
}

export function applyDslView(dslView: DslView) {
  switch (dslView.type) {
    case DslType.DslText: {
      return <TextView key={dslView.dslKey} {...(dslView as DslText)} />
    }
  }
  return null
}
