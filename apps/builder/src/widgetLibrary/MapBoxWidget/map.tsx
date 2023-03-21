import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Loading } from "@illa-design/react"
import { MapBox } from "@/widgetLibrary/MapBoxWidget/mapBox"
import { DefaultMarkers, DefaultZoom } from "./content"
import { MapWidgetProps, MarkersType, WrappedMapProps } from "./interface"
import { ApplyLoadingStyle, applyMapContainer, applyValidStyle } from "./style"
import { InvalidMessage } from "../PublicSector/InvalidMessage"

export const WrapperMap = forwardRef<HTMLDivElement, WrappedMapProps>(
  (props, ref) => {
    const {
      displayName,
      center,
      markers,
      loading,
      handleUpdateMultiExecutionResult,
      handleOnMarkerCreated,
      handleOnMarkersChanged,
      handleOnMarkerSelect,
    } = props
    const onMarkersChanged = useCallback(
      (markers: unknown) => {
        new Promise((resolve) => {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                markers: markers || DefaultMarkers,
              },
            },
          ])
          resolve(true)
        }).then(() => {
          handleOnMarkersChanged?.()
        })
      },
      [displayName, handleOnMarkersChanged, handleUpdateMultiExecutionResult],
    )
    return (
      <>
        {loading ? (
          <div css={ApplyLoadingStyle}>
            <Loading colorScheme="techPurple" />
          </div>
        ) : (
          <MapBox
            {...props}
            markers={JSON.stringify(markers)}
            center={JSON.stringify(center)}
            onMarkerSelected={handleOnMarkerSelect}
            onMarkerCreated={handleOnMarkerCreated}
            onMarkersChanged={onMarkersChanged}
          />
        )}
      </>
    )
  },
)

WrapperMap.displayName = "WrapperMap"

export const MapWidget: FC<MapWidgetProps> = (props) => {
  const {
    displayName,
    loading,
    markers,
    center,
    zoom = DefaultZoom,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    ...rest
  } = props

  const [message, setValidateMessage] = useState('')

  const checkZoom = useCallback((zoom: number) => {
    if(zoom > 22) {
      setValidateMessage('Need to be less than 22')
    } else if(zoom < 1) {
      setValidateMessage('Need to be greater than 1')
    } else {
      setValidateMessage('')
    }
  }, [])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      setMarkers: (markers: MarkersType) => {
        handleUpdateDsl({ markers })
      },
      resetMarkers: () => {
        handleUpdateDsl({ markers: JSON.parse(DefaultMarkers || "{}") })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, handleUpdateGlobalData, handleDeleteGlobalData, handleUpdateDsl, markers, center, handleUpdateMultiExecutionResult])

  useEffect(() => {
    checkZoom(zoom)
  }, [checkZoom, zoom])

  const handleOnMarkerSelect = useCallback(() => {
    triggerEventHandler("markerSelect")
  }, [triggerEventHandler])

  const handleOnMarkerCreated = useCallback(() => {
    triggerEventHandler("markerCreated")
  }, [triggerEventHandler])

  const handleOnMarkersChanged = useCallback(() => {
    triggerEventHandler("markersChanged")
  }, [triggerEventHandler])

  return (
    <div css={applyMapContainer}>
      <WrapperMap
        markers={markers}
        center={center}
        loading={loading}
        zoom={zoom}
        displayName={displayName}
        handleUpdateDsl={handleUpdateDsl}
        handleUpdateMultiExecutionResult={handleUpdateMultiExecutionResult}
        handleOnMarkerSelect={handleOnMarkerSelect}
        handleOnMarkerCreated={handleOnMarkerCreated}
        handleOnMarkersChanged={handleOnMarkersChanged}
        {...rest}
      />
      <div
      css={applyValidStyle}
      >
        <InvalidMessage validateMessage={message} />
      </div>
    </div>
  )
}

MapWidget.displayName = "MapWidget"
