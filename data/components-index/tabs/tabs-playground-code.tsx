"use client";

import { TabsPlaygroundProps } from "./tabs-playground"

export const tabsPlaygroundCode = ({
  variant,
  numberOfTabs,
  tab1Title,
  tab2Title,
  tab3Title
}: TabsPlaygroundProps) => {
  const tabsCount = Number.parseInt(numberOfTabs)

  let code = `<Tabs defaultValue="${tab1Title}" className="w-full">\n`
  code += `  <TabsList${variant !== "default" ? ` variant="${variant}"` : ""} className="grid w-full grid-cols-${tabsCount}">\n`

  if (tabsCount >= 1) {
    code += `    <TabsTrigger${variant !== "default" ? ` variant="${variant}"` : ""} value="tab1">${tab1Title}</TabsTrigger>\n`
  }
  if (tabsCount >= 2) {
    code += `    <TabsTrigger${variant !== "default" ? ` variant="${variant}"` : ""} value="tab2">${tab2Title}</TabsTrigger>\n`
  }
  if (tabsCount >= 3) {
    code += `    <TabsTrigger${variant !== "default" ? ` variant="${variant}"` : ""} value="tab3">${tab3Title}</TabsTrigger>\n`
  }

  code += `  </TabsList>\n`

  if (tabsCount >= 1) {
    code += `  <TabsContent value="tab1">\n    <div className="p-4 rounded-md bg-muted/50 mt-4">\n      <h3 className="text-lg font-medium">${tab1Title} Content</h3>\n      <p className="text-sm text-muted-foreground mt-2">Content for ${tab1Title} goes here.</p>\n    </div>\n  </TabsContent>\n`
  }
  if (tabsCount >= 2) {
    code += `  <TabsContent value="tab2">\n    <div className="p-4 rounded-md bg-muted/50 mt-4">\n      <h3 className="text-lg font-medium">${tab2Title} Content</h3>\n      <p className="text-sm text-muted-foreground mt-2">Content for ${tab2Title} goes here.</p>\n    </div>\n  </TabsContent>\n`
  }
  if (tabsCount >= 3) {
    code += `  <TabsContent value="tab3">\n    <div className="p-4 rounded-md bg-muted/50 mt-4">\n      <h3 className="text-lg font-medium">${tab3Title} Content</h3>\n      <p className="text-sm text-muted-foreground mt-2">Content for ${tab3Title} goes here.</p>\n    </div>\n  </TabsContent>\n`
  }

  code += `</Tabs>`
  return code
}
