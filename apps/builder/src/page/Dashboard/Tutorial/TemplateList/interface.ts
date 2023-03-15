import { TemplateSetting } from "@/config/template/interface"

export interface TemplateListProps {
  data: TemplateSetting[]
  loading: boolean
  setLoading: (loading: boolean) => void
}
