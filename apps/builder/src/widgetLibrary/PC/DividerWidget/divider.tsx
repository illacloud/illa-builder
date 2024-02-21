import { FC, useEffect, useMemo } from "react"
import { Divider } from "@illa-design/react"
import { DividerWidgetProps, WrappedDividerProps } from "./interface"
import { dividerContainerStyle } from "./style"

export const WrappedDivider: FC<WrappedDividerProps> = (props) => {
  const { text, fs, textAlign } = props

  const _textSize = useMemo(() => {
    return !isNaN(Number(fs)) ? fs + "px" : fs?.toString()
  }, [fs])

  return <Divider w="100%" textAlign={textAlign} text={text} fs={_textSize} />
}

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget: FC<DividerWidgetProps> = (props) => {
  const {
    text,
    fs,
    textAlign,
    displayName,
    handleUpdateDsl,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props

  useEffect(() => {
    updateComponentRuntimeProps({
      setValue: (value: string) => {
        handleUpdateDsl({ text: value })
      },
      clearValue: () => {
        handleUpdateDsl({ text: "" })
      },
    })

    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    text,
    fs,
    textAlign,
    displayName,
    updateComponentRuntimeProps,
    handleUpdateDsl,
    deleteComponentRuntimeProps,
  ])

  return (
    <div css={dividerContainerStyle}>
      <WrappedDivider {...props} />
    </div>
  )
}

DividerWidget.displayName = "DividerWidget"
export default DividerWidget
