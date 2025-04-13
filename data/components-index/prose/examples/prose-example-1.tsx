"use client"

import { Prose } from "@/components/ui/prose";

export function MyArticle() {
  return (
    <Prose scale="sm"> {/* Apply small scale globally */}
      <h1>Article Title</h1> {/* Will be small scale */}
      <p>This paragraph will be small scale.</p>
      <h2>Subsection Header</h2> {/* Will be small scale */}
      <blockquote>Blockquote styled at small scale.</blockquote>
      <ul>
        <li>List item 1</li> {/* List items affected by scale */}
        <li>List item 2</li>
      </ul>
    </Prose>
  );
}