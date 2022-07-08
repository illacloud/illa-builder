import { FC, useCallback, useState } from "react"
import {
  panelBarHeaderStyle,
  applyPanelBarOpenedIconStyle,
  panelBarTitleStyle,
  panelBarItemContentStyle,
  panelBarItemAnimation,
} from "./style"
import { PanelBarProps } from "./interface"
import { motion, AnimatePresence } from "framer-motion"
import { UpIcon } from "@illa-design/icon"

export const PanelBar: FC<PanelBarProps> = (props) => {
  const { title, children, isOpened = true, saveToggleState } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)

  const handleToggle = useCallback(() => {
    saveToggleState?.(!isOpenedState)
    setIsOpenedState(!isOpenedState)
  }, [isOpenedState, saveToggleState])

  return (
    <>
      <div css={panelBarHeaderStyle} onClick={handleToggle}>
        <span css={panelBarTitleStyle}>{title}</span>
        <span css={applyPanelBarOpenedIconStyle(isOpenedState)}>
          <UpIcon />
        </span>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          css={panelBarItemContentStyle}
          role="region"
          variants={panelBarItemAnimation}
          animate={isOpenedState ? "enter" : "exit"}
          exit="exit"
          initial={false}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

PanelBar.displayName = "PanelBar"
