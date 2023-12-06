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
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { RecordEditorProps } from "./interface"
import {
  applyRecordEditorContainerStyle,
  applyRecordValueStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordKeyStyle,
  recordStyle,
  subLabelStyle,
} from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const {
    fillOnly,
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
                {customRender(record, index, fillOnly)}
                <Button
                  type="button"
                  ml="-1px"
                  minW="32px"
                  variant="outline"
                  bdRadius="0 8px 8px 0"
                  colorScheme="grayBlue"
                  onClick={() => {
                    onDelete?.(index, record, name)
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
                  height="32px"
                  value={record.key}
                  readOnly={fillOnly}
                  minW="160px"
                  width="0"
                  flexGrow="1"
                  bdRadius="8px 0 0 8px"
                  placeholder="key"
                  onChange={(value) => {
                    onChangeKey?.(index, value.trim(), record.value, name)
                  }}
                />
              ) : (
                <CodeEditor
                  wrapperCss={recordKeyStyle}
                  height="32px"
                  editable={!fillOnly}
                  value={record.key}
                  lang={CODE_LANG.JAVASCRIPT}
                  placeholder="key"
                  expectValueType={VALIDATION_TYPES.STRING}
                  onChange={(value) => {
                    onChangeKey?.(index, value.trim(), record.value, name)
                  }}
                  singleLine
                />
              )}
              {withoutCodeMirror ? (
                <Input
                  colorScheme={"techPurple"}
                  height="32px"
                  bdRadius={fillOnly ? "0 8px 8px 0" : "0"}
                  ml="-1px"
                  placeholder="value"
                  minW="160px"
                  width="0"
                  flexGrow="1"
                  value={record.value}
                  onChange={(value) => {
                    onChangeValue?.(index, record.key, value.trim(), name)
                  }}
                />
              ) : (
                <CodeEditor
                  height="32px"
                  wrapperCss={applyRecordValueStyle(fillOnly)}
                  lang={CODE_LANG.JAVASCRIPT}
                  placeholder="value"
                  value={record.value}
                  expectValueType={valueExpectedType}
                  singleLine
                  onChange={(value) => {
                    onChangeValue?.(index, record.key, value.trim(), name)
                  }}
                />
              )}
              {!fillOnly && (
                <Button
                  type="button"
                  ml="-1px"
                  minW="32px"
                  variant="outline"
                  bdRadius="0 8px 8px 0"
                  colorScheme="grayBlue"
                  onClick={() => {
                    onDelete?.(index, record, name)
                  }}
                  leftIcon={<DeleteIcon />}
                />
              )}
            </div>
          )
        })}
      </>
    )
  }, [
    customRender,
    fillOnly,
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
        {!fillOnly && (
          <span>
            <Button
              type="button"
              mb="8px"
              pd="1px 8px"
              colorScheme="techPurple"
              size="medium"
              variant="text"
              onClick={() => {
                onAdd?.(name)
              }}
              leftIcon={
                <AddIcon color={globalColor(`--${illaPrefix}-techPurple-03`)} />
              }
            >
              {t("editor.action.panel.btn.new")}
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

RecordEditor.displayName = "RecordEditor"
