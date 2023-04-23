import i18n from "@/i18n/config"
import { ComponentPanel } from "@/page/App/components/ComponentPanel"
import { ConfigPanel } from "@/page/App/components/ConfigPanel"
import { PagePanel } from "@/page/App/components/PagePanel"
import { SimpleTabsItem } from "./interface"

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

export const ACTION_LIST_TABS: SimpleTabsItem[] = [
  {
    key: "actionList",
    title: i18n.t("editor.action.action_list.title"),
  },
  // {
  //   key: "pageTrigger",
  //   title: i18n.t("editor.action.panel.label.advanced.page_trigger"),
  // },
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
