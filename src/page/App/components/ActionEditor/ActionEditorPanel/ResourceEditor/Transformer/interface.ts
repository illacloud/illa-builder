export interface TransformerProps {
  onChange: (value: {
    transformer?: string
    enableTransformer?: boolean
  }) => void
}
