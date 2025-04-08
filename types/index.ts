export interface PropDefinition {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
}

export interface ComponentDoc {
  title: string
  name: string
  description: string
  props: PropDefinition[]
}
export type ComponentDocResult =
  | { data: ComponentDoc; error?: undefined }
  | { data?: undefined; error: string }
