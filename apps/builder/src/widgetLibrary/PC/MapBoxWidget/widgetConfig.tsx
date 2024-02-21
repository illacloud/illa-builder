import MapWidgetIcon from "@/assets/widgetCover/map.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"
import { DefaultCenter, DefaultMarkers } from "./content"

export const MAP_WIDGET_CONFIG: WidgetConfig = {
  type: "MAP_WIDGET",
  displayName: "map",
  widgetName: i18n.t("widget.map.name"),
  icon: <MapWidgetIcon />,
  keywords: ["MAP", "地图"],
  sessionType: "PRESENTATION",
  w: 20,
  h: 50,
  version: 0,
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
    selectMarker: "{{{}}}",
  },
}
