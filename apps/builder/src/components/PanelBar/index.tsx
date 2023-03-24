import { AnimatePresence, motion } from "framer-motion"
import { FC, MouseEvent, memo, useCallback, useState } from "react"
import { PlusIcon, UpIcon } from "@illa-design/react"
import { PanelBarProps } from "./interface"
import {
  addIconHotpotStyle,
  applyPanelBarHeaderStyle,
  applyPanelBarOpenedIconStyle,
  applyPanelBarTitleStyle,
  panelBarItemContainerAnimationVariants,
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
    destroyChildrenWhenClose = false,
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
      {destroyChildrenWhenClose ? (
        <AnimatePresence initial={false}>
          isOpenedState && (
          <motion.div
            css={panelBarItemContentStyle}
            variants={panelBarItemContainerAnimationVariants}
            animate={isOpenedState ? "enter" : "exit"}
            initial={false}
            transition={{ duration: 0.2 }}
            exit="exit"
            onClick={onIllaFocus}
          >
            {children}
          </motion.div>
          )
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false}>
          <motion.div
            css={panelBarItemContentStyle}
            variants={panelBarItemContainerAnimationVariants}
            animate={isOpenedState ? "enter" : "exit"}
            initial={false}
            transition={{ duration: 0.2 }}
            exit="exit"
            onClick={onIllaFocus}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
})

PanelBar.displayName = "PanelBar"
