import { FC, useMemo, useState } from "react"
import {
  createNewStyle,
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
import { RootState } from "@/store"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { ResourceChooseProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { ResourceEditor } from "@/page/Dashboard/components/ResourceEditor"

export const ResourceChoose: FC<ResourceChooseProps> = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [editorVisible, setEditorVisible] = useState(false)
  const [editType, setEditType] = useState(false)

  const resourceList = useSelector(getAllResources)
  const action = props.action
  const contentMap = useSelector(
    (state: RootState) => state.config.cacheActionContent,
  )

  const realResourceId = useMemo(() => {
    let currentResourceId = action.resourceId
    const currentResource = resourceList.find(
      r => r.resourceId === currentResourceId,
    )
    if (currentResource) {
      return currentResourceId
    }
    return ""
  }, [resourceList, action.resourceId])

  return (
    <div css={resourceChooseContainerStyle}>
      <span css={resourceTitleStyle}>{t("resources")}</span>
      <Space direction="horizontal" size="8px">
        <Select
          colorScheme="techPurple"
          width="200px"
          value={realResourceId}
          onChange={value => {
            const resource = resourceList.find(r => r.resourceId === value)
            if (resource != undefined) {
              dispatch(
                configActions.updateSelectedAction({
                  ...action,
                  // selected resource is same as action type
                  actionType: resource.resourceType,
                  resourceId: value,
                  content:
                    contentMap[resource.resourceType] ??
                    getInitialContent(resource.resourceType),
                }),
              )
            }
          }}
          addonAfter={{
            buttonProps: {
              variant: "outline",
              colorScheme: "gray",
              leftIcon: (
                <PenIcon color={globalColor(`--${illaPrefix}-grayBlue-04`)} />
              ),
              onClick: () => {
                setEditType(true)
                setEditorVisible(true)
              },
            } as ButtonProps,
          }}
        >
          <Option
            key="create"
            isSelectOption={false}
            onClick={() => {
              setEditType(false)
              setEditorVisible(true)
            }}
          >
            <Space
              size="8px"
              direction="horizontal"
              align="center"
              css={createNewStyle}
            >
              <AddIcon size="14px" />
              {t("editor.action.panel.option.resource.new")}
            </Space>
          </Option>
          {resourceList.map(item => {
            return (
              <Option value={item.resourceId} key={item.resourceId}>
                <Space size="8px" direction="horizontal" align="center">
                  {getIconFromResourceType(item.resourceType, "14px")}
                  {item.resourceName}
                </Space>
              </Option>
            )
          })}
        </Select>
        <Select
          colorScheme="techPurple"
          width="400px"
          value={action.triggerMode}
          onChange={value => {
            dispatch(
              configActions.updateSelectedAction({
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
      <ResourceEditor
        visible={editorVisible}
        edit={editType}
        resourceId={action.resourceId}
        onClose={() => {
          setEditorVisible(false)
        }}
      />
    </div>
  )
}
