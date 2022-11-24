import { forwardRef, useCallback, useState } from "react"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { getColor, globalColor, illaPrefix } from "@illa-design/theme"
import {
  actionIconContainer,
  actionItemDotStyle,
  actionItemLeftStyle,
  applyActionItemContainerStyle,
  applyActionItemTitleStyle,
  warningCircleStyle,
} from "./style"
import { LoadingIcon, WarningCircleIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { ActionListItemProps } from "@/page/App/components/Actions/ActionListItem/interface"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { Input } from "@illa-design/input"
import { isValidDisplayName } from "@/utils/typeHelper"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { Api } from "@/api/base"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { useMessage } from "@illa-design/message"

const Item = DropList.Item

export const ActionListItem = forwardRef<HTMLDivElement, ActionListItemProps>(
  (props, ref) => {
    const { action, onItemClick, onCopyItem, onDeleteItem } = props

    const { t } = useTranslation()
    const selectedAction = useSelector(getSelectedAction)
    const cachedAction = useSelector(getCachedAction)
    const message = useMessage()

    const error = useSelector((state: RootState) => {
      return state.currentApp.execution.error[action.displayName]
    })

    const currentApp = useSelector(getAppInfo)

    const isChanged =
      selectedAction?.actionId === action.actionId &&
      JSON.stringify(selectedAction) !== JSON.stringify(cachedAction)

    const [editName, setEditName] = useState(false)
    const [changing, setChanging] = useState(false)
    const dispatch = useDispatch()

    const changeDisplayName = useCallback(
      (newName: string) => {
        if (newName === action.displayName) {
          setEditName(false)
          return
        }
        if (!isValidDisplayName(newName)) {
          message.error({
            content: t("editor.display_name.validate_error", {
              displayName: newName,
            }),
          })
          setEditName(false)
          return
        }
        if (DisplayNameGenerator.isAlreadyGenerate(newName)) {
          message.error({
            content: t("editor.display_name.duplicate_error", {
              displayName: newName,
            }),
          })
          setEditName(false)
          return
        }
        const newAction = {
          ...action,
          displayName: newName,
        }
        Api.request(
          {
            method: "PUT",
            url: `/apps/${currentApp.appId}/actions/${action.actionId}`,
            data: newAction,
          },
          () => {
            dispatch(actionActions.updateActionItemReducer(newAction))
            setEditName(false)
          },
          () => {
            message.error({
              content: t("change_fail"),
            })
            setEditName(false)
          },
          () => {
            message.error({
              content: t("change_fail"),
            })
            setEditName(false)
          },
          (l) => {
            setChanging(l)
          },
        )
      },
      [action, currentApp.appId, dispatch, t],
    )

    return (
      <Dropdown
        trigger="contextmenu"
        position="right-start"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"rename"}
              title={t("editor.action.action_list.contextMenu.rename")}
              onClick={() => {
                setEditName(true)
              }}
            />
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
          onDoubleClick={() => {
            onItemClick(action)
            setEditName(true)
          }}
        >
          <div css={actionItemLeftStyle}>
            <div css={actionIconContainer}>
              {getIconFromActionType(action.actionType, "16px")}
              {error && <WarningCircleIcon css={warningCircleStyle} />}
            </div>
            {!editName ? (
              <div css={applyActionItemTitleStyle(error !== undefined)}>
                {action.displayName}
              </div>
            ) : (
              <Input
                ml="8px"
                borderColor="techPurple"
                size="small"
                onPressEnter={(e) => {
                  changeDisplayName(e.currentTarget.value)
                }}
                defaultValue={action.displayName}
                autoFocus
                disabled={changing}
                suffix={{
                  render: (
                    <>
                      {changing && (
                        <LoadingIcon
                          c={getColor("grayBlue", "05")}
                          spin={true}
                        />
                      )}
                    </>
                  ),
                }}
                onBlur={(event) => {
                  changeDisplayName(event.target.value)
                }}
              />
            )}
            {isChanged && <div css={actionItemDotStyle} />}
          </div>
        </div>
      </Dropdown>
    )
  },
)

ActionListItem.displayName = "ActionListItem"
