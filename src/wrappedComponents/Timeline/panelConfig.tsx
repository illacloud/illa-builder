import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"

const baseWidgetName = "timeline"
export const TIMELINE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: "BASIC",
    children: [
      {
        id: `${baseWidgetName}-items`,
        labelName: "Items",
        attrName: "items",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-direction`,
        labelName: "Direction",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: ["vertical", "horizontal"],
      },
      {
        id: `${baseWidgetName}-pending`,
        labelName: "Pending",
        attrName: "pending",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "text-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "text-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
      },
    ],
  },
]
