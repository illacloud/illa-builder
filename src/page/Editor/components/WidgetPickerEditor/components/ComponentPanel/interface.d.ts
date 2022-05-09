import { HTMLAttributes, ReactNode } from "react"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentModel = {
  name: string
  itemType: string
  icon: string | ReactNode // url
}

export type ComponentSessionProps = {
  title: string
  children: ComponentModel[]
}
