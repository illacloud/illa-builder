export interface DashboardContentHeaderProps {
  icon: string
  name: string
  onCreate: () => void
  onInvite: () => void
  canCreate: boolean
  isCreateLoading: boolean
}
