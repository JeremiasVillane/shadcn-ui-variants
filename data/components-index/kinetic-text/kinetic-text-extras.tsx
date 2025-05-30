import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  KineticTextExample1,
  KineticTextExample2,
  KineticTextExample3,
  KineticTextExample4
} from "./examples"

export async function KineticTextExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/kinetic-text/examples/kinetic-text-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        <InlineCode>KineticText</InlineCode> is designed to bring text to life
        by applying a wide range of animations to individual segments of a
        string—be it entire blocks of text, separate lines, words, or even
        single characters. This allows for sophisticated typographic effects
        that can enhance user engagement, guide attention, or simply add a
        polished, dynamic feel to your application.
      </P>

      <H2 id="functioning">Functioning</H2>

      <H2 id="examples">Examples</H2>

      <List variant="numbered">
        <ListItem>
          <Strong>Segmentation</Strong>: You provide a text string as the
          <InlineCode>children</InlineCode> prop. The{" "}
          <InlineCode>by</InlineCode> prop (values:{" "}
          <InlineCode>"text"</InlineCode>, <InlineCode>"line"</InlineCode>,{" "}
          <InlineCode>"word"</InlineCode>,<InlineCode>"character"</InlineCode>)
          tells <InlineCode>KineticText</InlineCode> how to break this string
          down into smaller, animatable segments.
        </ListItem>
        <ListItem>
          <Strong>Individual Animation</Strong>: Each of these segments is then
          wrapped in an instance of the <InlineCode>Kinetic</InlineCode>{" "}
          component. This means every animation type (
          <InlineCode>fadeIn</InlineCode>, <InlineCode>blurInUp</InlineCode>,{" "}
          <InlineCode>bounce</InlineCode>, <InlineCode>elastic</InlineCode>,
          etc.) and feature (like <InlineCode>onScroll</InlineCode>,{" "}
          <InlineCode>loop</InlineCode>, <InlineCode>startOnView</InlineCode>,
          custom <InlineCode>duration</InlineCode>) available in{" "}
          <InlineCode>Kinetic</InlineCode> can be applied to each text segment.
        </ListItem>
        <ListItem>
          <Strong>Staggering</Strong>: The <InlineCode>stagger</InlineCode> prop
          introduces a small delay between the start of each segment's
          animation. This creates a beautiful cascading or sequential reveal
          effect, making the text appear as if it's typing out, fading in word
          by word, or animating character by character.
        </ListItem>
        <ListItem>
          <Strong>Layout</Strong>: For <InlineCode>"character"</InlineCode> and{" "}
          <InlineCode>"word"</InlineCode> segmentations,
          <InlineCode>KineticText</InlineCode> applies{" "}
          <InlineCode>display: flex</InlineCode> and{" "}
          <InlineCode>flex-wrap: wrap</InlineCode> to its main container div.
          This ensures that the animated segments (which are
          <InlineCode>div</InlineCode>s rendered by{" "}
          <InlineCode>Kinetic</InlineCode>) flow correctly like text, wrapping
          lines as needed.
        </ListItem>
        <ListItem>
          <Strong>Comprehensive Control</Strong>: You retain full control over
          the animation through props like <InlineCode>animation</InlineCode>,{" "}
          <InlineCode>duration</InlineCode>, <InlineCode>delay</InlineCode>
          (which acts as a base delay for the entire sequence),{" "}
          <InlineCode>loop</InlineCode>,<InlineCode>onScroll</InlineCode> (with
          the new <InlineCode>offset</InlineCode> prop for precise scroll
          completion),
          <InlineCode>startOnView</InlineCode>, <InlineCode>once</InlineCode>,{" "}
          <InlineCode>viewportOptions</InlineCode>, and{" "}
          <InlineCode>transition</InlineCode>. These are passed down and
          applied to each segment's animation.
        </ListItem>
      </List>

      {[
        {
          id: "example1",
          title: "Character-by-Character 'Fade In Up' on View",
          code: example1Code,
          name: "kinetic-text-example-1",
          withReload: true,
          Component: KineticTextExample1
        },
        {
          id: "example2",
          title: "Word-by-Word 'Blur In' on Scroll",
          code: example2Code,
          name: "kinetic-text-example-2",
          Component: KineticTextExample2
        },
        {
          id: "example3",
          title: "Line-by-Line 'Bouncing' Animation with Loop",
          code: example3Code,
          name: "kinetic-text-example-3",
          Component: KineticTextExample3
        },
        {
          id: "example4",
          title: "Full Text 'RotateIn' with Custom Transition",
          code: example4Code,
          name: "kinetic-text-example-4",
          withReload: true,
          Component: KineticTextExample4
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          <ComponentTabs
            code={example.code}
            name={example.name}
            withReload={Boolean(example?.withReload)}
            Component={example.Component}
          />
        </React.Fragment>
      ))}
    </>
  )
}
