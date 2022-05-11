import { UseControllerProps } from "react-hook-form"
import { InputProps, PasswordProps } from "@illa-design/input"
import { MySQLFormValues } from "../MySQL/interface"

export type BaseInputProps = UseControllerProps<MySQLFormValues> &
  InputProps & {
    inputType?: string
    errorMessage?: string
  }
