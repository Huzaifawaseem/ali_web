'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '../logo';
import { LayoutDashboard, Package, Users, LogOut, Settings, Image as ImageIcon, Briefcase } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/clientApp';
import { useToast } from '@/hooks/use-toast';

const auth = getAuth(app);

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/therapists', label: 'Therapists', icon: Users },
  { href: '/admin/staff', label: 'Staff', icon: Briefcase },
  { href: '/admin/rooms', label: 'Rooms', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully.' });
      router.push('/');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error logging out.' });
    }
  };

  return (
    <div className="hidden md:flex h-full max-h-screen flex-col gap-2 w-[280px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { 'bg-muted text-primary': pathname === link.href }
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <Button size="sm" className="w-full" variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </Button>
        </div>
      </div>
    </div>
  );
}
