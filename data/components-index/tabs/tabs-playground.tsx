"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsProps
} from "@/components/ui/tabs"

export const TabsPlayground = ({ variant }: TabsProps) => {
  return (
    <Tabs variant={variant} defaultValue="tab1Title" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1Title">Being</TabsTrigger>
        <TabsTrigger value="tab2Title">Time</TabsTrigger>
        <TabsTrigger value="tab3Title">Nothingness</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1Title">
        <div className="mt-4 rounded-md bg-muted/50 p-4">
          <h3 className="text-lg font-medium">Ponder your existence</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Did you come into this world to debug AI code? Probably not. But you
            still keep doing it!
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2Title">
        <div className="mt-4 rounded-md bg-muted/50 p-4">
          <h3 className="text-lg font-medium">Tick-tock, tick-tock!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every second that passes is one less second to worry about the
            future... or to enjoy the present!
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3Title">
        <div className="mt-4 rounded-md bg-muted/50 p-4">
          <h3 className="text-lg font-medium">Nothing nothings</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            One day we will return to the glorious state of non-existence. Enjoy
            it while you can or not! The decision is... well, it doesn't matter,
            does it?
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
