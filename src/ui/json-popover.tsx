import { useShikiTheme } from '@/configs/shiki'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/primitives/popover'
import { useState } from 'react'
import ShikiHighlighter from 'react-shiki'
import { ScrollArea, ScrollBar } from './primitives/scroll-area'

interface JsonPopoverProps {
  json: unknown
  children: React.ReactNode
}

export function JsonPopover({ json, children }: JsonPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shikiTheme = useShikiTheme()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className="hover:text-fg text-fg-300 h-full cursor-pointer truncate whitespace-nowrap hover:underline"
          onDoubleClick={() => setIsOpen(true)}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <ScrollArea hideCorner className="h-[400px] max-w-full">
          <ShikiHighlighter
            language="json"
            theme={shikiTheme}
            className="text-xs"
            addDefaultStyles={false}
            showLanguage={false}
          >
            {JSON.stringify(json, null, 2)}
          </ShikiHighlighter>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
