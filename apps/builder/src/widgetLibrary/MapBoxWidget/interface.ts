import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import {
  BaseComponentNodeProps,
  BaseWidgetProps,
} from "@/widgetLibrary/interface"
import { ValidateMessageOldProps } from "../PublicSector/InvalidMessage/interface"

export interface MapProps {
  center?: string
  latitudeFieldName?: string
  longitudeFieldName?: string
  zoom?: number
  markers?: string
  enableAddMark?: boolean
  enableSearch?: boolean
  enableClustering?: boolean
  onMarkerSelected?: (latLng: LatLng) => void
  onMarkerCreated?: (latLng: LatLng) => void
  onMarkersChanged?: (marks: LatLng[]) => void
}

export interface WrappedMapProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<MapProps, "center" | "zoom"> {
  displayName: string
  markers?: MarkersType
  loading?: boolean
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnMarkerCreated?: () => void
  handleOnMarkerSelect?: () => void
}

export interface MapWidgetProps
  extends WrappedMapProps,
    BaseWidgetProps,
    TooltipWrapperProps,
    BaseComponentNodeProps {}

export interface SearchInputProps {
  onPlaceChanged: (location: google.maps.LatLngLiteral) => void
}
export type LatLng = google.maps.LatLngLiteral
export interface CustomLatLing {
  [key: string]: number
}
export type MarkersType = LatLng[] | CustomLatLing[]
