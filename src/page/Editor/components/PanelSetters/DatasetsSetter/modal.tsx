import { FC, useCallback, useState } from "react"
import {
  colorPickerContainerStyle,
  labelAndInputWrapperCss,
  listWrapperCss,
  modalCloseIconCss,
  modalHeaderCss,
  modalInputWrapperCss,
  modalLabelCss,
  modalWrapperCss,
} from "./style"
import { ModalProps } from "./interface"
import { Input, TextArea } from "@illa-design/input"
import { CloseIcon } from "@illa-design/icon"
import { TextAreaInput } from "@/page/Editor/components/PanelSetters/InputSetter/textAreaInput"
import { Select } from "@illa-design/select"
import { aggregationDatasets } from "@/wrappedComponents/Chart/utils"
import { CHART_TYPE, COLOR_SCHEME } from "@/wrappedComponents/Chart/interface"
import { ColorSelectSetter } from "@/page/Editor/components/PanelSetters/SelectSetter/colorSelect"

export const Modal: FC<ModalProps> = (props) => {
  const {
    title,
    label,
    value,
    index,
    handleUpdateItem,
    disabled,
    aggregationMethod,
    handleCloseModal,
    color,
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
          <span css={modalLabelCss}>Dataset name</span>
          <div css={modalInputWrapperCss}>
            <Input
              value={label}
              placeholder={label}
              onChange={handleChangeValue}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Dataset values</span>
          <div css={modalInputWrapperCss}>
            <TextArea
              style={{ width: "auto" }}
              borderColor={"techPurple"}
              value={value}
              autoSize={{ maxRows: 10, minRows: 10 }}
              onChange={(value) => {}}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Aggregation method</span>
          <div css={modalInputWrapperCss}>
            <Select
              options={["NONE", "SUM"]}
              size="small"
              colorScheme={"techPurple"}
              defaultValue={"NONE"}
              onChange={(value) => {}}
            />
          </div>
        </div>

        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Type</span>
          <div css={modalInputWrapperCss}>
            <Select
              options={CHART_TYPE}
              size="small"
              colorScheme={"techPurple"}
              defaultValue={"line"}
              onChange={(value) => {}}
            />
          </div>
        </div>

        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Tooltip</span>
          <div css={modalInputWrapperCss}>
            <TextArea
              style={{ width: "auto" }}
              borderColor={"techPurple"}
              value={value}
              autoSize={{ maxRows: 3, minRows: 3 }}
              onChange={(value) => {}}
            />
          </div>
        </div>

        <div css={labelAndInputWrapperCss}>
          <span css={modalLabelCss}>Color</span>
          <div css={modalInputWrapperCss}>
            <ColorSelectSetter
              options={COLOR_SCHEME.map((color) => {
                return { key: color, value: color }
              })}
              defaultValue={"#DA56EF"}
              attrName={""}
              panelConfig={{}}
              handleUpdatePanelConfig={() => {}}
              handleUpdateDsl={() => {}}
            />
          </div>
        </div>
        <div css={labelAndInputWrapperCss}></div>
      </div>
    </div>
  )
}
