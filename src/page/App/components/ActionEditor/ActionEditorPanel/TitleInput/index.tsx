import { FC, useState, useRef, useEffect, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { PenIcon } from "@illa-design/icon"
import { Input } from "@illa-design/input"
import { Message } from "@illa-design/Message"
import { Api } from "@/api/base"
import { getSelectedAction } from "@/redux/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { useIsValidActionDisplayName } from "@/page/App/components/ActionEditor/utils"
import {
  applyTitleContainerStyle,
  titleEditIconStyle,
  titleStyle,
  titleInputContainerStyle,
  titleInputStyle,
} from "./style"
import { TitleInputProps } from "./interface"

export const TitleInput: FC<TitleInputProps> = () => {
  const dispatch = useDispatch()
  const activeActionItem = useSelector(getSelectedAction)
  const { setActionListLoading } = useContext(ActionEditorContext)
  const name = activeActionItem?.displayName || ""
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { isValidActionDisplayName } = useIsValidActionDisplayName()

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

    const { error, errorMsg } = isValidActionDisplayName(title)
    if (error) {
      Message.warning(errorMsg as string)
      setTitle(name)
      return
    }

    if (title !== name) {
      Api.request<ActionItem>(
        {
          url: `/actions/${activeActionItem.actionId}`,
          method: "PUT",
          data: {
            ...activeActionItem,
            displayName: title,
          },
        },
        ({ data }) => {
          dispatch(
            actionActions.updateActionItemReducer({
              ...data,
            }),
          )
        },
        () => {},
        () => {},
        (loading) => {
          setActionListLoading?.(loading)
        },
      )
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
