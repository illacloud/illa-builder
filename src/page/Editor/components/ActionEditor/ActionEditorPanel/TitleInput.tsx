import { FC, useState, useRef, useEffect } from "react"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { BuilderState } from "@/redux/reducers/interface"
import {
  updateQueryItem,
  selectQueryItemById,
} from "@/redux/reducers/actionReducer/queryListReducer"
import { getActionEditorQueryId } from "@/redux/selectors/actionSelector/editorSeletor"
import {
  TitleContainer,
  TitleEditIcon,
  Title,
  TitleInputContainer,
  TitleInputCss,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const queryId = useSelector(getActionEditorQueryId)
  const { name } =
    useSelector((state: BuilderState) => selectQueryItemById(state, queryId)) ??
    {}
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
    dispatch(updateQueryItem({ id: queryId, changes: { name: title } }))
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
        onBlur={() => handleOnBlur()}
        onPressEnter={() => handleOnBlur()}
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

  return <AnimatePresence>{childrenNode}</AnimatePresence>
}

TitleInput.displayName = "TitleInput"
