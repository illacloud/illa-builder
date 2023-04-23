export interface SearchHeaderProps {
  onSearch: (value: string) => void
  activeTab: string
  handleClickChangeTab: (activeKey: string) => void
}
