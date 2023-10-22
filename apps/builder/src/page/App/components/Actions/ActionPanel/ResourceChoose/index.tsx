import { getIconFromResourceType } from "@illa-public/icon"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { getResourceNameFromResourceType } from "@illa-public/resource-generator"
import { FC, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  AddIcon,
  Modal,
  PenIcon,
  Select,
  Space,
  TriggerProvider,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { ResourceGenerator } from "@/page/App/components/Actions/ResourceGenerator"
import { ResourceCreator } from "@/page/App/components/Actions/ResourceGenerator/ResourceCreator"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  ACTION_RUN_TIME,
  ActionTriggerMode,
  IAdvancedConfig,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getResourceTypeFromActionType } from "@/utils/actionResourceTransformer"
import { trackInEditor } from "@/utils/mixpanelHelper"
import {
  createNewStyle,
  itemContainer,
  itemLogo,
  itemText,
  resourceChooseContainerStyle,
  resourceEndStyle,
  resourceTitleStyle,
} from "./style"

export const ResourceChoose: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [editorVisible, setEditorVisible] = useState(false)
  const [generatorVisible, setGeneratorVisible] = useState(false)

  const resourceList = useSelector(getAllResources)
  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  //maybe empty
  const currentSelectResource = resourceList.find(
    (r) => r.resourceID === action.resourceID,
  )

  const options = resourceList.map((item) => ({
    label: (
      <div css={itemContainer}>
        <span css={itemLogo}>
          <Suspense>
            {getIconFromResourceType(item.resourceType, "14px")}
          </Suspense>
        </span>
        <span css={itemText}>{item.resourceName}</span>
      </div>
    ),
    value: item.resourceID,
  }))
  options.unshift({
    label: (
      <Space
        size="8px"
        direction="horizontal"
        alignItems="center"
        css={createNewStyle}
      >
        <AddIcon size="14px" />
        {t("editor.action.panel.option.resource.new")}
      </Space>
    ),
    value: "create",
  })

  return (
    <TriggerProvider renderInBody zIndex={10}>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <div css={resourceEndStyle}>
          <Select
            w="360px"
            colorScheme="techPurple"
            options={options}
            value={
              currentSelectResource
                ? action.resourceID
                : t("editor.action.resource_choose.deleted")
            }
            onChange={(value) => {
              if (value === "create") {
                setGeneratorVisible(true)
                return
              }
              const resource = resourceList.find((r) => r.resourceID === value)
              if (resource != undefined) {
                dispatch(
                  configActions.updateCachedAction({
                    ...action,
                    // selected resource is same as action type
                    actionType: resource.resourceType,
                    resourceID: value as string,
                    content:
                      selectedAction.actionType === value
                        ? selectedAction.content
                        : getInitialContent(resource.resourceType),
                  }),
                )
              }
            }}
            addAfter={
              <PenIcon
                style={
                  currentSelectResource
                    ? { cursor: "pointer" }
                    : { cursor: "not-allowed" }
                }
                color={globalColor(`--${illaPrefix}-grayBlue-04`)}
                onClick={(e) => {
                  e.stopPropagation()
                  if (currentSelectResource) {
                    setEditorVisible(true)
                  }
                }}
              />
            }
          />

          <Select
            ml="8px"
            w="360px"
            colorScheme="techPurple"
            value={action.triggerMode}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...action,
                  triggerMode: value as ActionTriggerMode,
                }),
              )
              let updateSlice: Partial<IAdvancedConfig> = {}
              if (value === "manually") {
                updateSlice = {
                  runtime: ACTION_RUN_TIME.NONE,
                  pages: [],
                  delayWhenLoaded: "",
                  displayLoadingPage: false,
                }
              }
              if (value === "automate") {
                updateSlice = {
                  runtime: ACTION_RUN_TIME.APP_LOADED,
                  pages: [],
                  delayWhenLoaded: "",
                  displayLoadingPage: false,
                }
              }
              dispatch(
                configActions.updateCachedActionAdvancedConfigReducer(
                  updateSlice,
                ),
              )
            }}
            onClick={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "action_edit_auto_run",
              })
            }}
            options={[
              {
                label: t("editor.action.panel.option.trigger.manually"),
                value: "manually",
              },
              {
                label: t("editor.action.panel.option.trigger.on_change"),
                value: "automate",
              },
            ]}
          />
        </div>
      </div>
      <Modal
        w="696px"
        visible={editorVisible}
        footer={false}
        closable
        withoutLine
        withoutPadding
        maskClosable={false}
        title={t("editor.action.form.title.configure", {
          name: getResourceNameFromResourceType(
            getResourceTypeFromActionType(action.actionType),
          ),
        })}
        onCancel={() => {
          setEditorVisible(false)
        }}
      >
        <ResourceCreator
          resourceID={action.resourceID}
          onBack={() => {
            setEditorVisible(false)
          }}
          onFinished={() => {
            setEditorVisible(false)
          }}
        />
      </Modal>
      <ResourceGenerator
        visible={generatorVisible}
        onClose={() => {
          setGeneratorVisible(false)
        }}
      />
    </TriggerProvider>
  )
}
