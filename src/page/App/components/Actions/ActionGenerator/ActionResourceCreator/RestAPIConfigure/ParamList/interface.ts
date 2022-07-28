import { HTMLAttributes } from "react"
import { Control, FieldArrayPath } from "react-hook-form"
import { RESTAPIConfigureValues } from "../interface"

export interface ParamListProps extends HTMLAttributes<HTMLDivElement> {
  name: FieldArrayPath<RESTAPIConfigureValues>
  control: Control<RESTAPIConfigureValues>
}
