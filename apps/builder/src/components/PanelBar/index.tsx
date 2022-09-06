import { FC, memo, useCallback, useState } from "react"
import {
  applyPanelBarOpenedIconStyle,
  panelBarHeaderStyle,
  panelBarItemAnimation,
  panelBarItemContentStyle,
  panelBarTitleStyle,
} from "./style"
import { PanelBarProps } from "./interface"
import { AnimatePresence, motion } from "framer-motion"
import { UpIcon } from "@illa-design/icon"

export const PanelBar: FC<PanelBarProps> = memo((props: PanelBarProps) => {
  const {
    title,
    children,
    isOpened = true,
    saveToggleState,
    onIllaFocus,
  } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)

  const handleToggle = useCallback(() => {
    saveToggleState?.(!isOpenedState)
    setIsOpenedState(!isOpenedState)
  }, [isOpenedState, saveToggleState])

  return (
    <>
      <div css={panelBarHeaderStyle} onClick={handleToggle}>
        <span css={panelBarTitleStyle}>{title}</span>
        <span>
          <UpIcon css={applyPanelBarOpenedIconStyle(isOpenedState)} />
        </span>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          css={panelBarItemContentStyle}
          role="region"
          variants={panelBarItemAnimation}
          transition={{
            default: { ease: "easeInOut" },
          }}
          animate={isOpenedState ? "enter" : "exit"}
          exit="exit"
          initial={false}
          onClick={onIllaFocus}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
})

PanelBar.displayName = "PanelBar"
