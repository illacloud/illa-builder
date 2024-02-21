import { CustomLatLing, LatLng, MarkersType } from "./interface"

export const getMarkers = (
  markers: MarkersType,
  latitudeFieldName: string,
  longitudeFieldName: string,
): LatLng[] => {
  if (latitudeFieldName !== "lat" || longitudeFieldName !== "lng") {
    return (markers as CustomLatLing[]).map((item) => {
      const lat = item["lat"] ?? item[latitudeFieldName]
      const lng = item["lng"] ?? item[longitudeFieldName]
      return { lat, lng }
    })
  }
  return markers as LatLng[]
}

export const getCenter = (
  center: string,
  latitudeFieldName: string,
  longitudeFieldName: string,
): LatLng => {
  const strCenter = JSON.parse(center || "{}")
  if (latitudeFieldName !== "lat" || longitudeFieldName !== "lng") {
    const lat =
      strCenter["lat"] ?? (strCenter as CustomLatLing)[latitudeFieldName]
    const lng =
      strCenter["lng"] ?? (strCenter as CustomLatLing)[longitudeFieldName]
    return { lat, lng }
  }
  return strCenter as LatLng
}

export const getSafeZoom = (zoom: number) => {
  if (zoom > 22) {
    return 22
  } else if (zoom < 1) {
    return 1
  }
  return zoom
}
