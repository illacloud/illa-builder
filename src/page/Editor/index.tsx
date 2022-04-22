import { FC } from "react"
import { PageTabs } from "./components/PageTabs"
import { CanvasContainer } from "./components/CanvasContainer"
import { DataWorkspace } from "./components/DataWorkspace"
import { QueryEditor } from "./components/QueryEditor"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"

export const Editor: FC = () => {
  return (
    <div>
      <DataWorkspace />
      <div>
        <PageTabs />
        <div>
          <div>
            <CanvasContainer />
            <QueryEditor />
          </div>
          <WidgetPickerEditor />
        </div>
      </div>
    </div>
  )
}

Editor.displayName = "Editor"
