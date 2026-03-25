'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        'group overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02] transition-[border-color,background-color,box-shadow] duration-300 data-[state=open]:border-[var(--primary)]/28 data-[state=open]:bg-white/[0.04] data-[state=open]:shadow-[0_16px_34px_rgba(0,0,0,0.22)]',
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/40 flex min-h-16 flex-1 items-center justify-between gap-4 px-5 py-4 text-left outline-none transition-[color,background-color] duration-300 hover:bg-white/[0.02] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:min-h-[72px] sm:px-6 sm:py-5 [&[data-state=open]>span>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-[#c7c1b7] transition-[border-color,background-color,color] duration-300 group-data-[state=open]:border-[var(--primary)]/28 group-data-[state=open]:bg-[var(--primary)]/10 group-data-[state=open]:text-[var(--primary)]">
          <ChevronDownIcon className="pointer-events-none size-4 transition-transform duration-300" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div className={cn('px-5 pb-5 pt-0 sm:px-6 sm:pb-6', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
