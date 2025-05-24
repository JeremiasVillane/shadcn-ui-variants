"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { ChevronsUpDown, Edit2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/ui/color-picker"
import { Input } from "@/components/ui/input"
import {
  Modal,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"

const DEFAULT_COLOR = "#9A71F4"

interface TagType {
  id: string
  name: string
  color?: string
}

interface TagBoxProps
  extends BadgeProps,
    Omit<
      React.ComponentPropsWithoutRef<"div">,
      "onChange" | "value" | "defaultValue" | "color"
    > {
  /**
   * An array of currently selected tags (controlled mode).
   */
  value?: TagType[]

  /**
   * Initial array of selected tags for uncontrolled mode.
   */
  defaultValue?: TagType[]

  /**
   * Callback function invoked when the selected tags change.
   * It receives an array of the new selected tags.
   */
  onChange?: (tags: TagType[]) => void

  /** Name attribute for the hidden input, for form submission. */
  name?: string

  /**
   * An array of all tags available to the user.
   * These are used for suggestions and management.
   */
  userTags?: TagType[]

  /**
   * Callback function invoked when a user edits an existing tag
   * through the "Manage tags" dialog.
   * It receives the updated tag object.
   */
  onTagEdit?: (tag: TagType) => void

  /**
   * Callback function invoked when a user removes an existing tag
   * through the "Manage tags" dialog.
   * It receives the tag object to be removed.
   */
  onTagRemove?: (tag: TagType) => void

  /**
   * Maximum number of tags that can be selected.
   * If set, the input will be disabled once this limit is reached.
   */
  maxTags?: number

  /**
   * Determines if the max tags count should be displayed.
   * @default false */
  showMaxTags?: boolean

  /**
   * Placeholder text to display in the tag input field.
   * @default "Type or select tags..." */
  placeholder?: string

  /**
   * Placeholder text to display in the tag input field when the max tags limit is reached.
   * @default "Max tags reached" */
  placeholderWhenFull?: string

  /**
   * Optional CSS class name to apply to the root element of the TagBox.
   */
  className?: string

  /**
   * Optional CSS class name to apply to the tag element.
   */
  tagClassName?: string

  /**
   * Determines if tags should have customizable colors.
   * @default true */
  withColor?: boolean
}

const getTagStyle = (color?: string) => {
  if (!color) return {}
  return {
    borderColor: `${color}`,
    backgroundColor: `${color}30`,
    color
  }
}
function TagBox({
  // Controlled/uncontrolled state
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,

  // Tag data and management callbacks
  userTags: userTagsProp = [],
  onTagEdit: onTagEditProp,
  onTagRemove: onTagRemoveProp,

  // Behavior props
  maxTags,
  showMaxTags = false,
  withColor = true,

  // UI Text
  placeholder = "Type or select tags...",
  placeholderWhenFull = "Max tags reached",

  // Styling props
  className,
  tagClassName,

  // Badge props
  variant,
  size,
  shape,
  leftElement,
  rightElement,

  // Form integration props
  id, // Inherited from div attributes, applied to root
  name, // For the hidden input

  // Disabled state
  disabled: disabledProp,

  // Other div props (e.g., style, data-*, aria-*)
  ...restDivProps
}: TagBoxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [inputValue, setInputValue] = React.useState<string>("")

  const [internalSelectedTags, setInternalSelectedTags] = React.useState<
    TagType[]
  >(defaultValue || [])
  const isControlled = valueProp !== undefined
  const currentSelectedTags = isControlled ? valueProp : internalSelectedTags

  const popoverContentRef = React.useRef<HTMLDivElement>(null)

  const updateSelectedTags = (newTags: TagType[]) => {
    if (!isControlled) {
      setInternalSelectedTags(newTags)
    }
    onChangeProp?.(newTags)
  }

  React.useEffect(() => {
    if (open && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
      return () => clearTimeout(timeoutId)
    }
  }, [open])

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      if (open) {
        if (
          popoverContentRef.current &&
          popoverContentRef.current.contains(event.target as Node)
        ) {
          return
        }
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("scroll", handleScroll, true)
    }
    return () => {
      document.removeEventListener("scroll", handleScroll, true)
    }
  }, [open, setOpen])

  const addTag = (tagName: string) => {
    if (!!maxTags && maxTags > 0 && currentSelectedTags.length >= maxTags) {
      return
    }

    const trimmedName = tagName.trim()
    if (!trimmedName) return

    const existingUserTag = userTagsProp.find(
      (t) => t.name.toLowerCase() === trimmedName.toLowerCase()
    )
    const isAdded = currentSelectedTags.some(
      (t) => t.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (isAdded) {
      setInputValue("")
      return
    }

    let newTagToAdd: TagType
    if (existingUserTag) {
      newTagToAdd = existingUserTag
    } else {
      newTagToAdd = {
        id: "",
        name: trimmedName
      }
      if (withColor) {
        newTagToAdd.color = DEFAULT_COLOR
      }
    }
    updateSelectedTags([...currentSelectedTags, newTagToAdd])
    setInputValue("")
    setOpen(false)
  }

  const removeTag = (tagName: string) => {
    updateSelectedTags(currentSelectedTags.filter((t) => t.name !== tagName))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setOpen(e.target.value.length > 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue.trim())
    }
  }

  const availableTags = userTagsProp.filter(
    (tag) =>
      !currentSelectedTags.some((t) => t.name === tag.name) &&
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  const showCreateOption =
    inputValue.trim() &&
    !userTagsProp.some(
      (tag) => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
    ) &&
    !currentSelectedTags.some(
      (tag) => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
    )

  const allTagsForManagement = Array.from(
    new Map(
      [...userTagsProp, ...currentSelectedTags].map((tag) => [
        tag.id || tag.name,
        tag
      ])
    ).values()
  )

  const isInputDisabled =
    (!!maxTags && currentSelectedTags.length >= maxTags) || !!disabledProp

  return (
    <div {...restDivProps} className={cn("w-full", className)}>
      {/* Hidden input for form integration */}
      {!!name && (
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(
            currentSelectedTags.map(({ id, name, color }) => ({
              id,
              name,
              ...(withColor && color && { color })
            }))
          )}
        />
      )}

      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <div className="w-full">
            <Input
              ref={inputRef}
              id={id}
              placeholder={
                isInputDisabled && placeholderWhenFull !== "Max tags reached"
                  ? placeholderWhenFull
                  : isInputDisabled &&
                      currentSelectedTags.length >= (maxTags || 0)
                    ? placeholderWhenFull
                    : placeholder
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              endInline={
                showMaxTags && maxTags
                  ? `${currentSelectedTags.length}/${maxTags}`
                  : ""
              }
              endIcon={
                <ChevronsUpDown className="size-4 cursor-pointer opacity-50 hover:opacity-80 active:opacity-100" />
              }
              className="w-full"
              disabled={isInputDisabled}
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={id ? `${id}-popover` : undefined}
            />
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={popoverContentRef}
            className="z-50 rounded-md border bg-popover shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            sideOffset={4}
            align="start"
            side="bottom"
            onOpenAutoFocus={(e) => e.preventDefault()}
            style={{
              width: "var(--radix-popover-trigger-width)"
            }}
            id={id ? `${id}-popover` : undefined}
            role="listbox"
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
              <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                {availableTags.length > 0 || showCreateOption ? (
                  <section className="max-h-[200px] overflow-auto p-1 text-foreground">
                    {availableTags.map((tag) => (
                      <article
                        key={tag.name}
                        role="option"
                        aria-selected="false"
                        onClick={(e) => {
                          e.preventDefault()
                          addTag(tag.name)
                        }}
                        className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted/80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                      >
                        <div className="flex items-center">
                          {withColor && tag.color && (
                            <div
                              className="mr-2 size-4 rounded-full"
                              style={{ backgroundColor: tag.color }}
                            />
                          )}
                          {tag.name}
                        </div>
                      </article>
                    ))}
                    {showCreateOption && (
                      <article
                        role="option"
                        aria-selected="false"
                        onClick={(e) => {
                          e.preventDefault()
                          addTag(inputValue.trim())
                        }}
                        className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground outline-none hover:bg-muted/80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                      >
                        <div className="flex items-center">
                          {withColor && (
                            <div className="mr-2 size-4 rounded-full bg-gray-300" />
                          )}
                          Create "{inputValue.trim()}"
                        </div>
                      </article>
                    )}
                  </section>
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No tags found
                  </div>
                )}

                <Separator />

                <section className="overflow-hidden p-1 text-foreground">
                  <article className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      iconLeft={<Edit2 />}
                      iconAnimation="translateYUp"
                      onClick={(e) => {
                        e.preventDefault()
                        setOpenDialog(true)
                        setOpen(false)
                      }}
                      className="flex h-8 w-full justify-start px-2"
                    >
                      Manage tags
                    </Button>
                  </article>
                </section>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      <div className="mt-2 flex flex-wrap gap-2">
        {currentSelectedTags.map((tag) => (
          <Badge
            key={tag.id || tag.name}
            shape={shape ?? "pill"}
            style={withColor && tag.color ? getTagStyle(tag.color) : {}}
            rightElement={
              rightElement ?? (
                <X
                  role="button"
                  onClick={() => removeTag(tag.name)}
                  className="transition-colors hover:text-destructive"
                  aria-label={`Remove tag ${tag.name}`}
                />
              )
            }
            className={tagClassName}
            variant={variant}
            size={size}
            leftElement={leftElement}
            disabled={disabledProp}
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      <Modal open={openDialog} onOpenChange={setOpenDialog}>
        <ModalContent>
          <ModalTitle>Manage Tags</ModalTitle>
          <ModalDescription>Edit or delete existing tags</ModalDescription>

          <ModalBody>
            {allTagsForManagement.map((tag) => (
              <TagForm
                key={tag.id || tag.name}
                {...tag}
                withColor={withColor}
                {...{ variant, size, shape, leftElement, rightElement }}
                onDelete={() => {
                  if (tag.id && tag.id.length > 0) onTagRemoveProp?.(tag)
                  removeTag(tag.name)
                }}
                onSubmit={(formData) => {
                  const newNameFromForm = formData.name

                  const updatedTagFromForm: TagType = {
                    ...tag,
                    name: newNameFromForm.trim()
                  }

                  if (withColor) {
                    const colorFromForm = formData.color
                    updatedTagFromForm.color = colorFromForm || DEFAULT_COLOR
                  }

                  if (tag.id && tag.id.length > 0) {
                    onTagEditProp?.(updatedTagFromForm)
                  }

                  const newSelectedValues = currentSelectedTags.map(
                    (selectedTag) =>
                      (selectedTag.id && selectedTag.id === tag.id) ||
                      selectedTag.name === tag.name
                        ? updatedTagFromForm
                        : selectedTag
                  )
                  updateSelectedTags(newSelectedValues)
                }}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <ModalClose variant="outline">Close</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

type TagFormProps = {
  color?: string
  onSubmit: (formData: Omit<TagType, "id">) => void
  onDelete: () => void
  withColor: boolean
} & TagType &
  Omit<BadgeProps, "disabled">

const TagForm = ({
  id,
  name,
  color,
  onSubmit,
  onDelete,
  withColor,
  // Badge props
  variant,
  size,
  shape,
  leftElement,
  rightElement
}: TagFormProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [accordionValue, setAccordionValue] = React.useState("")
  const [nameValue, setNameValue] = React.useState(name)
  const [colorValue, setColorValue] = React.useState(
    withColor ? color || DEFAULT_COLOR : undefined
  )

  React.useEffect(() => {
    if (accordionValue) inputRef.current?.focus()
  }, [accordionValue])

  const initialColorForCompare = withColor ? color || DEFAULT_COLOR : undefined
  const isModified =
    name !== nameValue || (withColor && initialColorForCompare !== colorValue)

  return (
    <Accordion
      type="single"
      variant="contained"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value={name}>
        <div className="flex items-center justify-between">
          <Badge
            shape={shape ?? "pill"}
            style={withColor && color ? getTagStyle(color) : {}}
            {...{ variant, size, leftElement, rightElement }}
          >
            {name}
          </Badge>
          <div className="flex items-center gap-4">
            <AccordionTrigger className="gap-1 text-foreground/80 hover:text-foreground hover:no-underline">
              Edit
            </AccordionTrigger>
            <Modal
              mode="alertdialog"
              variant="destructive"
              responsive={false}
              align="left"
              withIcon
            >
              <ModalTrigger
                variant="destructive"
                size="sm"
                className="h-8 w-20"
              >
                Delete
              </ModalTrigger>
              <ModalContent>
                <ModalTitle>Are you sure?</ModalTitle>
                <ModalDescription className="flex flex-col">
                  <span>
                    You are about to delete the tag:{" "}
                    <span className="font-semibold">{name}</span>.
                  </span>
                  <span>This action cannot be undone.</span>
                </ModalDescription>
                <ModalFooter>
                  <ModalClose>Cancel</ModalClose>
                  <ModalAction onClick={onDelete}>Delete</ModalAction>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
        <AccordionContent>
          <section className="flex items-end gap-4 pl-1 pt-1">
            <div className="w-full space-y-2">
              <label htmlFor={`name-${id || name}`}>Name</label>
              <Input
                ref={inputRef}
                id={`name-${id || name}`}
                name="name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                minLength={2}
                maxLength={20}
                showMaxLength="inside"
                className="h-8"
                required
              />
            </div>
            {withColor && (
              <div className="space-y-2">
                <label htmlFor={`color-${id || name}`}>Color</label>
                <ColorPicker
                  id={`color-${id || name}`}
                  name="color"
                  value={colorValue || DEFAULT_COLOR}
                  onChange={setColorValue}
                  className="size-8 cursor-pointer p-1"
                />
              </div>
            )}
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onSubmit({ name: nameValue, color: colorValue })
                setAccordionValue("")
              }}
              className="h-8 w-28"
              disabled={!isModified}
            >
              Save
            </Button>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { getTagStyle, TagBox }
export type { TagType, TagBoxProps }
