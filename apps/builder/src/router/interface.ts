import { RouteObject } from "react-router-dom"

export type RoutesObjectPro = RouteObject & {
  /**
   * @description need login, if use check role,can replace this
   */
  needLogin?: boolean
  /**
   * @description child route
   */
  children?: RoutesObjectPro[]
  accessByMobile?: boolean
}
