import {
  ArrayFieldTemplateItemType,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import { Col, Row } from "@illa-design/react"
import { arrayItemStyle, buttonGroupStyle } from "./style"

export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: ArrayFieldTemplateItemType<T, S, F>) {
  const {
    children,
    disabled,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    hasToolbar,
    index,
    onCopyIndexClick,
    onDropIndexClick,
    onReorderClick,
    readonly,
    registry,
    uiSchema,
  } = props
  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates
  const { toolbarAlign = "top" } = registry.formContext

  return (
    <Row align={toolbarAlign} key={`array-item-${index}`} css={arrayItemStyle}>
      <Col flex="1">{children}</Col>
      {hasToolbar && (
        <Col flex="192px" style={{ marginLeft: "16px" }}>
          <div css={buttonGroupStyle}>
            {(hasMoveUp || hasMoveDown) && (
              <MoveUpButton
                disabled={disabled || readonly || !hasMoveUp}
                onClick={onReorderClick(index, index - 1)}
                uiSchema={uiSchema}
                registry={registry}
              />
            )}
            {(hasMoveUp || hasMoveDown) && (
              <MoveDownButton
                disabled={disabled || readonly || !hasMoveDown}
                onClick={onReorderClick(index, index + 1)}
                uiSchema={uiSchema}
                registry={registry}
              />
            )}
            {hasCopy ? (
              <CopyButton
                disabled={disabled || readonly}
                onClick={onCopyIndexClick(index)}
                uiSchema={uiSchema}
                registry={registry}
              />
            ) : null}
            {hasRemove && (
              <RemoveButton
                disabled={disabled || readonly}
                onClick={onDropIndexClick(index)}
                uiSchema={uiSchema}
                registry={registry}
              />
            )}
          </div>
        </Col>
      )}
    </Row>
  )
}
