import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { PanelBar } from "@/components/PanelBar"
import { getGlobalInfoExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { BaseDataItem } from "../BaseDataItem"

export const GlobalsSpaceTree: FC = () => {
  const { t } = useTranslation()

  const globalInfoList = useSelector(getGlobalInfoExecutionResult)

  return (
    <PanelBar
      title={`${t("editor.data_work_space.globals_title")}(${
        Object.keys(globalInfoList).length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_global_state")
      }}
      destroyChildrenWhenClose
    >
      {Object.keys(globalInfoList).map((key) => (
        <BaseDataItem
          key={key}
          title={key}
          level={0}
          value={globalInfoList[key] as Record<string, unknown>}
          dataType="globalData"
        />
      ))}
    </PanelBar>
  )
}

GlobalsSpaceTree.displayName = "GlobalsSpaceTree"
