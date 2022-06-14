import { useContext, forwardRef } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Select, Option } from "@illa-design/select"
import { PenIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { selectAllResource } from "@/redux/currentApp/resource/resourceSelector"
import { ResourcePanel } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourcePanel"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { triggerRunRef } from "@/page/App/components/ActionEditor/ActionEditorPanel/interface"
import {
  actionStyle,
  fillingStyle,
  actionSelectStyle,
  triggerSelectStyle,
  resourceSelectStyle,
  applyEditIconStyle,
  sectionTitleStyle,
  resourceBarStyle,
  resourceOptionStyle,
  resourceBarTitleStyle,
  panelScrollStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { ResourceEditorProps } from "./interface"

export const ResourceEditor = forwardRef<triggerRunRef, ResourceEditorProps>(
  (props, ref) => {
    const {
      onChangeResource,
      onCreateResource,
      onEditResource,
      onChangeParam,
      onSaveParam,
      onRun,
    } = props

    const { t } = useTranslation()
    const { resourceId } = useContext(ActionEditorContext)
    const resourceList = useSelector(selectAllResource)

    const triggerOptions = [
      {
        label: t("editor.action.panel.option.trigger.manually"),
        value: 0,
      },
      {
        label: t("editor.action.panel.option.trigger.on_change"),
        value: 1,
      },
    ]

    const isResourceEditable = resourceId && resourceId.indexOf("preset") === -1

    return (
      <div css={panelScrollStyle}>
        <div css={css(actionStyle, resourceBarStyle)}>
          <label css={css(sectionTitleStyle, resourceBarTitleStyle)}>
            {t("editor.action.panel.label.resource")}
          </label>
          <span css={fillingStyle} />
          <Select
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
            {resourceList &&
              resourceList.map(({ resourceId: id, resourceName: name }) => (
                <Option value={id} key={id}>
                  {name}
                </Option>
              ))}
          </Select>
          <div
            css={applyEditIconStyle(!isResourceEditable)}
            onClick={() => onEditResource && onEditResource(resourceId)}
          >
            <PenIcon />
          </div>
        </div>
        <Divider />
        <ResourcePanel
          ref={ref}
          resourceId={resourceId}
          onChange={onChangeParam}
          onSave={onSaveParam}
          onRun={onRun}
        />
      </div>
    )
  },
)

ResourceEditor.displayName = "ResourceEditor"
