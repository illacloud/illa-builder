import { RouteObject } from "react-router-dom"

export type ILLARoutesObject = RouteObject & {
  /**
   * @description child route
   */
  children?: ILLARoutesObject[]
  /**
   * @description need login
   */
  needLogin?: boolean
}
