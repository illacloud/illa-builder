import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
  getSubmitButtonOptions,
} from "@rjsf/utils"
import { Button } from "@illa-design/react"

export default function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: SubmitButtonProps<T, S, F>) {
  const { uiSchema } = props
  const { formContext } = props.registry
  const {
    submitText,
    norender,
    props: submitButtonProps,
  } = getSubmitButtonOptions(uiSchema)
  if (formContext?.hiddenSubmitButton || norender) {
    return null
  }
  return (
    <Button
      mt="24px"
      type="submit"
      fullWidth={formContext?.submitButtonFullWidth}
      colorScheme={formContext?.themeColor}
      {...submitButtonProps}
    >
      {formContext?.submitButtonText || submitText}
    </Button>
  )
}
