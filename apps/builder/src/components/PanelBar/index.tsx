import { AnimatePresence, motion } from "framer-motion"
import { FC, MouseEvent, memo, useCallback, useState } from "react"
import { PlusIcon, UpIcon } from "@illa-design/react"
import { PanelBarProps } from "./interface"
import {
  addIconHotpotStyle,
  applyPanelBarHeaderStyle,
  applyPanelBarOpenedIconStyle,
  applyPanelBarTitleStyle,
  panelBarItemAnimation,
  panelBarItemContentStyle,
} from "./style"

export const PanelBar: FC<PanelBarProps> = memo((props: PanelBarProps) => {
  const {
    title,
    size = "default",
    children,
    isOpened = true,
    saveToggleState,
    onIllaFocus,
    isAddIcon = false,
    addAction,
  } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)

  const handleToggle = useCallback(() => {
    saveToggleState?.(!isOpenedState)
    setIsOpenedState(!isOpenedState)
  }, [isOpenedState, saveToggleState])

  const handleClickAddIcon = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    addAction?.()
  }

  return (
    <>
      <div css={applyPanelBarHeaderStyle(size)} onClick={handleToggle}>
        <span css={applyPanelBarTitleStyle(size)}>{title}</span>
        <span>
          {isAddIcon ? (
            <div css={addIconHotpotStyle} onClick={handleClickAddIcon}>
              <PlusIcon />
            </div>
          ) : (
            <UpIcon css={applyPanelBarOpenedIconStyle(isOpenedState, size)} />
          )}
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
