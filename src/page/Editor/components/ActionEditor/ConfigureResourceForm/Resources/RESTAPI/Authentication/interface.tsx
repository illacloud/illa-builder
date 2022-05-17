import { Control, FieldErrors } from "react-hook-form"
import { RESTAPIFormValues } from "../interface"

interface BaseAuthProps {
  control?: Control<any>
  errors?: FieldErrors
}

export interface BasicAuthProps extends BaseAuthProps {

}

export interface OAuth2Props extends BaseAuthProps {

}
