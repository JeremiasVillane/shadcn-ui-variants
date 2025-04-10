"use server"

import fs from "fs"
import path from "path"

/**
 * Get the content of a file
 * @param filePath - The path to the file
 * @returns The content of the file
 */
export const getFileContent = async (filePath: string) => {
  const joinedPath = path.relative(process.cwd(), filePath)
  const content = fs.readFileSync(joinedPath, "utf8")

  return content
}
