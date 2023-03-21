import { ReactComponent as PdfWidgetIcon } from "@/assets/widgetCover/pdf.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { DefaultCenter, DefaultMarkers } from "./content"

export const MAP_WIDGET_CONFIG: WidgetConfig = {
  type: "MAP_WIDGET",
  displayName: "map",
  widgetName: i18n.t("widget.map.name"), // TODO
  icon: <PdfWidgetIcon />,
  keywords: ["MAP", "地图"],
  sessionType: "PRESENTATION",
  w: 40,
  h: 50,
  defaults: {
    latitudeFieldName: "lat",
    longitudeFieldName: "lng",
    hidden: false,
    center: `{{${DefaultCenter}}}`,
    zoom: "{{3}}",
    markers: `{{${DefaultMarkers}}}`,
    loading: "{{false}}",
    enableAddMark: "{{true}}",
    enableSearch: "{{true}}",
    enableClustering: false,
  },
}
