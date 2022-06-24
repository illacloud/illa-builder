import { FC } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Select, Option } from "@illa-design/select"
import { PenIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ResourcePanel } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourcePanel"
import {
  actionStyle,
  fillingStyle,
  actionSelectStyle,
  triggerSelectStyle,
  resourceSelectStyle,
  applyEditIconStyle,
  sectionTitleStyle,
  resourceBarStyle,
  resourceBarTitleStyle,
  panelScrollStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { ResourceEditorProps } from "./interface"

export const ResourceEditor: FC<ResourceEditorProps> = (props) => {
  const {
    triggerMode,
    onChangeTriggerMode,
    onChangeResource,
    onCreateResource,
    onEditResource,
  } = props

  const { t } = useTranslation()
  const resourceList = useSelector(selectAllResource)
  const { resourceId } = useSelector(getSelectedAction)
  const isResourceEditable = resourceId !== ""

  const triggerOptions = [
    {
      label: t("editor.action.panel.option.trigger.manually"),
      value: "manual",
    },
    {
      label: t("editor.action.panel.option.trigger.on_change"),
      value: "onChange",
    },
  ]

  return (
    <div css={panelScrollStyle}>
      <div css={css(actionStyle, resourceBarStyle)}>
        <label css={css(sectionTitleStyle, resourceBarTitleStyle)}>
          {t("editor.action.panel.label.resource")}
        </label>
        <span css={fillingStyle} />
        <Select
          value={triggerMode}
          onChange={onChangeTriggerMode}
          options={triggerOptions}
          defaultValue={0}
          css={css(actionSelectStyle, triggerSelectStyle)}
        />

        <Select
          css={css(actionSelectStyle, resourceSelectStyle)}
          value={resourceId}
          onChange={onChangeResource}
          triggerProps={{
            autoAlignPopupWidth: false,
          }}
        >
          <Option onClick={onCreateResource} isSelectOption={false}>
            {t("editor.action.panel.option.resource.new")}
          </Option>
          <Divider />
          {resourceList?.map(({ resourceId: id, resourceName: name }) => (
            <Option value={id} key={id}>
              {name}
            </Option>
          ))}
        </Select>
        <div
          css={applyEditIconStyle(!isResourceEditable)}
          onClick={() => onEditResource?.(resourceId as string)}
        >
          <PenIcon />
        </div>
      </div>
      <Divider />
      <ResourcePanel resourceId={resourceId} />
    </div>
  )
}

ResourceEditor.displayName = "ResourceEditor"
