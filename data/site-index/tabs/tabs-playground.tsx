"use client"

import React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsVariant
} from "@/components/ui/tabs"

export interface TabsPlaygroundProps {
  variant: TabsVariant
  numberOfTabs: string
  tab1Title: string
  tab2Title: string
  tab3Title: string
}

export const TabsPlayground = ({
  variant,
  numberOfTabs,
  tab1Title,
  tab2Title,
  tab3Title
}: TabsPlaygroundProps) => {
  const tabsCount = Number.parseInt(numberOfTabs)

  return (
    <Tabs variant={variant} defaultValue={tab1Title} className="w-full">
      <TabsList>
        {tabsCount >= 1 && (
          <TabsTrigger value={tab1Title}>{tab1Title}</TabsTrigger>
        )}
        {tabsCount >= 2 && (
          <TabsTrigger value={tab2Title}>{tab2Title}</TabsTrigger>
        )}
        {tabsCount >= 3 && (
          <TabsTrigger value={tab3Title}>{tab3Title}</TabsTrigger>
        )}
      </TabsList>
      {tabsCount >= 1 && (
        <TabsContent value={tab1Title}>
          <div className="mt-4 rounded-md bg-muted/50 p-4">
            <h3 className="text-lg font-medium">{tab1Title} Content</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Content for {tab1Title} goes here.
            </p>
          </div>
        </TabsContent>
      )}
      {tabsCount >= 2 && (
        <TabsContent value={tab2Title}>
          <div className="mt-4 rounded-md bg-muted/50 p-4">
            <h3 className="text-lg font-medium">{tab2Title} Content</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Content for {tab2Title} goes here.
            </p>
          </div>
        </TabsContent>
      )}
      {tabsCount >= 3 && (
        <TabsContent value={tab3Title}>
          <div className="mt-4 rounded-md bg-muted/50 p-4">
            <h3 className="text-lg font-medium">{tab3Title} Content</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Content for {tab3Title} goes here.
            </p>
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}
