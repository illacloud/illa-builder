import { BaseSetter } from "@/page/App/components/InspectPanel/PanelSetters/interface"

export type URLModeInputProps = Pick<
  BaseSetter,
  "attrName" | "handleUpdateDsl" | "widgetDisplayName" | "widgetType"
> & { value: string }
