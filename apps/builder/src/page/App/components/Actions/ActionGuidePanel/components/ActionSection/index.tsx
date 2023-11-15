import { getIconFromResourceType } from "@illa-public/icon"
import { getResourceNameFromResourceType } from "@illa-public/resource-generator"
import { FC, Suspense, memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { PlusIcon, useMessage } from "@illa-design/react"
import { ActionGenerator } from "@/page/App/components/Actions/ActionGenerator"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  ActionType,
  GlobalDataActionContent,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { PanelSectionProps } from "./interface"
import {
  basicButtonStyle,
  categoryItemContainerStyle,
  categoryItemNameStyle,
  categoryTitleStyle,
  iconHotSpot,
  moreTipsStyle,
} from "./style"

const ActionPanelSection: FC<PanelSectionProps> = (props) => {
  const { actionTypes, title, hasMore, changeLoading, filterFunc } = props
  const { t } = useTranslation()

  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()

  const isGuideMode = useSelector(getIsILLAGuideMode)
  const dispatch = useDispatch()
  const message = useMessage()

  const handleClickActionType = (type: ActionType | null) => {
    return async () => {
      switch (type) {
        case "transformer": {
          const displayName = DisplayNameGenerator.generateDisplayName(type)
          const initialContent = getInitialContent(type)
          const data: Omit<ActionItem<ActionContent>, "actionID"> = {
            actionType: type,
            displayName,
            content: initialContent,
            isVirtualResource: false,
            ...actionItemInitial,
          }
          if (isGuideMode) {
            const createActionData: ActionItem<ActionContent> = {
              ...data,
              actionID: v4(),
            }
            dispatch(actionActions.addActionItemReducer(createActionData))
            dispatch(configActions.changeSelectedAction(createActionData))
            return
          }
          changeLoading(true)
          try {
            const { data: responseData } = await fetchCreateAction(data)
            message.success({
              content: t("editor.action.action_list.message.success_created"),
            })
            dispatch(actionActions.addActionItemReducer(responseData))
            dispatch(configActions.changeSelectedAction(responseData))
          } catch (_e) {
            message.error({
              content: t("editor.action.action_list.message.failed"),
            })
            DisplayNameGenerator.removeDisplayName(displayName)
          } finally {
            changeLoading(false)
          }
          break
        }
        case "globalData": {
          const displayName = DisplayNameGenerator.generateDisplayName("state")
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: displayName,
              value: "",
              oldKey: "",
            }),
          )
          const createActionData: ActionItem<GlobalDataActionContent> = {
            actionID: displayName,
            displayName: displayName,
            actionType: "globalData",
            triggerMode: "manually",
            isVirtualResource: true,
            content: {
              initialValue: "",
            },
            transformer: {
              enable: false,
              rawData: "",
            },
          }
          dispatch(configActions.changeSelectedAction(createActionData))

          break
        }
        case "illadrive": {
          const displayName = DisplayNameGenerator.generateDisplayName(type)
          const initialContent = getInitialContent(type)
          const data: Omit<ActionItem<ActionContent>, "actionID"> = {
            actionType: type,
            displayName,
            content: initialContent,
            isVirtualResource: true,
            ...actionItemInitial,
          }
          try {
            const { data: responseData } = await fetchCreateAction(data)
            message.success({
              content: t("editor.action.action_list.message.success_created"),
            })
            dispatch(actionActions.addActionItemReducer(responseData))
            dispatch(configActions.changeSelectedAction(responseData))
          } catch (_e) {
            message.error({
              content: t("editor.action.action_list.message.failed"),
            })
            DisplayNameGenerator.removeDisplayName(displayName)
          }
          break
        }
        default: {
          setGeneratorVisible(true)
          setCurrentActionType(type)
        }
      }
    }
  }

  return (
    <>
      <h6 css={categoryTitleStyle}>{title}</h6>
      <section css={categoryItemContainerStyle}>
        {actionTypes.filter(filterFunc ?? ((type) => type)).map((type) => (
          <button
            css={basicButtonStyle}
            key={type}
            onClick={handleClickActionType(type)}
          >
            <Suspense>{getIconFromResourceType(type, "16px")}</Suspense>
            <span css={categoryItemNameStyle}>
              {getResourceNameFromResourceType(type)}
            </span>
          </button>
        ))}
        {hasMore && (
          <button css={basicButtonStyle} onClick={handleClickActionType(null)}>
            <span css={iconHotSpot}>
              <PlusIcon />
            </span>
            <span css={moreTipsStyle}>
              {t("editor.action.panel.label.option.general.more")}
            </span>
          </button>
        )}
      </section>
      {generatorVisible && (
        <ActionGenerator
          visible={generatorVisible}
          onClose={() => setGeneratorVisible(false)}
          defaultStep={currentActionType ? "createAction" : "select"}
          defaultActionType={currentActionType}
          canBackToSelect={false}
        />
      )}
    </>
  )
}

export default memo(ActionPanelSection)
