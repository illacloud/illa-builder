import {HTMLAttributes} from "react";

export interface AppCardActionItemProps extends HTMLAttributes<HTMLDivElement> {
  appId: string
  appName: string
  canEditApp: boolean
  isDeploy: boolean
  isPublic: boolean
  isContributed: boolean
}
