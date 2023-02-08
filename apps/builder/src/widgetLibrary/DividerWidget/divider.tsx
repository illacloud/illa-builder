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
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      text,
      fs,
      textAlign,
      setValue: (value: string) => {
        handleUpdateDsl({ text: value })
      },
      clearValue: () => {
        handleUpdateDsl({ text: "" })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    text,
    fs,
    textAlign,
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return (
    <div css={dividerContainerStyle}>
      <WrappedDivider {...props} />
    </div>
  )
}

DividerWidget.displayName = "DividerWidget"
