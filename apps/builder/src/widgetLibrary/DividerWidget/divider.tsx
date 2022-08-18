import { FC, forwardRef, useEffect, useMemo } from "react"
import { Divider } from "@illa-design/divider"
import { DividerWidgetProps, WrappedDividerProps } from "./interface"
import { dividerContainerStyle } from "./style"

export const WrappedDivider = forwardRef<any, WrappedDividerProps>(
  (props, ref) => {
    const { text, fs } = props

    const _textSize = useMemo(() => {
      return !isNaN(Number(fs)) ? fs + "px" : fs?.toString()
    }, [fs])

    return <Divider w="100%" text={text} fs={_textSize} />
  },
)

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget: FC<DividerWidgetProps> = props => {
  const {
    text,
    fs,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      text,
      fs,
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
  }, [text, fs, text, displayName])

  return (
    <div css={dividerContainerStyle}>
      <WrappedDivider {...props} />
    </div>
  )
}

DividerWidget.displayName = "DividerWidget"
