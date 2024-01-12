import PartialIcon from "@assets/rightPagePanel/partial.svg?react"
import { PADDING_MODE } from "@illa-public/public-types"
import { get } from "lodash-es"
import { FC, FocusEventHandler, useRef } from "react"
import { useDispatch } from "react-redux"
import { Input, RadioGroup } from "@illa-design/react"
import AllIcon from "@/assets/rightPagePanel/all.svg?react"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import { configActions } from "@/redux/config/configSlice"
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

const formatPartialValue = (value: string = "") => {
  if (!/^[0-9]+$/.test(value)) {
    return "0"
  }
  return value
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
  const dispatch = useDispatch()
  const { handleUpdateMultiAttrDSL, componentNode, attrName, labelName } = props

  const paddingValue = {
    mode: get(componentNode, `props.${attrName}.mode`, PADDING_MODE.ALL),
    size: get(componentNode, `props.${attrName}.size`, "0"),
  }

  const values = paddingValue.size.split(" ")
  const isAll = paddingValue.mode === PADDING_MODE.ALL

  const allInputRef = useRef<HTMLInputElement>(null)

  const handleChangeAllValue = (allValue: string) => {
    handleUpdateMultiAttrDSL?.({
      [attrName]: {
        mode: PADDING_MODE.ALL,
        size: allValue,
      },
    })
  }

  const handleBlurAllValue: FocusEventHandler<HTMLInputElement> = (e) => {
    handleUpdateMultiAttrDSL?.({
      [attrName]: {
        mode: PADDING_MODE.ALL,
        size: formatValue(e.target.value ?? ""),
      },
    })
    dispatch(configActions.updateShowDot(false))
  }

  const handleChangePartialValue = (index: number) => {
    return (partialValue: string) => {
      values[index] = partialValue
      if (partialValue !== "" && !/^[0-9]+$/.test(partialValue)) return
      handleUpdateMultiAttrDSL?.({
        [attrName]: {
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
          [attrName]: {
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
          [attrName]: {
            size: result,
            mode: mode,
          },
        })
        break
      }
    }
  }

  const handleOnFocus = () => {
    dispatch(configActions.updateShowDot(true))
  }

  const handleOnBlurPartialValue = (index: number) => {
    const fixFunc: FocusEventHandler<HTMLInputElement> = (e) => {
      dispatch(configActions.updateShowDot(false))
      const value = formatPartialValue(e.target.value)
      values[index] = value
      handleUpdateMultiAttrDSL?.({
        [attrName]: {
          mode: PADDING_MODE.PARTIAL,
          size: values.join(" "),
        },
      })
    }
    return fixFunc
  }

  return (
    <>
      <div css={setterContainerStyle}>
        <PanelLabel labelName={labelName} />
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
            onFocus={handleOnFocus}
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
              onFocus={handleOnFocus}
              onBlur={handleOnBlurPartialValue(0)}
              onChange={handleChangePartialValue(0)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>R</span>}
              colorScheme="techPurple"
              bdRadius="0"
              pos="relative"
              l="-1px"
              value={values[1]}
              onFocus={handleOnFocus}
              onBlur={handleOnBlurPartialValue(1)}
              onChange={handleChangePartialValue(1)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>B</span>}
              colorScheme="techPurple"
              bdRadius="0"
              pos="relative"
              l="-2px"
              value={values[2]}
              onFocus={handleOnFocus}
              onBlur={handleOnBlurPartialValue(2)}
              onChange={handleChangePartialValue(2)}
            />
            <Input
              prefix={<span css={prefixContainerStyle}>L</span>}
              colorScheme="techPurple"
              bdRadius="0 8px 8px 0"
              pos="relative"
              l="-3px"
              value={values[3]}
              onFocus={handleOnFocus}
              onBlur={handleOnBlurPartialValue(3)}
              onChange={handleChangePartialValue(3)}
            />
          </>
        )}
      </div>
    </>
  )
}

export default DirectionPaddingSetter
