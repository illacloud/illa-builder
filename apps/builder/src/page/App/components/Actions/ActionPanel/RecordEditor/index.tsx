import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  AddIcon,
  Button,
  DeleteIcon,
  Input,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { RecordEditorProps } from "@/page/App/components/Actions/ActionPanel/RecordEditor/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordKeyStyle,
  recordStyle,
  recordValueStyle,
  subLabelStyle,
} from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const {
    name,
    records,
    customRender,
    label,
    subLabel,
    onSubLabelClick,
    onDelete,
    onAdd,
    withoutCodeMirror,
    onChangeKey,
    onChangeValue,
    valueInputType,
  } = props

  const { t } = useTranslation()

  const valueExpectedType = useMemo(
    () =>
      valueInputType
        ? valueInputType === VALIDATION_TYPES.ANY
          ? undefined
          : valueInputType
        : VALIDATION_TYPES.STRING,
    [valueInputType],
  )

  const recordList = useMemo(() => {
    return (
      <>
        {records?.map((record, index) => {
          if (customRender) {
            return (
              <div css={recordStyle} key={index}>
                {customRender(record, index)}
                <Button
                  type="button"
                  ml="-1px"
                  minW="32px"
                  variant="outline"
                  bdRadius="0 8px 8px 0"
                  colorScheme="grayBlue"
                  onClick={() => {
                    onDelete(index, record, name)
                  }}
                  leftIcon={<DeleteIcon />}
                />
              </div>
            )
          }
          return (
            <div css={recordStyle} key={index}>
              {withoutCodeMirror ? (
                <Input
                  colorScheme={"techPurple"}
                  _css={recordKeyStyle}
                  height="32px"
                  value={record.key}
                  bdRadius="8px 0 0 8px"
                  placeholder="key"
                  onChange={(value) => {
                    onChangeKey(index, value.trim(), record.value, name)
                  }}
                />
              ) : (
                <CodeEditor
                  wrapperCss={recordKeyStyle}
                  height="32px"
                  value={record.key}
                  lang={CODE_LANG.JAVASCRIPT}
                  placeholder="key"
                  expectValueType={VALIDATION_TYPES.STRING}
                  onChange={(value) => {
                    onChangeKey(index, value.trim(), record.value, name)
                  }}
                  singleLine
                />
              )}
              {withoutCodeMirror ? (
                <Input
                  colorScheme={"techPurple"}
                  height="32px"
                  bdRadius="0"
                  _css={recordValueStyle}
                  placeholder="value"
                  value={record.value}
                  onChange={(value) => {
                    onChangeValue(index, record.key, value.trim(), name)
                  }}
                />
              ) : (
                <CodeEditor
                  height="32px"
                  wrapperCss={recordValueStyle}
                  lang={CODE_LANG.JAVASCRIPT}
                  placeholder="value"
                  value={record.value}
                  expectValueType={valueExpectedType}
                  singleLine
                  onChange={(value) => {
                    onChangeValue(index, record.key, value.trim(), name)
                  }}
                />
              )}
              <Button
                type="button"
                ml="-1px"
                minW="32px"
                variant="outline"
                bdRadius="0 8px 8px 0"
                colorScheme="grayBlue"
                onClick={() => {
                  onDelete(index, record, name)
                }}
                leftIcon={<DeleteIcon />}
              />
            </div>
          )
        })}
      </>
    )
  }, [
    customRender,
    name,
    onChangeKey,
    onChangeValue,
    onDelete,
    records,
    valueExpectedType,
    withoutCodeMirror,
  ])

  return (
    <div css={applyRecordEditorContainerStyle(label)}>
      {label != "" && (
        <span css={recordEditorLabelStyle}>
          <span>{label}</span>
          {subLabel && (
            <span css={subLabelStyle} onClick={onSubLabelClick}>
              {subLabel}
            </span>
          )}
        </span>
      )}
      <div css={recordEditorStyle}>
        {recordList}
        <span>
          <Button
            type="button"
            mb="8px"
            pd="1px 8px"
            colorScheme="techPurple"
            size="medium"
            variant="text"
            onClick={() => {
              onAdd(name)
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
