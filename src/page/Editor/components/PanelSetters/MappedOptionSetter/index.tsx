import { FC, useState } from "react"
import { MappedOptionSetterProps } from "./interface"
import {
  labelAndInputWrapperCss,
  ListCss,
  listWrapperCss,
  modalInputWrapperCss,
  modalLabelCss,
  optionListHeaderCss,
} from "./style"
import { Input } from "@illa-design/input"

interface configItem {
  id: string
  label: string
  value: string
  disabled?: string
}

export const MappedOptionSetter: FC<MappedOptionSetterProps> = (props) => {
  const { attrName, panelConfig, handleUpdatePanelConfig } = props

  const childrenPanelConfig = panelConfig[attrName] as configItem

  const handleUpdate = (value: Partial<configItem>) => {
    const newChildrenPanelConfig = { ...childrenPanelConfig, ...value }
      handleUpdatePanelConfig({ [attrName]: newChildrenPanelConfig })
    // handleUpdateDsl({ [attrName]: newChildrenPanelConfig })
  }

  const [labelValue, setLabelValue] = useState("")
  const [optionValue, setOptionValue] = useState("")
  const [disabledValue, setDisabledValue] = useState("")

  return (
    <div css={ListCss}>
      <div css={optionListHeaderCss}>
        <div>Mapped Option</div>
      </div>
      <div css={listWrapperCss}>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Value</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={optionValue}
              onChange={(value) => {
                setOptionValue(value)
                handleUpdate({ value })
              }}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Label</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={labelValue}
              onChange={(value) => {
                setLabelValue(value)
                handleUpdate({ label: value })
              }}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Disabled</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={disabledValue}
              onChange={(value) => {
                setDisabledValue(value)
                handleUpdate({ disabled: value })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

MappedOptionSetter.displayName = "MappedOptionSetter"
