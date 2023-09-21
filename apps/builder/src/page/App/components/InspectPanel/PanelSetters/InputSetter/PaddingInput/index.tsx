import { ReactComponent as PartialIcon } from "@assets/rightPagePanel/partial.svg"
import { FC, FocusEventHandler, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Input, RadioGroup } from "@illa-design/react"
import { ReactComponent as AllIcon } from "@/assets/rightPagePanel/all.svg"
import { PADDING_MODE } from "@/redux/currentApp/editor/components/componentsState"
import { PanelLabel } from "../../../components/Label"
import { DirectionPaddingSetterProps } from "./interface"
import {
  directionPaddingContainerStyle,
  optionsIconHotSpotStyle,
  prefixContainerStyle,
  setterContainerStyle,
} from "./style"

const formatValue = (value: string = "") => {
  const values = value
    .split(" ")
    .filter((v) => v !== "")
    .filter((v) => !isNaN(Number(v)))
  if (values.length === 2) {
    return `${values[0]} ${values[1]} 0 0`
  }
  if (values.length === 3) {
    return `${values[0]} ${values[1]} ${values[2]} 0`
  }
  if (values.length > 4) {
    return `${values[0]} ${values[1]} ${values[2]} ${values[3]}`
  }
  return values.join(" ")
}

const options = [
  {
    label: (
      <div css={optionsIconHotSpotStyle}>
        <AllIcon />
      </div>
    ),
    value: PADDING_MODE.ALL,
  },
  {
    label: (
      <div css={optionsIconHotSpotStyle}>
        <PartialIcon />
      </div>
    ),
    value: PADDING_MODE.PARTIAL,
  },
]

export const DirectionPaddingSetter: FC<DirectionPaddingSetterProps> = (
  props,
) => {
  const { t } = useTranslation()
  const { handleUpdateMultiAttrDSL, componentNode } = props
  const paddingValue = {
    mode: componentNode?.props?.padding?.mode ?? PADDING_MODE.ALL,
    size: componentNode?.props?.padding?.size ?? "0",
  }

  const values = paddingValue.size.split(" ")
  const isAll = paddingValue.mode === PADDING_MODE.ALL

  const allInputRef = useRef<HTMLInputElement>(null)

  const handleChangeAllValue = (allValue: string) => {
    handleUpdateMultiAttrDSL?.({
      padding: {
        mode: PADDING_MODE.ALL,
        size: allValue,
      },
    })
  }

  const handleBlurAllValue: FocusEventHandler<HTMLInputElement> = (e) => {
    handleUpdateMultiAttrDSL?.({
      padding: {
        mode: PADDING_MODE.ALL,
        size: formatValue(e.target.value ?? ""),
      },
    })
  }

  const handleChangePartialValue = (index: number) => {
    return (partialValue: string) => {
      values[index] = partialValue
      handleUpdateMultiAttrDSL?.({
        padding: {
          mode: PADDING_MODE.PARTIAL,
          size: values.join(" "),
        },
      })
    }
  }

  const handleChangeMode = (mode: PADDING_MODE) => {
    if (paddingValue.mode === mode) return
    switch (mode) {
      case PADDING_MODE.ALL: {
        let result = paddingValue.size
        const partialSize = Array.from(new Set(paddingValue.size.split(" ")))
        if (partialSize.length === 1) {
          result = partialSize[0]
        }

        handleUpdateMultiAttrDSL?.({
          padding: {
            size: result,
            mode: mode,
          },
        })
        break
      }
      case PADDING_MODE.PARTIAL: {
        const partialSize = paddingValue.size.split(" ")
        let result = paddingValue.size
        if (partialSize.length === 1) {
          result = `${partialSize[0]} ${partialSize[0]} ${partialSize[0]} ${partialSize[0]}`
        }
        if (partialSize.length === 4) {
          result = `${partialSize[0]} ${partialSize[1]} ${partialSize[2]} ${partialSize[3]}`
        }

        handleUpdateMultiAttrDSL?.({
          padding: {
            size: result,
            mode: mode,
          },
        })
        break
      }
    }
  }

  return (
    <>
      <div css={setterContainerStyle}>
        <PanelLabel labelName={t("editor.inspect.setter_group.padding")} />
        <RadioGroup
          type="button"
          options={options}
          value={paddingValue.mode}
          onChange={handleChangeMode}
          size="small"
          w="105px"
          forceEqualWidth
        />
      </div>
      <div css={directionPaddingContainerStyle}>
        {isAll ? (
          <Input
            prefix={<span css={prefixContainerStyle}>All</span>}
            colorScheme="techPurple"
            value={values.join(" ")}
            ref={allInputRef}
            onChange={handleChangeAllValue}
            onBlur={handleBlurAllValue}
          />
        ) : (
          <>
            <Input
              prefix={<span css={prefixContainerStyle}>T</span>}
              colorScheme="techPurple"
              bdRadius="8px 0 0 8px"
              value={values[0]}
              onChange={handleChangePartialValue(0)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>R</span>}
              colorScheme="techPurple"
              bdRadius="0"
              pos="relative"
              l="-1px"
              value={values[1]}
              onChange={handleChangePartialValue(1)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>B</span>}
              colorScheme="techPurple"
              bdRadius="0"
              pos="relative"
              l="-2px"
              value={values[2]}
              onChange={handleChangePartialValue(2)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>L</span>}
              colorScheme="techPurple"
              bdRadius="0 8px 8px 0"
              pos="relative"
              l="-3px"
              value={values[3]}
              onChange={handleChangePartialValue(3)}
            />
          </>
        )}
      </div>
    </>
  )
}

export default DirectionPaddingSetter
