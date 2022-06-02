import { HTMLAttributes } from "react"
import { ComponentModel } from "@/wrappedComponents/interface"
import { SessionType } from "@/wrappedComponents/ComponentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: string
  children: ComponentModel[]
}

export type TypeMapComponent = {
  [key in SessionType]: ComponentModel[]
}
