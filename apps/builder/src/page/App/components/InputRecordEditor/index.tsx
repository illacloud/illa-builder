import { FC, useMemo } from "react"
import { InputRecordEditorProps } from "./interface"
import { useTranslation } from "react-i18next"
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordStyle,
} from "./style"
import { Button } from "@illa-design/button"
import { AddIcon, DeleteIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Input } from "@illa-design/input"

export const InputRecordEditor: FC<InputRecordEditorProps> = (props) => {
  const { records, label, onDelete, onAdd, onChangeKey, onChangeValue } = props

  const { t } = useTranslation()

  const recordList = useMemo(() => {
    return (
      <>
        {records.map((record, index) => {
          return (
            <div css={recordStyle} key={index}>
              <Input
                w="100%"
                borderColor="techPurple"
                value={record.key}
                placeholder="key"
                bdRadius="8px 0 0 8px"
                onChange={(value) => {
                  onChangeKey(index, value, record.value)
                }}
              />
              <Input
                w="100%"
                borderColor="techPurple"
                placeholder="value"
                value={record.value}
                ml="-1px"
                bdRadius="0"
                onChange={(value) => {
                  onChangeValue(index, record.key, value)
                }}
              />
              <Button
                ml="-1px"
                variant="outline"
                minW="32px"
                bdRadius="0 8px 8px 0"
                colorScheme="grayBlue"
                onClick={() => {
                  onDelete(index, record)
                }}
                leftIcon={
                  <DeleteIcon
                    color={globalColor(`--${illaPrefix}-grayBlue-08`)}
                  />
                }
              />
            </div>
          )
        })}
      </>
    )
  }, [onChangeKey, onChangeValue, onDelete, records])

  return (
    <div css={applyRecordEditorContainerStyle(label)}>
      {label != "" && <span css={recordEditorLabelStyle}>{label}</span>}
      <div css={recordEditorStyle}>
        {recordList}
        <span>
          <Button
            mb="8px"
            pd="1px 8px"
            colorScheme="techPurple"
            size="medium"
            variant="text"
            onClick={() => {
              onAdd()
            }}
            leftIcon={
              <AddIcon color={globalColor(`--${illaPrefix}-techPurple-08`)} />
            }
          >
            {t("editor.action.panel.btn.new")}
          </Button>
        </span>
      </div>
    </div>
  )
}

InputRecordEditor.displayName = "InputRecordEditor"
