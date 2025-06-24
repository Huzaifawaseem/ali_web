import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { AuthButtons } from '@/components/auth-buttons';

const navLinks = [
  { href: '#packages', label: 'Packages' },
  { href: '#therapists', label: 'Therapists' },
  { href: '#rooms', label: 'Our Rooms' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in fade-in-0 slide-in-from-top-4 duration-500">
  <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
    
    <Logo className="text-base sm:text-lg font-semibold" />

    <div className="hidden items-center gap-6 md:flex">
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <AuthButtons />
    </div>

    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="overflow-y-auto">
          <div className="p-4">
            <Logo className="text-base font-semibold" />
            <nav className="mt-8 grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <AuthButtons />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</header>

  );
}
