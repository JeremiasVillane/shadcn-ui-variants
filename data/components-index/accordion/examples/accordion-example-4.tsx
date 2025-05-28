"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function AccordionExample4() {
  return (
    <Accordion
      type="multiple"
      variant="separated"
      styleVariant="outline"
      defaultValue={["category"]}
    >
      <AccordionItem value="category">
        <AccordionTrigger>
          <AccordionTitle>Categories</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          <section className="space-y-1">
            {["Electronics", "Books", "Clothing"].map((category, index) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category${index + 1}`} variant="draw" />
                <label
                  htmlFor={`category${index + 1}`}
                  className="cursor-pointer select-none text-sm font-medium leading-none hover:text-foreground"
                >
                  {category}
                </label>
              </div>
            ))}
          </section>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="brand">
        <AccordionTrigger>
          <AccordionTitle>Brand</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          <section className="space-y-1">
            {["BrandA", "BrandB", "BrandC"].map((brand, index) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand${index + 1}`} variant="draw" />
                <label
                  htmlFor={`brand${index + 1}`}
                  className="cursor-pointer select-none text-sm font-medium leading-none hover:text-foreground"
                >
                  {brand}
                </label>
              </div>
            ))}
          </section>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger>
          <AccordionTitle>Price Range</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent className="px-2">
          <Slider
            variant="thin"
            min={0}
            max={200}
            startLabel="$50"
            endLabel="$200"
            withInput
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
