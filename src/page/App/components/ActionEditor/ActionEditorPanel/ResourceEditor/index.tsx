import { FC, useContext } from "react"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { Select, Option } from "@illa-design/select"
import { PenIcon, PlusIcon } from "@illa-design/icon"
import { Divider } from "@illa-design/divider"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ResourcePanel } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor/ResourcePanel"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
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
  resourceSelectOptionIconStyle,
  resourceSelectOptionStyle,
  resourceSelectNewOptionStyle,
  resourceSelectOptionNewIconStyle,
} from "@/page/App/components/ActionEditor/ActionEditorPanel/style"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { ResourceEditorProps } from "./interface"

export const ResourceEditor: FC<ResourceEditorProps> = (props) => {
  const { onCreateResource, onEditResource } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const resourceList = useSelector(selectAllResource)
  const activeActionItem = useSelector(getSelectedAction)
  const { setIsActionDirty } = useContext(ActionEditorContext)
  const { resourceId = "" } = activeActionItem
  const isResourceEditable = resourceId !== ""
  const triggerMode = activeActionItem.actionTemplate?.triggerMode ?? "manual"

  const triggerOptions = [
    {
      label: t("editor.action.panel.option.trigger.manually"),
      value: "manual",
    },
    {
      label: t("editor.action.panel.option.trigger.on_change"),
      value: "change",
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
          css={css(actionSelectStyle, resourceSelectStyle)}
          value={resourceId}
          colorScheme="techPurple"
          onChange={(value) => {
            setIsActionDirty?.(true)
            dispatch(
              configActions.updateSelectedAction({
                ...activeActionItem,
                resourceId: value,
              }),
            )
          }}
          triggerProps={{
            autoAlignPopupWidth: false,
          }}
        >
          <Option onClick={onCreateResource} isSelectOption={false}>
            <span
              css={css(resourceSelectOptionStyle, resourceSelectNewOptionStyle)}
            >
              <PlusIcon
                css={css(
                  resourceSelectOptionIconStyle,
                  resourceSelectOptionNewIconStyle,
                )}
              />
              {t("editor.action.panel.option.resource.new")}
            </span>
          </Option>
          <Divider />
          {resourceList?.map(
            ({ resourceId: id, resourceName: name, resourceType }) => (
              <Option value={id} key={id} isSelectOption>
                <span css={resourceSelectOptionStyle}>
                  <ActionTypeIcon
                    actionType={resourceType}
                    css={resourceSelectOptionIconStyle}
                  />
                  {name}
                </span>
              </Option>
            ),
          )}
        </Select>
        <div
          css={applyEditIconStyle(!isResourceEditable)}
          onClick={() => onEditResource?.(resourceId as string)}
        >
          <PenIcon />
        </div>

        <Select
          value={triggerMode}
          colorScheme="techPurple"
          onChange={(value) => {
            setIsActionDirty?.(true)
            dispatch(
              configActions.updateSelectedAction({
                ...activeActionItem,
                actionTemplate: {
                  ...activeActionItem.actionTemplate,
                  triggerMode: value,
                },
              }),
            )
          }}
          options={triggerOptions}
          defaultValue={0}
          css={css(actionSelectStyle, triggerSelectStyle)}
        />
      </div>
      <Divider />
      <ResourcePanel resourceId={resourceId} />
    </div>
  )
}

ResourceEditor.displayName = "ResourceEditor"
