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

export const Modal: FC<ModalProps> = (props) => {
  const {
    title,
    label,
    value,
    index,
    handleUpdateItem,
    disabled,
    handleCloseModal,
  } = props

  const [labelValue, setLabelValue] = useState(label)
  const [optionValue, setOptionValue] = useState(value)
  const [disabledValue, setDisabledValue] = useState(disabled ?? "")

  const handleClickCloseIcon = useCallback(() => {
    handleCloseModal()
  }, [handleCloseModal])

  const handleChangeValue = useCallback(
    (value) => {
      setOptionValue(value)
      handleUpdateItem(index, {
        value: value,
      })
    },
    [index],
  )

  const handleChangeLabel = useCallback(
    (value) => {
      setLabelValue(value)
      handleUpdateItem(index, {
        label: value,
      })
    },
    [index],
  )

  const handleChangeDisabled = useCallback(
    (value) => {
      setDisabledValue(value)
      handleUpdateItem(index, {
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
