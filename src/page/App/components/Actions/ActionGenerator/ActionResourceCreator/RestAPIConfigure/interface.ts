import {
  Resource,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/resourceState"
import { Control, FieldErrors, UseFormWatch } from "react-hook-form"

export interface RESTAPIConfigureProps {
  resourceId?: string
  onSubmit?: (data: Partial<Resource<RestApiResource<RestApiAuth>>>) => void
}

export type Params = {
  key: string
  value: string
}

export interface RESTAPIConfigureValues extends RestApiResource<RestApiAuth> {
  resourceName: string
}

interface BaseAuthProps<T> {
  control: Control<T>
  watch: UseFormWatch<T>
  errors?: FieldErrors
}

export interface BasicAuthProps extends BaseAuthProps<RESTAPIConfigureValues> {}

export interface BearerAuthProps
  extends BaseAuthProps<RESTAPIConfigureValues> {}
