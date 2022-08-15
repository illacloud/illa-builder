import { forwardRef, useMemo, FC, useEffect } from "react"
import { Divider } from "@illa-design/divider"
import { WrappedDividerProps, DividerWidgetProps } from "./interface"
import { dividerContainerStyle } from "./style";

export const WrappedDivider = forwardRef<any, WrappedDividerProps>(
  (props, ref) => {
    const { text, textAlign, colorScheme, textSize } = props

    const _textSize = useMemo(() => {
      return !isNaN(Number(textSize)) ? textSize + "px" : textSize?.toString()
    }, [textSize])

    return (
      <Divider
        text={text}
        textAlign={textAlign}
        textSize={_textSize}
        colorScheme={colorScheme}
      />
    )
  },
)

WrappedDivider.displayName = "WrappedDivider"

export const DividerWidget: FC<DividerWidgetProps> = (props) => {
  const {
    text,
    textAlign,
    colorScheme,
    textSize,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      text,
      textAlign,
      colorScheme,
      textSize,
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
  }, [text, textAlign, colorScheme, textSize, displayName])

  return <div css={dividerContainerStyle}><WrappedDivider {...props} /></div>
}

DividerWidget.displayName = "DividerWidget"
