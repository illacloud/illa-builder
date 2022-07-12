import { HTMLAttributes } from "react"
import { TypeQueryResult } from "tern/lib/tern"

export interface TernTypeQueryResult {
  type: string
  guess: boolean
  name?: string
  exprName?: string
  doc?: string
  url?: string
  origin?: string
}

export interface HintTooltipProps extends HTMLAttributes<HTMLDivElement> {
  data: TypeQueryResult
  globalData?: { [key: string]: any }
}

export interface TransQuery {
  type: string
  name?: string
  doc?: string
  url?: string
  path?: string
  data?: any
}
