import { useEffect, useState } from "react"
import { LatLng } from "./interface"
import { getMarkers } from "./utils"

export const useMark = (
  markers: string,
  latitudeFieldName: string,
  longitudeFieldName: string,
) => {
  const tempMarks = JSON.parse(markers || "[]")
  const [currentMarks, setCurrentMarks] = useState<LatLng[]>(
    getMarkers(tempMarks, latitudeFieldName, longitudeFieldName),
  )

  const addMark = (lat: number, lng: number) => {
    const marks = [...currentMarks, { lat, lng }]
    setCurrentMarks(marks)
  }

  useEffect(() => {
    const currentMarkers = getMarkers(
      JSON.parse(markers || "[]"),
      latitudeFieldName,
      longitudeFieldName,
    )
    setCurrentMarks(currentMarkers)
  }, [latitudeFieldName, longitudeFieldName, markers])
  return {
    currentMarks,
    addMark,
  }
}
