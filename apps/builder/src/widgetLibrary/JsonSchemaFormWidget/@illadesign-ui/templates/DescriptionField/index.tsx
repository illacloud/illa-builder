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
  F extends FormContextType = any,
>(props: DescriptionFieldProps<T, S, F>) {
  const { id, description } = props
  if (!description) {
    return null
  }
  return (
    <span id={id} css={descriptionStyle}>
      {description}
    </span>
  )
}
