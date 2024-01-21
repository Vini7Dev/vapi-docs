import { PropsWithChildren } from 'react'

export type ModalProps = PropsWithChildren & {
  title: string
  onClose(): void
}
