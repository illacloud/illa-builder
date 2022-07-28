import { FC, useState } from "react"
import {
  ActionTypeSelectorCardProps,
  ActionTypeSelectorProps,
} from "./interface"
import {
  applyResourceItemStyle,
  categoryStyle,
  containerStyle,
  resourceListStyle,
  resourceNameStyle,
  titleStyle,
} from "./style"
import {
  ActionTypeList,
  GeneratorTypeList,
} from "@/page/App/components/Actions/ActionGenerator/config"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import i18n from "@/i18n/config"
import { Spin } from "@illa-design/spin"

const Card: FC<ActionTypeSelectorCardProps> = (props) => {
  const { nameKey, isDraft, category, actionType, onSelect } = props

  return (
    <div
      css={applyResourceItemStyle(isDraft)}
      data-draft-tip={i18n.t("editor.action.resource.label.coming_soon")}
      onClick={() => !isDraft && onSelect?.({ actionType, category })}
    >
      {getIconFromActionType(actionType, "32px")}
      <span css={resourceNameStyle}>
        {i18n.t(`editor.action.resource.${nameKey}.name`)}
      </span>
    </div>
  )
}

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { resourceOnly, loading = false, onSelect } = props
  const typeList = resourceOnly ? GeneratorTypeList : ActionTypeList

  return (
    <div>
      <Spin css={containerStyle} colorScheme="techPurple" loading={loading}>
        <div css={titleStyle}>
          {resourceOnly
            ? i18n.t("dashboard.resources.create_new_title")
            : i18n.t(
                "editor.action.action_list.action_generator.selector.title",
              )}
        </div>
        {typeList.map(({ title, item, category }) => (
          <div key={category}>
            <span css={categoryStyle}>{title}</span>
            <div css={resourceListStyle}>
              {item.map((prop) => (
                <Card
                  key={prop.nameKey}
                  onSelect={onSelect}
                  category={category}
                  {...prop}
                />
              ))}
            </div>
          </div>
        ))}
      </Spin>
    </div>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
