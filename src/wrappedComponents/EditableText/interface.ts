import LabelProps from "../Label/interface"
import { ValidateMessageProps } from "../InvalidMessage/interface"
import { WrappedInputProps } from "../Input/interface"

export interface WrapperEditableTextProps
  extends WrappedInputProps,
    LabelProps,
    ValidateMessageProps {}
