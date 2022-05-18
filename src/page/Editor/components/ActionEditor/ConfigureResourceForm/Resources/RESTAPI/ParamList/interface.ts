import { HTMLAttributes } from "react";
import { Control } from "react-hook-form"

export interface ParamListProps extends HTMLAttributes<HTMLDivElement> {
  name: string,
  control: Control,
}
