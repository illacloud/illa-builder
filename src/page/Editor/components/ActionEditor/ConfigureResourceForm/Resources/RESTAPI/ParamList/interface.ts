import { HTMLAttributes } from "react"
import { Params } from "../interface"

export interface ParamListProps extends HTMLAttributes<HTMLDivElement> {
  value: Params[]
}
