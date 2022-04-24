import { FC, useState, useRef } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { AnimatePresence, motion } from "framer-motion"
import {
  TitleContainer,
  TitleEditIcon,
  Title,
  TitleInputContainer,
  TitleInputCss,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = (props) => {
  const { title: titleProps } = props
  const [title, setTitle] = useState(titleProps)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const variants = {
    hidden: {
      display: "none",
    },
    visible: {
      display: "flex",
    },
  }

  const focusInput = () => {
    inputRef.current && inputRef.current.focus()
  }

  const childrenNode = isEditing ? (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      css={TitleInputContainer}
      onAnimationComplete={focusInput}
    >
      <Input
        onBlur={() => setIsEditing(false)}
        value={title}
        onChange={(v) => setTitle(v)}
        key={"input"}
        inputRef={inputRef}
        css={TitleInputCss}
      />
    </motion.div>
  ) : (
    <motion.div
      onClick={() => {
        setIsEditing(true)
      }}
      css={TitleContainer}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      key={"title"}
    >
      <span css={Title}>{title}</span>
      <PenIcon css={TitleEditIcon} viewBox={"0 0 14 14"} />
    </motion.div>
  )

  return <AnimatePresence> {childrenNode}</AnimatePresence>
}

TitleInput.displayName = "TitleInput"
