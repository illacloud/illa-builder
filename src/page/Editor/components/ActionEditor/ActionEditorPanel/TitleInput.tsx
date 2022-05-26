import { FC, useState, useRef, useEffect } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { AnimatePresence, motion } from "framer-motion"
import { actionListActions } from "@/redux/action/actionList/actionListSlice"
import { useDispatch } from "react-redux"
import {
  titleContainerCss,
  titleEditIconCss,
  titleCss,
  titleInputContainerCss,
  titleInputCss,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = (props) => {
  const { activeActionItem } = props
  const dispatch = useDispatch()
  const name = activeActionItem?.name || ""
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(name)
  const variants = {
    hidden: {
      display: "none",
    },
    visible: {
      display: "flex",
    },
  }

  useEffect(() => {
    setTitle(name)
  }, [name])

  const focusInput = () => {
    inputRef.current && inputRef.current.focus()
  }

  function handleOnBlur() {
    setIsEditing(false)
    activeActionItem &&
      dispatch(
        actionListActions.updateActionItemReducer({
          ...activeActionItem,
          name: title,
        }),
      )
  }

  const childrenNode = isEditing ? (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      css={titleInputContainerCss}
      onAnimationComplete={focusInput}
    >
      <Input
        onBlur={() => handleOnBlur()}
        onPressEnter={() => handleOnBlur()}
        value={title}
        onChange={(v) => setTitle(v)}
        key={"input"}
        inputRef={inputRef}
        css={titleInputCss}
      />
    </motion.div>
  ) : (
    <motion.div
      onClick={() => {
        setIsEditing(true)
      }}
      css={titleContainerCss}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      key={"title"}
    >
      <span css={titleCss}>{title}</span>
      <PenIcon css={titleEditIconCss} viewBox={"0 0 14 14"} />
    </motion.div>
  )

  return <AnimatePresence>{childrenNode}</AnimatePresence>
}

TitleInput.displayName = "TitleInput"
