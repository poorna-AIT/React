"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    try {
      await resetPassword(email)
      setSubmitted(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>

            <Button type="submit" className="w-full h-10 text-base font-semibold rounded-lg" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>
        ) : (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
            <p className="text-primary font-semibold mb-2">Email sent successfully!</p>
            <p className="text-muted-foreground text-sm mb-4">
              Check your email for instructions to reset your password.
            </p>
            <Link href="/auth/sign-in" className="text-primary hover:underline font-semibold">
              Back to Sign In
            </Link>
          </div>
        )}

        <p className="text-center text-muted-foreground text-sm mt-6">
          Remember your password?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
