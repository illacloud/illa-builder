import { AppInfoShape } from "@illa-public/public-types"

export const DashboardAppInitialState: AppInfoShape = {
  updatedAt: "",
  updatedBy: "",
  appId: "",
  appName: "",
  deployed: false,
  config: {
    public: false,
    waterMark: false,
    publishedToMarketplace: false,
    publishWithAIAgent: false,
  },
  appActivity: {
    modifier: "",
    modifiedAt: "",
  },
}
