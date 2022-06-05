import { FC, useCallback, useState } from "react"
import {
  labelAndInputWrapperCss,
  listWrapperCss,
  modalInputWrapperCss,
  modalLabelCss,
  modalWrapperCss,
} from "./style"
import { ModalProps } from "./interface"
import { Input } from "@illa-design/input"
import ModalHeader from "@/page/Editor/components/PanelSetters/PublicComponent/Modal/header"

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
      <ModalHeader title={title} handleCloseModal={handleCloseModal} />
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
