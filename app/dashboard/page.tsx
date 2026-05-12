"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-black text-foreground">Document Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={handleSignOut} className="rounded-lg bg-transparent">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-foreground mb-2">Welcome, {user.name}!</h2>
          <p className="text-muted-foreground text-lg">Manage and create your legal documents</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/flow" className="group">
            <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-xl">📄</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Create New Document</h3>
              <p className="text-muted-foreground text-sm">Start generating a new legal document</p>
            </div>
          </Link>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📂</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">My Documents</h3>
            <p className="text-muted-foreground text-sm">View and manage your saved documents</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">⚙️</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Settings</h3>
            <p className="text-muted-foreground text-sm">Manage your account preferences</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="text-xl font-black text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">NDA Template Generated</p>
                <p className="text-xs text-muted-foreground">2 hours ago • US jurisdiction</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">Privacy Policy Created</p>
                <p className="text-xs text-muted-foreground">Yesterday • EU jurisdiction</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">Service Agreement Drafted</p>
                <p className="text-xs text-muted-foreground">3 days ago • US jurisdiction</p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg">
                View
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Documents</p>
            <p className="text-4xl font-black text-primary">12</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Downloads</p>
            <p className="text-4xl font-black text-primary">48</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Active Plan</p>
            <p className="text-lg font-bold text-foreground">Pro</p>
          </div>
        </div>
      </main>
    </div>
  )
}
