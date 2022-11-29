import {
  createNewStyle,
  itemContainer,
  itemLogo,
  itemText,
  resourceChooseContainerStyle,
  resourceEndStyle,
  resourceTitleStyle,
} from "./style"
import { ActionPanelContext } from "@/page/App/components/Actions/ActionPanel/actionPanelContext"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
import {
  Option,
  Select,
  Space,
  AddIcon,
  PenIcon,
  ButtonProps,
  globalColor,
  illaPrefix,
  Modal,
} from "@illa-design/react"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export const ResourceChoose: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [editorVisible, setEditorVisible] = useState(false)
  const [generatorVisible, setGeneratorVisible] = useState(false)

  const resourceList = useSelector(getAllResources)
  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  const { onChangeSelectedResource } = useContext(ActionPanelContext)

  //maybe empty
  const currentSelectResource = resourceList.find(
    (r) => r.resourceId === action.resourceId,
  )

  return (
    <>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <div css={resourceEndStyle}>
          <Select
            flexShrink="1"
            flexGrow="0"
            minW="240px"
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
                    resourceId: value,
                    content:
                      selectedAction.actionType === value
                        ? selectedAction.content
                        : getInitialContent(resource.resourceType),
                  }),
                )
                onChangeSelectedResource?.()
              }
            }}
            addonAfter={{
              buttonProps: {
                variant: "outline",
                colorScheme: "grayBlue",
                leftIcon: (
                  <PenIcon color={globalColor(`--${illaPrefix}-grayBlue-04`)} />
                ),
                onClick: () => {
                  setEditorVisible(true)
                },
              } as ButtonProps,
            }}
          >
            <Option
              key="create"
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
            colorScheme="techPurple"
            value={action.triggerMode}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...action,
                  triggerMode: value,
                }),
              )
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
      <Modal
        w="696px"
        visible={editorVisible}
        footer={false}
        closable
        withoutLine
        withoutPadding
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
          resourceId={action.resourceId}
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
    </>
  )
}
