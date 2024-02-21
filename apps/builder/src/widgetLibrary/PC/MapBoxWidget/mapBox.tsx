import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api"
import { FC, useEffect } from "react"
import { SearchInput } from "./SearchInput"
import {
  ContainerStyle,
  DefaultCenter,
  DefaultZoom,
  LatitudeFieldName,
  Libraries,
  LongitudeFieldName,
} from "./content"
import { LatLng, MapProps } from "./interface"
import { useCenter } from "./useCenter"
import { useMark } from "./useMark"

export const MapBox: FC<MapProps> = ({
  center = DefaultCenter,
  latitudeFieldName = LatitudeFieldName,
  longitudeFieldName = LongitudeFieldName,
  zoom = DefaultZoom,
  markers = "",
  enableAddMark = true,
  enableSearch = true,
  enableClustering = false,
  onMarkerSelected,
  onMarkerCreated,
  onMarkersChanged,
}) => {
  const { currentMarks, addMark } = useMark(
    markers,
    latitudeFieldName,
    longitudeFieldName,
  )
  const {
    map,
    currentCenter,
    currentZoom,
    handleLoad,
    handleUnmount,
    setCurrentZoom,
  } = useCenter(center, zoom, latitudeFieldName, longitudeFieldName)
  const mapClick = (e: google.maps.MapMouseEvent) => {
    if (!enableAddMark) return
    const { latLng } = e
    const lat = latLng?.lat(),
      lng = latLng?.lng()
    if (lat !== undefined && lng !== undefined) {
      addMark(lat, lng)
      onMarkerCreated && onMarkerCreated({ lat, lng })
    }
  }
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.ILLA_GOOGLE_MAP_KEY,
    libraries: Libraries,
  })

  const handlePlaceChanged = (location: google.maps.LatLngLiteral) => {
    map?.panTo(location)
    setCurrentZoom(8)
  }

  useEffect(() => {
    onMarkersChanged && onMarkersChanged(currentMarks)
  }, [currentMarks, onMarkersChanged])

  if (!isLoaded) return null
  return (
    <GoogleMap
      mapContainerStyle={ContainerStyle}
      center={currentCenter}
      zoom={currentZoom}
      onClick={mapClick}
      onLoad={handleLoad}
      onUnmount={handleUnmount}
    >
      {enableSearch && <SearchInput onPlaceChanged={handlePlaceChanged} />}
      {enableClustering && (
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {(clusterer) => (
            <div>
              {currentMarks &&
                currentMarks.map(
                  ({ lat, lng }: LatLng, i: number) =>
                    lat !== undefined &&
                    lng !== undefined && (
                      <Marker
                        key={`${i}${lat}${lng}`}
                        position={{ lat, lng }}
                        clusterer={clusterer}
                        onClick={() => {
                          onMarkerSelected && onMarkerSelected({ lat, lng })
                        }}
                      />
                    ),
                )}
            </div>
          )}
        </MarkerClusterer>
      )}
      {!enableClustering &&
        currentMarks &&
        currentMarks.map(
          ({ lat, lng }: LatLng, i: number) =>
            lat !== undefined &&
            lng !== undefined && (
              <Marker
                key={`${i}${lat}${lng}`}
                position={{ lat, lng }}
                onClick={() => {
                  onMarkerSelected && onMarkerSelected({ lat, lng })
                }}
              />
            ),
        )}
    </GoogleMap>
  )
}

MapBox.displayName = "MapBox"
