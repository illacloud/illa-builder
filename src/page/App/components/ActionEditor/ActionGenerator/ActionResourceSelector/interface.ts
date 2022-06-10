export interface ActionResourceSeletorProps {
  resourceType: string
  defaultSelectedResourceId?: string
  onBack?: () => void
  onCreateResource?: (resbourceType: string) => void
  onCreateAction?: (resourceType: string, resourceId: string) => void
}
