import { FC, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input, PenIcon, useMessage } from "@illa-design/react"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { isValidDisplayName } from "@/utils/typeHelper"
import { EditableTextProps } from "./interface"
import { EditableTextWrapperStyle, textStyle } from "./style"

export const EditableText: FC<EditableTextProps> = (props) => {
  const { displayName, updateDisplayNameByBlur } = props
  const [inputValue, setInputValue] = useState(displayName)
  const [isFocusInput, setIsFocusInput] = useState(false)
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleClickOnSpan = () => {
    setIsFocusInput(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const message = useMessage()

  const handleBlurInput = useCallback(() => {
    setIsFocusInput(false)
    if (displayName === inputValue) {
      return
    }
    if (!isValidDisplayName(inputValue)) {
      message.error({
        content: t("editor.display_name.validate_error", {
          displayName: inputValue,
        }),
      })
      setInputValue(displayName)
      return
    }
    if (DisplayNameGenerator.isAlreadyGenerate(inputValue)) {
      message.error({
        content: t("editor.display_name.duplicate_error", {
          displayName: inputValue,
        }),
      })
      setInputValue(displayName)
      return
    }
    DisplayNameGenerator.updateDisplayName(inputValue, displayName)
    updateDisplayNameByBlur(inputValue)
  }, [displayName, inputValue, message, t, updateDisplayNameByBlur])
  return (
    <div css={EditableTextWrapperStyle}>
      {isFocusInput ? (
        <Input
          colorScheme="techPurple"
          value={inputValue}
          onChange={handleChangeInputValue}
          onBlur={handleBlurInput}
          onPressEnter={handleBlurInput}
          inputRef={inputRef}
        />
      ) : (
        <span css={textStyle} onClick={handleClickOnSpan}>
          {inputValue}
          <PenIcon />
        </span>
      )}
    </div>
  )
}
