import { debounce } from "lodash-es"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DefaultCenter } from "./content"
import { LatLng } from "./interface"
import { getCenter, getSafeZoom } from "./utils"

export const useCenter = (
  center: string,
  zoom: number,
  latitudeFieldName: string,
  longitudeFieldName: string,
) => {
  const centerChangedRef = useRef<google.maps.MapsEventListener>()
  const zoomChangedRef = useRef<google.maps.MapsEventListener>()
  const mapRef = useRef<google.maps.Map>()

  const [currentCenter, setCurrentCenter] = useState<
    google.maps.LatLng | LatLng
  >(getCenter(center, latitudeFieldName, longitudeFieldName))

  const [currentZoom, setCurrentZoom] = useState<number>(zoom)
  const defaultCenter = useMemo(() => JSON.parse(DefaultCenter), [])
  const handleLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map
      centerChangedRef.current = mapRef.current.addListener(
        "dragend",
        debounce(() => {
          setCurrentCenter(mapRef.current?.getCenter() || defaultCenter)
        }, 200),
      )

      zoomChangedRef.current = mapRef.current.addListener(
        "zoom_changed",
        debounce(() => {
          setCurrentCenter(mapRef.current?.getCenter() || defaultCenter)
        }, 200),
      )
    },
    [defaultCenter],
  )

  const handleUnmount = useCallback(() => {
    zoomChangedRef.current?.remove()
    centerChangedRef.current?.remove()
  }, [])

  useEffect(() => {
    setCurrentCenter(getCenter(center, latitudeFieldName, longitudeFieldName))
  }, [center, latitudeFieldName, longitudeFieldName])

  useEffect(() => {
    const safeZoom = getSafeZoom(zoom)
    setCurrentZoom(safeZoom)
  }, [zoom])

  return {
    map: mapRef.current,
    currentCenter,
    currentZoom,
    setCurrentZoom,
    handleLoad,
    handleUnmount,
  }
}
