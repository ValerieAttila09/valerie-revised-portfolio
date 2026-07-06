import type { ReactNode } from 'react'

export interface WorkItem {
  title: string
  category: string
  year: string
  image: string
  mobileImage: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ServiceItem {
  label: string
  title: string
  description: string
  icon: ReactNode
}

export interface Testimonial {
  quote: string
  author: string
}

export interface NavLink {
  label: string
  href: string
}
