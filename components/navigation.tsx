"use client"

import { ArrowUpRight, Menu } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { SiteCta } from "@/components/site-cta"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { instagramHref, navLinks } from "@/content/home"

export function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/82 backdrop-blur-2xl">
      <div className="site-shell flex h-14 items-center justify-between gap-5 sm:h-15 lg:h-16">
        <a href="/" className="inline-flex items-center gap-2">
          <BrandMark className="text-[1rem] sm:text-[1.05rem]" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="site-nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <SiteCta
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4"
          >
            Instagram
            <ArrowUpRight className="h-3.5 w-3.5" />
          </SiteCta>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir navegacao"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:border-white/18 hover:bg-white/[0.05]"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-l border-white/10 bg-[#070707]/96 px-0 text-foreground"
            >
              <SheetHeader className="border-b border-white/10 px-5 pb-5 pt-6 text-left">
                <SheetTitle className="text-left">
                  <BrandMark className="text-lg" />
                </SheetTitle>
                <SheetDescription className="text-left text-sm leading-6 text-[#9f988d]">
                  Selecao de camisas com atendimento direto.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 px-5 py-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-[#ded8cf] transition-colors hover:border-white/16 hover:bg-white/[0.05] hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 px-5 py-5">
                <SiteCta
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center"
                >
                  Abrir atendimento
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </SiteCta>
                <p className="mt-3 text-sm leading-6 text-[#8f897f]">
                  Atendimento pelo Instagram nesta fase.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
