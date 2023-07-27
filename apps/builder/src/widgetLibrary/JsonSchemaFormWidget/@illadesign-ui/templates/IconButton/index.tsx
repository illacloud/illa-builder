import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils"
import {
  AddIcon,
  Button,
  CopyIcon,
  DeleteIcon,
  DownIcon,
  UpIcon,
} from "@illa-design/react"
import { iconButtonStyle } from "./style"

export function IconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: IconButtonProps<T, S, F>) {
  const { icon, ...otherProps } = props
  return (
    <Button {...otherProps} leftIcon={icon}>
      {props.title}
    </Button>
  )
}

export function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({ registry, ...props }: IconButtonProps<T, S, F>) {
  const { formContext } = registry
  return (
    <Button
      leftIcon={<AddIcon />}
      {...props}
      css={iconButtonStyle}
      colorScheme={formContext?.themeColor}
    />
  )
}

export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { formContext },
  } = props
  return (
    <Button
      leftIcon={<CopyIcon />}
      {...props}
      css={iconButtonStyle}
      colorScheme={formContext?.themeColor}
    />
  )
}

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { formContext },
  } = props
  return (
    <Button
      leftIcon={<DownIcon />}
      {...props}
      css={iconButtonStyle}
      colorScheme={formContext?.themeColor}
    />
  )
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { formContext },
  } = props
  return (
    <Button
      leftIcon={<UpIcon />}
      {...props}
      css={iconButtonStyle}
      colorScheme={formContext?.themeColor}
    />
  )
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: IconButtonProps<T, S, F>) {
  return (
    <Button
      colorScheme="red"
      leftIcon={<DeleteIcon />}
      {...props}
      css={iconButtonStyle}
    />
  )
}
