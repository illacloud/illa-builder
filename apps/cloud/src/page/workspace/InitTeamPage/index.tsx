import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const InitTeamPage: FC = () => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  return currentTeamInfo ? (
    <Navigate to={`/workspace/${currentTeamInfo.identifier}/apps`} />
  ) : (
    <Navigate to={`/404`} />
  )
}

InitTeamPage.displayName = "InitTeamPage"
export default InitTeamPage
