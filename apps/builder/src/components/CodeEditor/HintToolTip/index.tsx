import copy from "copy-to-clipboard"
import { FC, useCallback, useState } from "react"
import { CopyIcon, ErrorIcon, Trigger } from "@illa-design/react"
import {
  HintTooltipContentProps,
  HintTooltipProps,
} from "@/components/CodeEditor/HintToolTip/interface"
import {
  applyHintTooltipContentMainWrapperStyle,
  applyHintTooltipContentWrapperStyle,
  copyIconStyle,
  hintTooltipContentTitleStyle,
  hintTooltipContentTitleWrapperStyle,
  hintTooltipResultStyle,
} from "@/components/CodeEditor/HintToolTip/style"

export const HintTooltipContent: FC<HintTooltipContentProps> = (props) => {
  const { hasError = false, resultType, result, setIsHovered } = props

  const handleClickCopy = useCallback(() => {
    if (result) {
      copy(result)
    }
  }, [result])
  return (
    <div
      css={applyHintTooltipContentWrapperStyle(hasError)}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <div css={applyHintTooltipContentMainWrapperStyle(hasError)}>
        <div css={hintTooltipContentTitleWrapperStyle}>
          {hasError && <ErrorIcon size="12px" />}
          <span css={hintTooltipContentTitleStyle}>
            {hasError ? "Error" : resultType}
          </span>
        </div>
        <span css={hintTooltipResultStyle}>{result}</span>
      </div>
      <CopyIcon css={copyIconStyle} onClick={handleClickCopy} />
    </div>
  )
}

export const HintToolTip: FC<HintTooltipProps> = (props) => {
  const { isEditorFocused, result, hasError, resultType, children } = props
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Trigger
      withoutPadding
      withoutOffset
      withoutShadow
      autoAlignPopupWidth
      showArrow={false}
      popupVisible={isEditorFocused || isHovered}
      position="bottom-start"
      colorScheme="white"
      renderInBody={false}
      content={
        <HintTooltipContent
          hasError={hasError}
          resultType={resultType}
          result={result}
          setIsHovered={setIsHovered}
        />
      }
    >
      {children}
    </Trigger>
  )
}
