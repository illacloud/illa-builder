import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from "@rjsf/utils"
import { Divider, Heading } from "@illa-design/react"
import { titleFieldStyle } from "./style"

export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({ id, title }: TitleFieldProps<T, S, F>) {
  return (
    <div id={id} css={titleFieldStyle}>
      <Heading level="h5" colorScheme="grayBlue">
        {title}
      </Heading>
      <Divider />
    </div>
  )
}
