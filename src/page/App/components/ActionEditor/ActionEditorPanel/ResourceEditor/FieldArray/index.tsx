import { FC } from "react"
import { useTranslation } from "react-i18next"
import { AddIcon, DeleteIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { Select } from "@illa-design/select"
import { CodeEditor } from "@/components/CodeEditor"
import { FieldArrayProps } from "./interface"
import {
  deleteIconWrapperStyle,
  fieldItemStyle,
  fieldItemKeyStyle,
  fieldItemValueStyle,
  fieldItemTypeStyle,
  newButtonStyle,
} from "./style"

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const {
    hasType,
    onChange,
    value: fields = [],
    typeOptions,
    autoNewField,
    onAdd,
    onRemove,
  } = props

  const { t } = useTranslation()

  function autoAddField(index: number) {
    if (!autoNewField) {
      return
    }

    if (index === fields.length - 1) {
      onAdd?.()
    }
  }

  const fieldList = fields.map((field, index) => {
    return (
      <div css={fieldItemStyle} key={field._key}>
        {hasType ? (
          <>
            <CodeEditor
              mode="TEXT_JS"
              expectedType="String"
              height="32px"
              placeholder="key"
              css={fieldItemKeyStyle}
              value={field.key}
              onChange={(v) => {
                onChange?.({ ...field, key: v })
                autoAddField(index)
              }}
            />
            <Select
              colorScheme="techPurple"
              value={field.type}
              options={typeOptions}
              css={fieldItemTypeStyle}
              size="small"
              onChange={(v) => {
                onChange?.({ ...field, type: v })
                autoAddField(index)
              }}
            />
          </>
        ) : (
          <CodeEditor
            mode="TEXT_JS"
            expectedType="String"
            height="32px"
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.param_key",
            )}
            value={field.key}
            css={fieldItemKeyStyle}
            onChange={(v) => {
              onChange?.({ ...field, key: v })
              autoAddField(index)
            }}
          />
        )}

        <CodeEditor
          mode="TEXT_JS"
          expectedType="String"
          height="32px"
          placeholder={t(
            "editor.action.resource.rest_api.placeholder.param_value",
          )}
          value={field.value}
          css={fieldItemValueStyle}
          onChange={(v) => {
            onChange?.({ ...field, value: v })
            autoAddField(index)
          }}
        />
        <div
          css={deleteIconWrapperStyle}
          onClick={() => {
            onRemove?.(field._key)
          }}
        >
          <DeleteIcon size="12px" />
        </div>
      </div>
    )
  })

  return (
    <div>
      {fieldList}
      {!autoNewField && (
        <Button
          variant="text"
          size="medium"
          colorScheme="techPurple"
          leftIcon={<AddIcon />}
          _css={newButtonStyle}
          onClick={onAdd}
        >
          {t("editor.action.panel.btn.new")}
        </Button>
      )}
    </div>
  )
}

FieldArray.displayName = "FieldArray"
