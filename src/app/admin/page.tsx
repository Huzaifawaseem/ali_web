import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Settings, Image as ImageIcon } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your spa's services and staff from here.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/packages">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Packages</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Packages</div>
                        <p className="text-xs text-muted-foreground">Add, edit, or remove massage packages.</p>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/admin/therapists">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Therapists</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Therapists</div>
                        <p className="text-xs text-muted-foreground">Add or remove therapist profiles.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/admin/rooms">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Rooms</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rooms</div>
                        <p className="text-xs text-muted-foreground">Add or remove room images.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/admin/settings">
                <Card className="hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manage Settings</CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Settings</div>
                        <p className="text-xs text-muted-foreground">Update branding, contact info, and map.</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    </div>
  )
}
