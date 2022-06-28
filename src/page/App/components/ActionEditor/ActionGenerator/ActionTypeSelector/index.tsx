import { FC, cloneElement } from "react"
import { useTranslation } from "react-i18next"
import {
  databases,
  apis,
  jsTransformer,
} from "@/page/App/components/ActionEditor/Resource"
import {
  ActionTypeSelectorProps,
  ActionTypeSelectorListProps,
  ActionTypeSelectorCardProps,
} from "./interface"
import {
  containerStyle,
  titleStyle,
  categoryStyle,
  applyResourceItemStyle,
  resourceListStyle,
  resourceNameStyle,
  resourceIconStyle,
} from "./style"

const Card: FC<ActionTypeSelectorCardProps> = function (props) {
  const { icon, nameKey, isDraft, category, actionType, onSelect } = props
  const { t } = useTranslation()
  const draftTip = t("editor.action.resource.label.comming_soon")

  return (
    <div
      css={applyResourceItemStyle(isDraft)}
      data-draft-tip={draftTip}
      onClick={() => !isDraft && onSelect?.({ actionType, category })}
    >
      {cloneElement(icon, { css: resourceIconStyle })}
      <span css={resourceNameStyle}>
        {t(`editor.action.resource.${nameKey}.name`)}
      </span>
    </div>
  )
}

const List: FC<ActionTypeSelectorListProps> = function (props) {
  const { title, list = [], onSelect, category } = props

  return (
    <div>
      <span css={categoryStyle}>{title}</span>
      <div css={resourceListStyle}>
        {list.map((prop) => (
          <Card
            key={prop.nameKey}
            onSelect={onSelect}
            category={category}
            {...prop}
          />
        ))}
      </div>
    </div>
  )
}

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = function (
  props,
) {
  const { resourceOnly = false, onSelect } = props
  const { t } = useTranslation()
  const lists = [
    {
      title: t("editor.action.type.database"),
      list: databases,
      category: "databases" as const,
    },
    {
      title: t("editor.action.type.api"),
      list: apis,
      category: "apis" as const,
    },
    {
      title: t("editor.action.type.js_transformer"),
      list: jsTransformer,
      category: "jsTransformer" as const,
    },
  ]
  if (resourceOnly) {
    lists.splice(
      lists.findIndex(
        (item) => item.title === t("editor.action.type.js_transformer"),
        1,
      ),
    )
  }

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>
        {resourceOnly
          ? t("dashboard.resources.create_new_title")
          : t("editor.action.action_list.action_generator.selector.title")}
      </div>

      {lists.map((l) => (
        <List key={l.title} {...l} onSelect={onSelect} />
      ))}
    </div>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
