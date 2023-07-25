import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils"
import { Alert, List } from "@illa-design/react"
import { errorDetailStyle } from "./style"

export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { translateString } = registry
  return (
    <Alert
      showIcon
      type="error"
      title={translateString(TranslatableString.ErrorsLabel)}
      content={
        <List
          data={errors}
          renderKey={(data, index) => {
            return index.toString()
          }}
          render={(error, index) => {
            return (
              <span key={index} css={errorDetailStyle}>
                {error?.stack}
              </span>
            )
          }}
        ></List>
      }
    />
  )
}
