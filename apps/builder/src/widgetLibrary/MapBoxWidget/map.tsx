import { FC, useCallback, useEffect, useState } from "react"
import { Loading } from "@illa-design/react"
import { MapBox } from "@/widgetLibrary/MapBoxWidget/mapBox"
import { InvalidMessage } from "../PublicSector/InvalidMessage"
import { DefaultMarkers, DefaultZoom } from "./content"
import { MapWidgetProps, WrappedMapProps } from "./interface"
import { ApplyLoadingStyle, applyMapContainer, applyValidStyle } from "./style"

export const WrapperMap: FC<WrappedMapProps> = (props) => {
  const {
    displayName,
    center,
    markers,
    loading,
    handleUpdateMultiExecutionResult,
    handleOnMarkerCreated,
    handleOnMarkerSelect,
  } = props
  const onMarkersChanged = useCallback(
    (markers: unknown) => {
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              markers: markers || [],
            },
          },
        ])
        resolve(true)
      })
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const onMarkerSelect = useCallback(
    (selectMarker: unknown) => {
      new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              selectMarker: selectMarker || "",
            },
          },
        ])
        resolve(true)
      }).then(() => {
        handleOnMarkerSelect?.()
      })
    },
    [displayName, handleOnMarkerSelect, handleUpdateMultiExecutionResult],
  )
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loading ? (
        <div css={ApplyLoadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      ) : (
        <MapBox
          {...props}
          markers={JSON.stringify(markers)}
          center={JSON.stringify(center)}
          onMarkerSelected={onMarkerSelect}
          onMarkerCreated={handleOnMarkerCreated}
          onMarkersChanged={onMarkersChanged}
        />
      )}
    </div>
  )
}

WrapperMap.displayName = "WrapperMap"

export const MapWidget: FC<MapWidgetProps> = (props) => {
  const {
    displayName,
    loading,
    markers,
    center,
    zoom = DefaultZoom,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    ...rest
  } = props

  const [message, setValidateMessage] = useState("")

  const checkZoom = useCallback((zoom: number) => {
    if (zoom > 22) {
      setValidateMessage("Need to be less than 22")
    } else if (zoom < 1) {
      setValidateMessage("Need to be greater than 1")
    } else {
      setValidateMessage("")
    }
  }, [])

  useEffect(() => {
    updateComponentRuntimeProps({
      setMarkers: (markers: unknown) => {
        if (!Array.isArray(markers)) {
          console.error("TypeError: value is not a boolean")
          return
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { markers },
          },
        ])
      },
      resetMarkers: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: { markers: JSON.parse(DefaultMarkers || "{}") },
          },
        ])
      },
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    displayName,
  ])

  useEffect(() => {
    checkZoom(zoom)
  }, [checkZoom, zoom])

  const handleOnMarkerSelect = useCallback(() => {
    triggerEventHandler("markerSelected")
  }, [triggerEventHandler])

  const handleOnMarkerCreated = useCallback(() => {
    triggerEventHandler("markerCreated")
  }, [triggerEventHandler])

  return (
    <div css={applyMapContainer}>
      <WrapperMap
        markers={markers}
        center={center}
        loading={loading}
        zoom={zoom}
        displayName={displayName}
        handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
        handleOnMarkerSelect={handleOnMarkerSelect}
        handleOnMarkerCreated={handleOnMarkerCreated}
        {...rest}
      />
      <div css={applyValidStyle}>
        <InvalidMessage validateMessage={message} />
      </div>
    </div>
  )
}

MapWidget.displayName = "MapWidget"
export default MapWidget
