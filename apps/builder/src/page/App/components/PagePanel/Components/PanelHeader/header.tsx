import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, MoreIcon } from "@illa-design/react"
import { EditableText } from "@/components/EditableText"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { ActionMenu } from "./actionMenu"
import { panelHeaderIconWrapperStyle, panelHeaderWrapperStyle } from "./style"

export const PanelHeader: FC = () => {
  const rootNodeProps = useSelector(getRootNodeExecutionResult)
  const { currentPageIndex, pageSortedKey } = rootNodeProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const dispatch = useDispatch()

  const handleUpdateDisplayNameByBlur = useCallback(
    (newDisplayName: string) => {
      dispatch(
        componentsActions.updateComponentDisplayNameReducer({
          displayName: currentPageDisplayName,
          newDisplayName,
        }),
      )
    },
    [dispatch, currentPageDisplayName],
  )
  return (
    <div css={panelHeaderWrapperStyle}>
      <EditableText
        key={currentPageDisplayName}
        displayName={currentPageDisplayName}
        updateDisplayNameByBlur={handleUpdateDisplayNameByBlur}
      />
      <div css={panelHeaderIconWrapperStyle}>
        <Dropdown
          position="bottom-end"
          trigger="click"
          dropList={
            <ActionMenu
              pageDisplayName={currentPageDisplayName}
              pageKeys={pageSortedKey}
            />
          }
        >
          <MoreIcon />
        </Dropdown>
      </div>
    </div>
  )
}

PanelHeader.displayName = "PanelHeader"
