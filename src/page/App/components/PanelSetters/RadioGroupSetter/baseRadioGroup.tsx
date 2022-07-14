import { FC, useMemo } from "react"
import { RadioGroup } from "@illa-design/radio"
import { BaseRadioGroupProps } from "./interface"
import { applyRadioGroupWrapperStyle } from "@/page/App/components/PanelSetters/RadioGroupSetter/style"
import { useTranslation } from "react-i18next"

export const BaseRadioGroupSetter: FC<BaseRadioGroupProps> = (props) => {
  const { value, options, isSetterSingleRow, attrName, handleUpdateDsl } = props
  const { t } = useTranslation()

  // TODO: @weichen need remove when use context
  const finalOptions = useMemo(() => {
    return options.map((item) => {
      return {
        ...item,
        label: typeof item.label === "string" ? t(item.label) : item.label,
      }
    })
  }, [options])

  return (
    <div css={applyRadioGroupWrapperStyle(isSetterSingleRow)}>
      <RadioGroup
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        value={value}
        options={finalOptions}
        type="button"
        size="small"
        colorScheme="grayBlue"
      />
    </div>
  )
}

BaseRadioGroupSetter.displayName = "BaseRadioGroupSetter"
