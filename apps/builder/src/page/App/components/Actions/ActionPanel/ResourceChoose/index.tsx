import { FC, useState } from "react"
import {
  createNewStyle,
  itemContainer,
  itemText,
  resourceChooseContainerStyle,
  resourceTitleStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Option, Select } from "@illa-design/select"
import { useDispatch, useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Space } from "@illa-design/space"
import { AddIcon, PenIcon } from "@illa-design/icon"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { configActions } from "@/redux/config/configSlice"
import { ButtonProps } from "@illa-design/button"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { ResourceCreator } from "@/page/Dashboard/components/ResourceGenerator/ResourceCreator"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"

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
    (r) => r.resourceId === action.resourceId,
  )

  return (
    <>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <Space direction="horizontal" size="8px" alignItems="center">
          <Select
            colorScheme="techPurple"
            minW="200px"
            maxW="300px"
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
                    {getIconFromResourceType(item.resourceType, "14px")}
                    <span css={itemText}>{item.resourceName}</span>
                  </div>
                </Option>
              )
            })}
          </Select>
          <Select
            colorScheme="techPurple"
            minW="300px"
            maxW="500px"
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
        </Space>
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
