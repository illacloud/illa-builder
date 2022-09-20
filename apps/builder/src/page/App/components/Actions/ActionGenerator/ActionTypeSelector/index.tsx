import { FC } from "react"
import { ActionTypeSelectorProps } from "./interface"
import { ActionTypeList } from "@/page/App/components/Actions/ActionGenerator/config"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"
import { ActionCard } from "@/page/App/components/Actions/ActionCard"

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { onSelect } = props

  return (
    <div css={containerStyle}>
      {ActionTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((prop) => (
              <ActionCard
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
