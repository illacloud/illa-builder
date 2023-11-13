import { lazy } from "react"
import i18n from "@/i18n/config"
import ComponentPanel from "@/page/App/components/ComponentPanel"
import { SimpleTabsItem } from "./interface"

const ConfigPanel = lazy(() => import("@/page/App/components/ConfigPanel"))
const PagePanel = lazy(() => import("@/page/App/components/PagePanel"))

export const ACTION_PANEL_TABS: SimpleTabsItem[] = [
  {
    key: "general",
    title: i18n.t("editor.action.resource.db.title.general_option"),
  },
  {
    key: "advanced",
    title: i18n.t("editor.action.panel.label.advanced.advanced"),
  },
]

export const COMPONENT_MANAGER_TABS: SimpleTabsItem[] = [
  {
    key: "Page",
    title: i18n.t("editor.page.tab_title"),
    element: <PagePanel />,
  },
  {
    key: "Inspect",
    title: i18n.t("editor.inspect.tab_title"),
    element: <ConfigPanel />,
  },
  {
    key: "Insert",
    title: i18n.t("editor.widget_picker.tab_title"),
    element: <ComponentPanel />,
  },
]
