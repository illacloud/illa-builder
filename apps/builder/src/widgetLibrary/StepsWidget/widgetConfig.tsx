import { v4 } from "uuid"
import { ReactComponent as StepsWidgetIcon } from "@/assets/widgetCover/steps.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

const originData = [
  { id: `Steps-${v4()}`, value: "Step 1", label: "Step 1", hidden: false },
  { id: `Steps-${v4()}`, value: "Step 2", label: "Step 2", hidden: false },
  { id: `Steps-${v4()}`, value: "Step 3", label: "Step 3", hidden: true },
  { id: `Steps-${v4()}`, value: "Step 4", label: "Step 4", hidden: false },
]

export const STEPS_WIDGET_CONFIG: WidgetConfig = {
  type: "STEPS_WIDGET",
  displayName: "steps",
  widgetName: i18n.t("widget.step.name"),
  icon: <StepsWidgetIcon />,
  keywords: ["Steps", "步骤"],
  sessionType: "NAVIGATION",
  w: 12,
  h: 7,
  defaults: {
    direction: "vertical",
    alignment: "start",
    linkContainer: false,
    linkWidgetDisplayName: "",
    optionConfigureMode: "static",
    manualOptions: originData,
    viewList: [],
    defaultStep: "Step 1",
    dataSources: `{{${JSON.stringify(originData, null, 2)}}}`,
    resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  },
}
