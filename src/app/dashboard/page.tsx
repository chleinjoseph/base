import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">User Dashboard</h1>
        <Button variant="outline">
          <Link href="/api/auth/signout">Logout</Link>
        </Button>
      </div>
      <p className="mt-2 text-muted-foreground">
        Welcome to your personal dashboard.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>View and edit your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Go to Profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Discussions</CardTitle>
            <CardDescription>See your activity on the forum.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View Forum Activity</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
