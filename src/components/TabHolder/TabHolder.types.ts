import type { ReactNode } from 'react'

export interface TabType {
  key: string
  title: string
  content: ReactNode
}

export interface TabHolderProps {
  initialTab?: string
  tabs: TabType[]
}
