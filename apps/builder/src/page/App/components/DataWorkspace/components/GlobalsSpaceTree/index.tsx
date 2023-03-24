import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import { getGlobalInfoExecutionResult } from "@/redux/currentUser/currentUserSelector"
import { FocusManager } from "@/utils/focusManager"

export const GlobalsSpaceTree: FC = () => {
  const { t } = useTranslation()

  const globalInfoList = useSelector(getGlobalInfoExecutionResult)

  return (
    <PanelBar
      title={`${t("editor.data_work_space.globals_title")}(${
        globalInfoList.length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("dataWorkspace_action")
      }}
      destroyChildrenWhenClose
    >
      {globalInfoList.map((data) => (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
        />
      ))}
    </PanelBar>
  )
}

GlobalsSpaceTree.displayName = "GlobalsSpaceTree"
