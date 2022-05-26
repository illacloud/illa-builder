import { FC, useCallback, useState } from "react"
import {
  labelAndInputWrapperCss,
  listWrapperCss,
  modalCloseIconCss,
  modalHeaderCss,
  modalInputWrapperCss,
  modalLabelCss,
  modalWrapperCss,
} from "./style"
import { ModalProps } from "./interface"
import { Input } from "@illa-design/input"
import { CloseIcon } from "@illa-design/icon"
import { dispatch } from "use-bus"

export const Modal: FC<ModalProps> = (props) => {
  const { title, label, value, index, handleUpdateDsl, disabled } = props

  const [labelValue, setLabelValue] = useState(label)
  const [optionValue, setOptionValue] = useState(value)
  const [disabledValue, setDisabledValue] = useState(disabled ?? "")

  const handleClickCloseIcon = useCallback(() => {
    dispatch(`CLOSE_LIST_ITEM_MODAL_${index}`)
  }, [index])

  const handleChangeValue = useCallback(
    (value) => {
      setOptionValue(value)
      handleUpdateDsl(index, {
        value: value,
      })
    },
    [index],
  )

  const handleChangeLabel = useCallback(
    (value) => {
      setLabelValue(value)
      handleUpdateDsl(index, {
        label: value,
      })
    },
    [index],
  )

  const handleChangeDisabled = useCallback(
    (value) => {
      setDisabledValue(value)
      handleUpdateDsl(index, {
        disabled: value && value !== "false",
      })
    },
    [index],
  )

  return (
    <div css={modalWrapperCss}>
      <div css={modalHeaderCss}>
        <span>{title}</span>
        <span onClick={handleClickCloseIcon} css={modalCloseIconCss}>
          <CloseIcon />
        </span>
      </div>
      <div css={listWrapperCss}>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Value</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={optionValue}
              placeholder={optionValue || `${index}`}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Label</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={labelValue}
              placeholder={labelValue || optionValue || `${index}`}
              onChange={handleChangeLabel}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Disabled</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={disabledValue}
              placeholder="false"
              onChange={handleChangeDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
