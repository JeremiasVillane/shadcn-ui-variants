"use client"

import { useEffect, useState } from "react"
import { Loader2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle
} from "@/components/ui/modal"

type User = {
  id: number
  name: string
  email: string
}

export function ModalExample2() {
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Simulate fetching user data
  useEffect(() => {
    if (open && userId) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        })
        setLoading(false)
      }, 1000)
    } else {
      setUser(null)
    }
  }, [open, userId])

  const users = [1, 2, 3, 4, 5]

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2">
        {users.map((id) => (
          <Button
            key={id}
            variant="outline"
            onClick={() => {
              setUserId(id)
              setOpen(true)
            }}
          >
            User {id}
          </Button>
        ))}
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        showCloseButton
        separatedHeader
        withIcon
        customIcon={<User />}
      >
        <ModalContent>
          <ModalTitle>User Details</ModalTitle>
          <ModalBody>
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 py-3">
                <Loader2 className="size-8 animate-spin" />
                Loading...
              </div>
            ) : user ? (
              <div className="space-y-2">
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            ) : (
              <p>No user selected</p>
            )}
          </ModalBody>
          <ModalFooter>
            <ModalClose>Close</ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
