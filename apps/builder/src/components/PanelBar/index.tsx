import { AnimatePresence, motion } from "framer-motion"
import { FC, MouseEvent, memo, useCallback, useRef, useState } from "react"
import { UpIcon } from "@illa-design/react"
import { PanelBarProps } from "./interface"
import {
  applyPanelBarHeaderStyle,
  applyPanelBarOpenedIconStyle,
  applyPanelBarTitleStyle,
  customIconHotpotStyle,
  panelBarItemContainerAnimationVariants,
  panelBarItemContentStyle,
} from "./style"

export const PanelBar: FC<PanelBarProps> = memo((props: PanelBarProps) => {
  const {
    title,
    size = "default",
    children,
    customIcon,
    destroyChildrenWhenClose = false,
    isOpened = true,
    saveToggleState,
    onIllaFocus,
  } = props
  const [isOpenedState, setIsOpenedState] = useState(isOpened)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleToggle = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      if (containerRef.current?.contains(target)) {
        saveToggleState?.(!isOpenedState)
        setIsOpenedState(!isOpenedState)
      }
    },
    [isOpenedState, saveToggleState],
  )

  return (
    <>
      <div
        css={applyPanelBarHeaderStyle(size)}
        onClick={handleToggle}
        ref={containerRef}
      >
        <span css={applyPanelBarTitleStyle(size)}>{title}</span>
        {customIcon ? (
          customIcon
        ) : (
          <div css={customIconHotpotStyle}>
            <UpIcon css={applyPanelBarOpenedIconStyle(isOpenedState, size)} />
          </div>
        )}
      </div>

      {destroyChildrenWhenClose ? (
        <AnimatePresence initial={false}>
          {isOpenedState && (
            <motion.div
              css={panelBarItemContentStyle}
              variants={panelBarItemContainerAnimationVariants}
              animate={isOpenedState ? "enter" : "exit"}
              transition={{ duration: 0.2 }}
              initial="exit"
              exit="exit"
              onClick={onIllaFocus}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            css={panelBarItemContentStyle}
            variants={panelBarItemContainerAnimationVariants}
            animate={isOpenedState ? "enter" : "exit"}
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
