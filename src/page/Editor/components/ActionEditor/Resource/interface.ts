import { MySQLConfigureValues, MySQLParamValues } from "./MySQL"
import { RESTAPIConfigureValues, RESTAPIParamValues } from "./RESTAPI"

export type ConfigureValues = MySQLConfigureValues | RESTAPIConfigureValues
export type ParamValues = MySQLParamValues | RESTAPIParamValues
