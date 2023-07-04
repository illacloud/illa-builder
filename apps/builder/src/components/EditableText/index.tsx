import { FC, useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input, PenIcon, useMessage } from "@illa-design/react"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { isValidDisplayName } from "@/utils/typeHelper"
import { EditableTextProps } from "./interface"
import { editableTextWrapperStyle, innerTextStyle, textStyle } from "./style"

export const EditableText: FC<EditableTextProps> = (props) => {
  const {
    displayName,
    updateDisplayNameByBlur,
    onMouseEnter,
    onClick,
    onBlur,
    onValidate,
  } = props
  const [inputValue, setInputValue] = useState(displayName)
  const [isFocusInput, setIsFocusInput] = useState(false)
  const { t } = useTranslation()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleClickOnSpan = () => {
    if (isFocusInput) return
    setIsFocusInput(true)
    onClick?.()
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
    onBlur?.(inputValue)
    if (!isValidDisplayName(inputValue)) {
      message.error({
        content: t("editor.display_name.validate_error", {
          displayName: inputValue,
        }),
      })
      onValidate?.("failed")
      setInputValue(displayName)
      return
    }
    if (DisplayNameGenerator.isAlreadyGenerate(inputValue)) {
      message.error({
        content: t("editor.display_name.duplicate_error", {
          displayName: inputValue,
        }),
      })
      onValidate?.("failed")
      setInputValue(displayName)
      return
    }
    onValidate?.("suc")
    updateDisplayNameByBlur(inputValue)
  }, [
    displayName,
    inputValue,
    message,
    onBlur,
    onValidate,
    t,
    updateDisplayNameByBlur,
  ])
  return (
    <div
      css={editableTextWrapperStyle}
      onMouseEnter={onMouseEnter}
      className="editable-text-container"
      onClick={handleClickOnSpan}
    >
      {isFocusInput ? (
        <Input
          colorScheme="techPurple"
          value={inputValue}
          onChange={handleChangeInputValue}
          onBlur={handleBlurInput}
          onPressEnter={handleBlurInput}
          inputRef={inputRef}
          className="input-container"
        />
      ) : (
        <span css={textStyle} className="text-container">
          <span css={innerTextStyle}>
            {inputValue}
            <PenIcon />
          </span>
        </span>
      )}
    </div>
  )
}
