import { ReactComponent as CascaderWidgetIcon } from "@/assets/widgetCover/cascader.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const CASCADER_WIDGET_CONFIG: WidgetConfig = {
  type: "CASCADER_WIDGET",
  displayName: "cascader",
  widgetName: i18n.t("widget.cascader.name"),
  keywords: ["cascader", "级联选择"],
  icon: <CascaderWidgetIcon />,
  sessionType: "SELECT",
  w: 12,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    dataSourceJS: `{{[
  {
    value: "media_source_1",
    label: "Media Source 1",
    children: [
      {
        value: "campaign_1-1",
        label: "campaign 1-1",
      },
      {
        value: "campaign_1-2",
        label: "campaign 1-2",
      },
      {
        value: "campaign_1-3",
        label: "campaign 1-3",
        disabled: true,
      }
      ]
  },
  {
    value: "media_source_2",
    label: "Media Source 2",
    children: [
      {
        value: "campaign_2-1",
        label: "campaign 2-1",
      },
      {
        value: "campaign_2-2",
        label: "campaign 2-2",
      },
      {
        value: "campaign_2-3",
        label: "campaign 2-3"
      }
      ]
  }
]}}`,
    value: `{{["media_source_1","campaign_1-1"]}}`,
    placeholder: "",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    dataSourceMode: "dynamic",
    expandTrigger: "click",
  },
}
