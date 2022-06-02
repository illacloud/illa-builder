import { HTMLAttributes } from "react"
import { CardInfo } from "@/wrappedComponents/interface"
import { SessionType } from "@/wrappedComponents/ComponentListBuilder"

export interface ComponentPanelProps extends HTMLAttributes<HTMLDivElement> {
  componentList?: ComponentSessionProps[]
}

export type ComponentSessionProps = {
  title: string
  children: CardInfo[]
}

export type TypeMapComponent = {
  [key in SessionType]: CardInfo[]
}

export interface ComponentItemProps extends CardInfo {}
