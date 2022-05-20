import { FC, useCallback, useState } from "react"
import {
  panelBarHeaderCss,
  panelBarOpenedIconCss,
  panelBarTitleCss,
  panelBarWrapperCss,
  panelBarItemContentCss,
  panelBarItemAnimation,
} from "./style"
import { PanelBarProps } from "./interface"
import { motion, AnimatePresence } from "framer-motion"

export const PanelBar: FC<PanelBarProps> = (props) => {
  const { title, children, isOpened = true } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)

  const handleToggle = useCallback(() => {
    setIsOpenedState(!isOpenedState)
  }, [isOpenedState])

  return (
    <div css={panelBarWrapperCss}>
      <div css={panelBarHeaderCss} onClick={handleToggle}>
        <span css={panelBarTitleCss}>{title}</span>
        <span css={panelBarOpenedIconCss(isOpenedState)}>
          {/* if use CreateIcon ,react will waring it need keys.*/}
          <svg
            viewBox="0 0 8 6"
            fill="none"
            color="currentColor"
            width="8px"
            height="8px"
          >
            <title>ExpandIcon</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.76034 5.2996C7.4568 5.58145 6.98225 5.56387 6.7004 5.26034L4 2.35221L1.29959 5.26034C1.01774 5.56387 0.543192 5.58145 0.239659 5.2996C-0.063875 5.01774 -0.0814503 4.5432 0.200401 4.23966L3.4504 0.739662C3.59231 0.586837 3.79144 0.5 4 0.5C4.20855 0.5 4.40768 0.586837 4.54959 0.739662L7.79959 4.23966C8.08144 4.54319 8.06387 5.01774 7.76034 5.2996Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          css={panelBarItemContentCss}
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
