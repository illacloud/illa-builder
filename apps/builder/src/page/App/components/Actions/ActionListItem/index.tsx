import { forwardRef, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  DropList,
  DropListItem,
  Dropdown,
  Input,
  LoadingIcon,
  WarningCircleIcon,
  getColor,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ActionListItemProps } from "@/page/App/components/Actions/ActionListItem/interface"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { RootState } from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { isObject, isValidDisplayName } from "@/utils/typeHelper"
import {
  actionIconContainer,
  actionItemDotStyle,
  actionItemLeftStyle,
  applyActionItemContainerStyle,
  applyActionItemTitleStyle,
  warningCircleStyle,
} from "./style"

const Item = DropListItem

export const ActionListItem = forwardRef<HTMLDivElement, ActionListItemProps>(
  (props, ref) => {
    const { action, onItemClick, onCopyItem, onDeleteItem } = props

    const { t } = useTranslation()
    const selectedAction = useSelector(getSelectedAction)
    const cachedAction = useSelector(getCachedAction)
    const message = useMessage()

    const error = useSelector((state: RootState) => {
      const targetActionErrors =
        state.currentApp.execution.error[action.displayName]
      if (isObject(targetActionErrors)) {
        return Object.keys(targetActionErrors).length > 0
      }
      return false
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
        BuilderApi.teamRequest(
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
      [action, currentApp.appId, dispatch, message, t],
    )

    return (
      <Dropdown
        trigger="contextmenu"
        position="right-start"
        dropList={
          <DropList w="184px">
            <Item
              key={"rename"}
              value={"rename"}
              title={t("editor.action.action_list.contextMenu.rename")}
              onClick={() => {
                setEditName(true)
              }}
            />
            <Item
              key={"duplicate"}
              value={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
              onClick={() => {
                onCopyItem(action)
              }}
            />
            <Item
              key={"delete"}
              value={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              deleted
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
              <div css={applyActionItemTitleStyle(error)}>
                {action.displayName}
              </div>
            ) : (
              <Input
                ml="8px"
                colorScheme="techPurple"
                size="small"
                onPressEnter={(e) => {
                  changeDisplayName(e.currentTarget.value)
                }}
                defaultValue={action.displayName}
                autoFocus
                disabled={changing}
                suffix={
                  changing && (
                    <LoadingIcon c={getColor("grayBlue", "05")} spin={true} />
                  )
                }
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
