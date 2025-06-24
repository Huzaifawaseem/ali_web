'use client';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { AdminNav } from '@/components/layout/admin-nav';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAdmin } = useAdminAuth();

  if (loading) {
    return (
        <div className="flex h-screen w-full">
            <div className="hidden md:flex h-full w-[280px] flex-col gap-4 border-r bg-muted/40 p-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
            <div className="flex-1 p-8">
                 <Skeleton className="h-full w-full" />
            </div>
        </div>
    );
  }

  if (!isAdmin) {
    return null; 
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminNav />
      <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
