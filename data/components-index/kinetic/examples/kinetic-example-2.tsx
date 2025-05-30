"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Kinetic } from "@/components/ui/kinetic"

export function KineticExample2() {
  return (
    <Kinetic animation="slideInUp" startOnView once={false} duration={0.6}>
      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </Kinetic>
  )
}
