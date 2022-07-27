import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { PenIcon } from "@illa-design/icon"
import { Message } from "@illa-design/message"
import { EditableTextProps } from "./interface"
import { EditableTextWrapperStyle, textStyle } from "./style"
import { isValidDisplayName } from "@/utils/typeHelper"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const EditableText: FC<EditableTextProps> = (props) => {
  const { displayName, updateDisplayNameByBlur } = props
  const [inputValue, setInputValue] = useState(displayName)
  const [isFocusInput, setIsFocusInput] = useState(false)
  const { t } = useTranslation()

  const handleChangeInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleBlurInput = useCallback(() => {
    setIsFocusInput(false)
    if (displayName === inputValue) {
      return
    }
    if (!isValidDisplayName(inputValue)) {
      Message.error(
        t("editor.display_name.validate_error", { displayName: inputValue }),
      )
      setInputValue(displayName)
      return
    }
    if (isAlreadyGenerate(inputValue)) {
      Message.error(
        t("editor.display_name.duplicate_error", { displayName: inputValue }),
      )
      setInputValue(displayName)
      return
    }
    DisplayNameGenerator.updateDisplayName(inputValue, displayName)
    updateDisplayNameByBlur(inputValue)
  }, [inputValue])
  return (
    <div css={EditableTextWrapperStyle}>
      {isFocusInput ? (
        <Input
          autoFocus
          withoutNormalBorder
          borderColor="techPurple"
          value={inputValue}
          onChange={handleChangeInputValue}
          onBlur={handleBlurInput}
        />
      ) : (
        <span
          css={textStyle}
          onClick={() => {
            setIsFocusInput(true)
          }}
        >
          {inputValue}
          <PenIcon />
        </span>
      )}
    </div>
  )
}
