import { FC } from "react"
import {
  ActionTypeSelectorCardProps,
  ActionTypeSelectorProps,
} from "./interface"
import {
  ActionTypeList,
  GeneratorTypeList,
} from "@/page/App/components/Actions/ActionGenerator/config"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import i18n from "@/i18n/config"
import {
  applyResourceItemStyle,
  categoryStyle,
  containerStyle,
  resourceListStyle,
  resourceNameStyle,
} from "./style"

const Card: FC<ActionTypeSelectorCardProps> = (props) => {
  const { nameKey, actionType, onSelect } = props

  return (
    <div css={applyResourceItemStyle} onClick={() => onSelect?.(actionType)}>
      {getIconFromActionType(actionType, "32px")}
      <span css={resourceNameStyle}>
        {i18n.t(`editor.action.resource.${nameKey}.name`)}
      </span>
    </div>
  )
}

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { resourceOnly, onSelect } = props
  const typeList = resourceOnly ? GeneratorTypeList : ActionTypeList

  return (
    <div css={containerStyle}>
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
    </div>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
