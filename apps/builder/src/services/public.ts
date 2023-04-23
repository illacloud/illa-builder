import { builderRequest } from "@/api/http"
import { BuilderCardInfo } from "@/page/Member/interface"

export const getBuilderDesc = () => {
  return builderRequest<BuilderCardInfo>(
    {
      method: "get",
      url: `/builder/desc`,
    },
    {
      needTeamID: true,
    },
  )
}
