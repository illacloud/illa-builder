import { isCloudVersion } from "@illa-public/utils"
import { FC, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { Loading, PlusIcon, useMessage } from "@illa-design/react"
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
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { fetchCreateAction } from "@/services/action"
import { getActionNameFromActionType } from "@/utils/actionResourceTransformer"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ActionGenerator } from "../ActionGenerator"
import { getIconFromActionType } from "../getIcon"
import { MORE_DATA_TYPE, RECOMMEND_RESOURCES } from "./constans"
import {
  basicButtonStyle,
  categoryItemContainerStyle,
  categoryItemNameStyle,
  categoryTitleStyle,
  guidePanelContainerStyle,
  guidePanelOutContainerStyle,
  headerStyle,
  iconHotSpot,
  loadingContainerStyle,
  moreTipsStyle,
} from "./style"

export const ActionGuidePanel: FC = () => {
  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const message = useMessage()
  const [isLoading, setIsLoading] = useState(false)

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
          setIsLoading(true)
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
            setIsLoading(false)
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
        default: {
          setGeneratorVisible(true)
          setCurrentActionType(type)
        }
      }
    }
  }

  return (
    <>
      <div css={guidePanelOutContainerStyle}>
        <div css={guidePanelContainerStyle}>
          <h5 css={headerStyle}>
            {t("editor.action.panel.title.general.initial-title")}
          </h5>
          <h6 css={categoryTitleStyle}>
            {t("editor.action.panel.label.general.connect-data-source")}
          </h6>
          <section css={categoryItemContainerStyle}>
            {RECOMMEND_RESOURCES.map((type) => (
              <button
                css={basicButtonStyle}
                key={type}
                onClick={handleClickActionType(type)}
              >
                <Suspense>{getIconFromActionType(type, "24px")}</Suspense>
                <span css={categoryItemNameStyle}>
                  {getActionNameFromActionType(type)}
                </span>
              </button>
            ))}
            <button
              css={basicButtonStyle}
              onClick={handleClickActionType(null)}
            >
              <span css={iconHotSpot}>
                <PlusIcon />
              </span>
              <span css={moreTipsStyle}>
                {t("editor.action.panel.label.option.general.more")}
              </span>
            </button>
          </section>
          <h6 css={categoryTitleStyle}>
            {t("editor.action.panel.label.general.more-type")}
          </h6>

          <section css={categoryItemContainerStyle}>
            {MORE_DATA_TYPE.filter((type) => {
              if (!isCloudVersion) return type !== "aiagent"
              return type
            }).map((type) => (
              <button
                css={basicButtonStyle}
                key={type}
                onClick={handleClickActionType(type)}
              >
                <Suspense>{getIconFromActionType(type, "24px")}</Suspense>
                <span css={categoryItemNameStyle}>
                  {getActionNameFromActionType(type)}
                </span>
              </button>
            ))}
          </section>
          {isLoading && (
            <div css={loadingContainerStyle}>
              <Loading colorScheme="techPurple" />
            </div>
          )}
        </div>
      </div>
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
