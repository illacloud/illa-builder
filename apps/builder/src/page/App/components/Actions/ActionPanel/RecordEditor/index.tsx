import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  AddIcon,
  Button,
  DeleteIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { RecordEditorProps } from "@/page/App/components/Actions/ActionPanel/RecordEditor/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordKeyStyle,
  recordStyle,
  recordValueStyle,
} from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const {
    records,
    customRender,
    label,
    onDelete,
    onAdd,
    onChangeKey,
    onChangeValue,
  } = props

  const { t } = useTranslation()

  const recordList = useMemo(() => {
    return (
      <>
        {records?.map((record, index) => {
          if (customRender) {
            return (
              <div css={recordStyle} key={index}>
                {customRender(record, index)}
                <Button
                  ml="-1px"
                  variant="outline"
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
          }
          return (
            <div css={recordStyle} key={index}>
              <CodeEditor
                css={recordKeyStyle}
                height="32px"
                value={record.key}
                mode="TEXT_JS"
                placeholder="key"
                borderRadius="8px 0 0 8px"
                expectedType={VALIDATION_TYPES.STRING}
                onChange={(value) => {
                  onChangeKey(index, value, record.value)
                }}
              />
              <CodeEditor
                css={recordValueStyle}
                height="32px"
                mode="TEXT_JS"
                placeholder="value"
                value={record.value}
                borderRadius="0 0 0 0"
                expectedType={VALIDATION_TYPES.STRING}
                onChange={(value) => {
                  onChangeValue(index, record.key, value)
                }}
              />
              <Button
                ml="-1px"
                variant="outline"
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

RecordEditor.displayName = "RecordEditor"
