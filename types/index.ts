export type ComponentRegistryMainData = {
  title: string
  name: string
  description: string
}

export type PropDefinition = {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
}

export type ComponentDoc = {
  props: PropDefinition[]
}

export type ComponentDocResult =
  | { data: ComponentDoc; error?: undefined }
  | { data?: undefined; error: string }
