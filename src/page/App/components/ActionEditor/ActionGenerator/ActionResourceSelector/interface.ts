export interface ActionResourceSeletorProps {
  resourceType: string
  defaultSelectedResourceId?: string
  createNewWithoutVerify: boolean
  onBack?: () => void
  onCreateResource?: (resbourceType: string) => void
  onCreateAction?: (resourceType: string, resourceId: string) => void
}
