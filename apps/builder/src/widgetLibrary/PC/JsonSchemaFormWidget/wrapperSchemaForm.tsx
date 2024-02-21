import FormRef from "@rjsf/core"
import validator from "@rjsf/validator-ajv8"
import { forwardRef } from "react"
import { Form } from "./@illadesign-ui"
import { WrapperSchemaFormProps } from "./interface"
import { formGlobalStyle } from "./style"

export const WrapperSchemaForm = forwardRef<FormRef, WrapperSchemaFormProps>(
  (
    {
      JSONSchema,
      UISchema,
      formData,
      themeColor,
      submitButtonFullWidth,
      submitButtonText,
      hiddenSubmitButton,
      disabled,
      handleOnChange,
      handleOnSubmit,
    },
    ref,
  ) => {
    if (
      !JSONSchema ||
      (JSONSchema.type !== "object" && JSONSchema.type !== "array")
    ) {
      return null
    }
    return (
      <Form
        ref={ref}
        disabled={disabled}
        css={formGlobalStyle}
        formContext={{
          themeColor,
          submitButtonFullWidth,
          submitButtonText,
          hiddenSubmitButton,
        }}
        schema={JSONSchema || {}}
        validator={validator}
        uiSchema={UISchema || {}}
        formData={formData}
        onChange={(v) => handleOnChange && handleOnChange(v.formData)}
        onSubmit={handleOnSubmit}
      />
    )
  },
)

WrapperSchemaForm.displayName = "WrapperSchemaForm"
