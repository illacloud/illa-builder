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
  categoryStyle,
  applyResourceItemStyle,
  resourceListStyle,
  titleStyle,
  resourceNameStyle,
  resourceIconStyle,
} from "./style"

const Card: FC<ActionTypeSelectorCardProps> = function(props) {
  const { icon, nameKey, isDraft } = props
  const { t } = useTranslation()
  const draftTip = t("editor.action.resource.label.comming_soon")

  return (
    <div css={applyResourceItemStyle(isDraft)} data-draft-tip={draftTip}>
      {cloneElement(icon, { css: resourceIconStyle })}
      <span css={resourceNameStyle}>
        {t(`editor.action.resource.${nameKey}.name`)}
      </span>
    </div>
  )
}

const List: FC<ActionTypeSelectorListProps> = function(props) {
  const { title, list = [] } = props
  return (
    <div>
      <span css={categoryStyle}>{title}</span>
      <div css={resourceListStyle}>
        {list.map((prop) => (
          <Card key={prop.nameKey} {...prop} />
        ))}
      </div>
    </div>
  )
}

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = function(
  props,
) {
  const { onSelect } = props
  const { t } = useTranslation()

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>
        {t("editor.action.action_list.action_generator.selector.title")}
      </div>

      <List title="Databases" key="Databases" list={databases} />
      <List title="Apis" key="Apis" list={apis} />
      <List
        title="Javascript Transformer"
        key="Javascript Transformer"
        list={jsTransformer}
      />
    </div>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
