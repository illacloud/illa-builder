import { FC } from "react"
import { get } from "lodash"
import { OptionListHeader } from "./header"
import { ListBody } from "./body"
import { OptionListSetterProps } from "./interface"
import { ListCss } from "./style"

export const OptionListSetter: FC<OptionListSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdateDsl } = props

  const optionItems = get(panelConfig, attrName, [])

  return (
    <div css={ListCss}>
      <OptionListHeader
        labelName="Options"
        optionItems={optionItems}
        attrName={attrName}
        handleUpdateDsl={handleUpdateDsl}
      />
      <ListBody
        handleUpdateDsl={handleUpdateDsl}
        optionItems={optionItems}
        attrName={attrName}
      />
    </div>
  )
}

OptionListSetter.displayName = "OptionListSetter"
