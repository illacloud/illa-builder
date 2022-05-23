import { HTMLAttributes } from "react"
import { Control, FieldArrayPath } from "react-hook-form"
import { RESTAPIFormValues } from "../interface"

export interface ParamListProps extends HTMLAttributes<HTMLDivElement> {
  name: FieldArrayPath<RESTAPIFormValues>,
  control: Control<RESTAPIFormValues>,
}
