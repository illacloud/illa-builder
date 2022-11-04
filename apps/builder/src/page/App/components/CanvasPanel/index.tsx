import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  applyScaleContainerStyle,
  previewStyle,
  messageStyle,
  messageWrapperStyle,
} from "./style"
import { CanvasPanelProps } from "./interface"
import { DotPanel } from "@/page/App/components/DotPanel"
import { useDispatch, useSelector } from "react-redux"
import { FullScreenIcon, LockIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { getFreezeState, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { FocusManager } from "@/utils/focusManager"

export const CanvasPanel: FC<CanvasPanelProps> = (props) => {
  const { ...otherProps } = props

  const { t } = useTranslation()
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()
  const isFreeze = useSelector(getFreezeState)

  return (
    <div
      {...otherProps}
      css={applyScaleContainerStyle(100)}
      onClick={() => {
        FocusManager.switchFocus("canvas")
      }}
    >
      <DotPanel />
      {mode === "edit" && (
        <>
          <Button
            css={previewStyle}
            colorScheme="white"
            variant="fill"
            leftIcon={<FullScreenIcon />}
            onClick={() => {
              dispatch(configActions.updateIllaMode("preview"))
            }}
          >
            {t("preview")}
          </Button>
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
