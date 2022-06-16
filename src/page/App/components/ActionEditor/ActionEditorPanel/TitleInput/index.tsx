import { FC, useState, useRef, useEffect } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { AnimatePresence, motion } from "framer-motion"
import {
  applyTitleContainerStyle,
  titleEditIconStyle,
  titleStyle,
  titleInputContainerStyle,
  titleInputStyle,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = (props) => {
  const { activeActionItem, onChange } = props
  const name = activeActionItem?.displayName || ""
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(name)
  const editable = title !== ""
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
    setTimeout(() => {
      inputRef.current && inputRef.current.focus()
    })
  }

  function handleOnBlur() {
    setIsEditing(false)

    if (title !== name) {
      onChange?.(title)
    }
  }

  const childrenNode = isEditing ? (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      css={titleInputContainerStyle}
      onAnimationComplete={focusInput}
    >
      <Input
        onBlur={() => handleOnBlur()}
        onPressEnter={() => handleOnBlur()}
        value={title}
        onChange={(v) => setTitle(v)}
        key={"input"}
        inputRef={inputRef}
        css={titleInputStyle}
      />
    </motion.div>
  ) : (
    <motion.div
      onClick={() => {
        editable && setIsEditing(true)
      }}
      css={applyTitleContainerStyle(editable)}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      key={"title"}
    >
      <span css={titleStyle} title={title}>
        {title}
      </span>
      <PenIcon css={titleEditIconStyle} viewBox={"0 0 14 14"} />
    </motion.div>
  )

  return <AnimatePresence>{childrenNode}</AnimatePresence>
}

TitleInput.displayName = "TitleInput"
