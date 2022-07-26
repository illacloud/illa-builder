export interface ActionResourceSeletorProps {
  actionType: string
  defaultSelected?: string
  onBack?: () => void
  onCreateResource?: (resbourceType: string) => void
  onCreateAction?: (resourceType: string, resourceId: string) => void
}
