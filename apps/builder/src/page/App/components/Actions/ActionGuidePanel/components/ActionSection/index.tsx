import { getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
  actionItemInitial,
  getInitialContent,
} from "@illa-public/public-configs"
import {
  ActionContent,
  ActionItem,
  ActionType,
  GlobalDataActionContent,
  Resource,
} from "@illa-public/public-types"
import {
  ActionGenerator,
  ResourceGeneratorProvider,
  getResourceNameFromResourceType,
} from "@illa-public/resource-generator"
import { FC, Suspense, memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { Button, NextIcon, useMessage } from "@illa-design/react"
import { useCreateAction } from "@/page/App/components/Actions/hook"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { track } from "@/utils/mixpanelHelper"
import { PanelSectionProps } from "./interface"
import {
  basicButtonStyle,
  categoryItemContainerStyle,
  categoryItemNameStyle,
  categoryTitleStyle,
  headerContainerStyle,
} from "./style"

const ActionPanelSection: FC<PanelSectionProps> = (props) => {
  const { actionTypes, title, hasMore, changeLoading, filterFunc } = props
  const { t } = useTranslation()

  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()

  const isGuideMode = useSelector(getIsILLAGuideMode)
  const resourceList = useSelector(getAllResources)
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
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
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
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
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
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
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

  const [handleDirectCreateAction, handleCreateAgentAction] = useCreateAction()

  const handleFinishCreateNewResource = useCallback(
    (resource: Resource, isUpdate: boolean) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
        {
          element: "resource_configure_save",
          parameter5: resource.resourceType,
        },
      )
      if (isUpdate) {
        dispatch(resourceActions.updateResourceItemReducer(resource))
      } else {
        dispatch(resourceActions.addResourceItemReducer(resource))
      }
      handleDirectCreateAction(resource.resourceType, resource.resourceID)
    },
    [dispatch, handleDirectCreateAction],
  )

  return (
    <>
      <div css={headerContainerStyle}>
        <h6 css={categoryTitleStyle}>{title}</h6>
        {hasMore && (
          <Button
            colorScheme="techPurple"
            variant="text"
            rightIcon={<NextIcon />}
            onClick={handleClickActionType(null)}
          >
            {t("editor.action.panel.label.option.general.more")}
          </Button>
        )}
      </div>
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
      </section>
      {generatorVisible && (
        <MixpanelTrackProvider
          basicTrack={track}
          pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
        >
          <ResourceGeneratorProvider
            allResource={resourceList}
            createOrUpdateResourceCallback={handleFinishCreateNewResource}
          >
            <ActionGenerator
              visible={generatorVisible}
              onClose={() => setGeneratorVisible(false)}
              defaultStep={currentActionType ? "createAction" : "select"}
              defaultActionType={currentActionType}
              canBackToSelect={false}
              handleDirectCreateAction={handleDirectCreateAction}
              handleCreateAgentAction={handleCreateAgentAction}
            />
          </ResourceGeneratorProvider>
        </MixpanelTrackProvider>
      )}
    </>
  )
}

export default memo(ActionPanelSection)
