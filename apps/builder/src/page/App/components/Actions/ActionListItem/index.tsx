import { forwardRef } from "react"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  actionIconContainer,
  actionItemDotStyle,
  actionItemLeftStyle,
  applyActionItemContainerStyle,
  applyActionItemTitleStyle,
  warningCircleStyle,
} from "./style"
import { WarningCircleIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { ActionListItemProps } from "@/page/App/components/Actions/ActionListItem/interface"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getSelectedAction } from "@/redux/config/configSelector"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"

const Item = DropList.Item

export const ActionListItem = forwardRef<HTMLDivElement, ActionListItemProps>(
  (props, ref) => {
    const { action, onItemClick, onCopyItem, onDeleteItem } = props

    const { t } = useTranslation()
    const selectedAction = useSelector(getSelectedAction)

    const error = useSelector((state: RootState) => {
      return state.currentApp.execution.error[action.displayName]
    })

    const isChanged = useSelector((state: RootState) => {
      return (
        state.config.selectedAction?.displayName === action.displayName &&
        JSON.stringify(selectedAction) !== JSON.stringify(action)
      )
    })

    return (
      <Dropdown
        position="bottom-end"
        trigger="contextmenu"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopyItem(action)
              }}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
              onClick={() => {
                onDeleteItem(action)
              }}
            />
          </DropList>
        }
      >
        <div
          css={applyActionItemContainerStyle(
            selectedAction?.displayName === action.displayName,
          )}
          ref={ref}
          onClick={() => {
            onItemClick(action)
          }}
        >
          <div css={actionItemLeftStyle}>
            <div css={actionIconContainer}>
              {getIconFromActionType(action.actionType, "16px")}
              {error && <WarningCircleIcon css={warningCircleStyle} />}
            </div>
            <div css={applyActionItemTitleStyle(error !== undefined)}>
              {action.displayName}
            </div>
            {isChanged && <div css={actionItemDotStyle} />}
          </div>
        </div>
      </Dropdown>
    )
  },
)

ActionListItem.displayName = "ActionListItem"
