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
  const { title, children, isOpened = true } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)

  const handleToggle = useCallback(() => {
    setIsOpenedState(!isOpenedState)
  }, [isOpenedState])

  return (
    <div>
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
          <div>{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

PanelBar.displayName = "PanelBar"
