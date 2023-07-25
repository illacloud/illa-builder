import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import { descriptionStyle } from "./style"

export default function DescriptionField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: DescriptionFieldProps<T, S, F>) {
  const { id, description } = props
  if (!description) {
    return null
  }
  return (
    <div id={id} css={descriptionStyle}>
      {description}
    </div>
  )
}
