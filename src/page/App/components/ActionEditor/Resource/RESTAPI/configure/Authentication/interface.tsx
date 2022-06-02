import { Control, FieldErrors, UseFormWatch } from "react-hook-form"
import { RESTAPIConfigureValues } from "@/page/App/components/ActionEditor/Resource/RESTAPI"

interface BaseAuthProps<T> {
  control: Control<T>
  watch: UseFormWatch<T>
  errors?: FieldErrors
}

export interface BasicAuthProps extends BaseAuthProps<RESTAPIConfigureValues> {}

export interface OAuth2Props extends BaseAuthProps<RESTAPIConfigureValues> {}
