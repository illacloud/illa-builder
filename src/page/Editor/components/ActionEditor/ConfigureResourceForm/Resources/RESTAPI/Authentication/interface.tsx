import { Control, FieldErrors, UseFormWatch } from "react-hook-form"
import { RESTAPIFormValues } from "../interface"

interface BaseAuthProps<T> {
  control: Control<T>
  watch: UseFormWatch<T>
  errors?: FieldErrors
}

export interface BasicAuthProps extends BaseAuthProps<RESTAPIFormValues> {}

export interface OAuth2Props extends BaseAuthProps<RESTAPIFormValues> {}
