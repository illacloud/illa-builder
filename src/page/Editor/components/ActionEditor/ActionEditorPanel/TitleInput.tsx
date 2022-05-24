import { FC, useState, useRef, useEffect } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { BuilderState } from "@/redux/reducers/interface"
import {
  updateActionItem,
  selectActionItemById,
} from "@/redux/reducers/actionReducer/actionListReducer"
import {
  TitleContainerCSS,
  TitleEditIconCSS,
  TitleCSS,
  TitleInputContainerCSS,
  TitleInputCSS,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const actionId = ""
  const { name } =
    useSelector((state: BuilderState) =>
      selectActionItemById(state, actionId),
    ) ?? {}
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
    updateName()
  }

  function updateName() {
    dispatch(updateActionItem({ id: actionId, changes: { name: title } }))
  }

  const childrenNode = isEditing ? (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      css={TitleInputContainerCSS}
      onAnimationComplete={focusInput}
    >
      <Input
        onBlur={() => handleOnBlur()}
        onPressEnter={() => handleOnBlur()}
        value={title}
        onChange={(v) => setTitle(v)}
        key={"input"}
        inputRef={inputRef}
        css={TitleInputCSS}
      />
    </motion.div>
  ) : (
    <motion.div
      onClick={() => {
        setIsEditing(true)
      }}
      css={TitleContainerCSS}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      transition={{ duration: 0.2 }}
      key={"title"}
    >
      <span css={TitleCSS}>{title}</span>
      <PenIcon css={TitleEditIconCSS} viewBox={"0 0 14 14"} />
    </motion.div>
  )

  return <AnimatePresence>{childrenNode}</AnimatePresence>
}

TitleInput.displayName = "TitleInput"
