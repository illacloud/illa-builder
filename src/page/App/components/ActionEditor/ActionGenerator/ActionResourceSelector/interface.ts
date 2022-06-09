export interface ActionResourceSeletorProps {
  resourceType: string
  onBack?: () => void
  onCreateResource?: () => void
  onCreateAction?: (resourceType: string, resourceId: string) => void
}
