import { HTMLAttributes } from "react"
import { ComponentModel } from "@/wrappedComponents/interface"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: string
  children: ComponentModel[]
}
