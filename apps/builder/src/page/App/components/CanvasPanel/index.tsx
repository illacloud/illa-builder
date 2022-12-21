import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { LockIcon } from "@illa-design/react"
import { DotPanel } from "@/page/App/components/DotPanel"
import { getFreezeState, getIllaMode } from "@/redux/config/configSelector"
import { FocusManager } from "@/utils/focusManager"
import { CanvasPanelProps } from "./interface"
import { messageStyle, messageWrapperStyle, scaleContainerStyle } from "./style"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const { t } = useTranslation()
  const mode = useSelector(getIllaMode)
  const isFreeze = useSelector(getFreezeState)

  return (
    <div
      {...otherProps}
      css={scaleContainerStyle}
      onClick={() => {
        FocusManager.switchFocus("canvas")
      }}
    >
      <DotPanel />
      {mode === "edit" && (
        <>
          {/*TODO: replace this to illa-design/Message,when Message is ok*/}
          {isFreeze ? (
            <div css={messageWrapperStyle}>
              <span css={messageStyle}>
                <LockIcon />
                <span style={{ marginLeft: "8px" }}>
                  {t("freeze_messages")}
                </span>
              </span>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

CanvasPanel.displayName = "CanvasPanel"
