import actions from "@/config/template/Dashboard/actions.json"
import appConfig from "@/config/template/Dashboard/appConfig.json"
import data from "@/config/template/Dashboard/data.json"
import resources from "@/config/template/Dashboard/resources.json"
import { TemplateActions, TemplateResources } from "@/config/template/interface"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"

export const DASHBOARD_APP_CONFIG = appConfig

export const DASHBOARD_TEMPLATE_RESOURCES = resources as TemplateResources

export const DASHBOARD_TEMPLATE_ACTIONS = actions as TemplateActions

export const DASHBOARD_DATA = data as unknown as CurrentAppResp
