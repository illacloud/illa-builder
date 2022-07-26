import { FC } from "react"
import { ResourceChooseProps } from "./interface"
import {
  createNewStyle,
  resourceChooseContainerStyle,
  resourceTitleStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Option, Select } from "@illa-design/select"
import { useSelector } from "react-redux"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { Space } from "@illa-design/space"
import { AddIcon } from "@illa-design/icon"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"

export const ResourceChoose: FC<ResourceChooseProps> = (props) => {
  const { onModeChange, onResourceChange } = props

  const { t } = useTranslation()

  const resourceList = useSelector(getAllResources)

  return (
    <div css={resourceChooseContainerStyle}>
      <span css={resourceTitleStyle}>{t("resources")}</span>
      <Select>
        {resourceList.map((item) => {
          return (
            <Option>
              <Space
                size="8px"
                direction="horizontal"
                align="center"
                css={createNewStyle}
              >
                {getIconFromResourceType(item.resourceType, "14px")}
                {t("editor.action.panel.option.resource.new")}
              </Space>
            </Option>
          )
        })}
      </Select>
      <Select
        defaultValue={props.actionItem.triggerMode}
        onChange={(value) => {}}
      >
        <Option value="manually" key="manually">
          {t("editor.action.panel.option.trigger.manually")}
        </Option>
        <Option value="trigger" key="trigger">
          {t("editor.action.panel.option.trigger.on_change")}
        </Option>
        <Option value="trigger" key="create">
          {t("editor.action.panel.option.trigger.on_change")}
        </Option>
        <Option key="create" isSelectOption={false}>
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
      </Select>
    </div>
  )
}
