import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  AddIcon,
  Modal,
  Option,
  PenIcon,
  Select,
  Space,
  TriggerProvider,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { GoogleOAuthContext } from "@/context/GoogleOAuthContext"
import { useDetectGoogleOAuthStatus } from "@/hooks/useDetectGoogleOAuthStatus"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionTriggerMode } from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { GoogleSheetAuthStatus } from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
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

  const { oAuthStatus, setOAuthStatus } = useDetectGoogleOAuthStatus()
  const [editorVisible, setEditorVisible] = useState(false)
  const [generatorVisible, setGeneratorVisible] = useState(false)

  const resourceList = useSelector(getAllResources)
  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  useEffect(() => {
    setEditorVisible(oAuthStatus !== GoogleSheetAuthStatus.Initial)
  }, [oAuthStatus])

  //maybe empty
  const currentSelectResource = resourceList.find(
    (r) => r.resourceId === action.resourceId,
  )

  return (
    <TriggerProvider renderInBody zIndex={10}>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <div css={resourceEndStyle}>
          <Select
            w="360px"
            colorScheme="techPurple"
            value={
              currentSelectResource
                ? action.resourceId
                : t("editor.action.resource_choose.deleted")
            }
            onChange={(value) => {
              const resource = resourceList.find((r) => r.resourceId === value)
              if (resource != undefined) {
                dispatch(
                  configActions.updateCachedAction({
                    ...action,
                    // selected resource is same as action type
                    actionType: resource.resourceType,
                    resourceId: value as string,
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
                color={globalColor(`--${illaPrefix}-grayBlue-04`)}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditorVisible(true)
                }}
              />
            }
          >
            <Option
              key="create"
              value="create"
              isSelectOption={false}
              onClick={() => {
                setGeneratorVisible(true)
              }}
            >
              <Space
                size="8px"
                direction="horizontal"
                alignItems="center"
                css={createNewStyle}
              >
                <AddIcon size="14px" />
                {t("editor.action.panel.option.resource.new")}
              </Space>
            </Option>
            {resourceList.map((item) => {
              return (
                <Option value={item.resourceId} key={item.resourceId}>
                  <div css={itemContainer}>
                    <span css={itemLogo}>
                      {getIconFromResourceType(item.resourceType, "14px")}
                    </span>
                    <span css={itemText}>{item.resourceName}</span>
                  </div>
                </Option>
              )
            })}
          </Select>
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
            }}
            onClick={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "action_edit_auto_run",
              })
            }}
          >
            <Option value="manually" key="manually">
              {t("editor.action.panel.option.trigger.manually")}
            </Option>
            <Option value="automate" key="automate">
              {t("editor.action.panel.option.trigger.on_change")}
            </Option>
          </Select>
        </div>
      </div>
      <GoogleOAuthContext.Provider value={{ oAuthStatus, setOAuthStatus }}>
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
            resourceId={selectedAction.resourceId}
            onBack={() => {
              setEditorVisible(false)
            }}
            onFinished={() => {
              setEditorVisible(false)
            }}
          />
        </Modal>
      </GoogleOAuthContext.Provider>
      <ResourceGenerator
        visible={generatorVisible}
        onClose={() => {
          setGeneratorVisible(false)
        }}
      />
    </TriggerProvider>
  )
}
