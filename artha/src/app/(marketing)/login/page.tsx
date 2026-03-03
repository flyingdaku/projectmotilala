"use client"

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('email')
  const [step, setStep] = useState<'initial' | 'otp'>('initial')
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setIsLogin(false)
    }
  }, [searchParams])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during Google login.')
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })
        if (error) throw error
        setStep('otp') // Reuse OTP step for email confirmation message
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // Ensure phone starts with +91 if no country code provided
    let formattedPhone = phone.trim()
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+91${formattedPhone}`
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })
      if (error) throw error
      setStep('otp')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please check your number.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    let formattedPhone = phone.trim()
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+91${formattedPhone}`
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      })
      if (error) throw error
      
      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
      <Card className="w-full max-w-md border-[var(--border)] shadow-xl shadow-[var(--shadow-card)]">
        <CardHeader className="space-y-3 pb-6 text-center">
          <div className="w-12 h-12 bg-[var(--background)] rounded-xl mx-auto flex items-center justify-center mb-2 shadow-lg shadow-[var(--shadow-amber)]">
            <Logo className="w-8 h-8 text-[var(--text-primary)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">Welcome to Artha</CardTitle>
          <CardDescription className="text-[var(--text-secondary)]">
            Sign in or create an account to access advanced Indian financial analytics and portfolio tools.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button 
            variant="outline" 
            className="w-full h-11 relative overflow-hidden group"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--surface-elevated)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={() => {
                setAuthMethod(authMethod === 'email' ? 'phone' : 'email')
                setStep('initial')
                setError(null)
              }}
              className="text-sm text-[var(--accent-brand)] hover:text-[var(--accent-dark)] font-medium transition-colors"
            >
              Switch to {authMethod === 'email' ? 'Phone' : 'Email'}
            </button>
          </div>

          {error && (
            <div className="p-3 text-sm text-[var(--negative)] bg-[var(--negative-subtle)] rounded-lg border border-[var(--negative)]">
              {error}
            </div>
          )}

          {step === 'initial' ? (
            authMethod === 'email' ? (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="you@example.com" 
                    className="h-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    className="h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full h-11" disabled={isLoading || !email || !password}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    disabled={isLoading}
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--text-muted)]">
                      +91
                    </div>
                    <Input 
                      id="phone" 
                      placeholder="9876543210" 
                      className="pl-12 h-11"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">We&apos;ll send an OTP to verify your number.</p>
                </div>
                <Button type="submit" className="w-full h-11" disabled={isLoading || phone.length < 10}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Send Verification Code
                </Button>
              </form>
            )
          ) : authMethod === 'email' ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-[var(--accent-subtle)] rounded-lg border border-[var(--accent-brand)]">
                <p className="text-sm text-[var(--accent-brand)]">
                  Please check your email <strong className="text-[var(--text-primary)]">{email}</strong> for a confirmation link to complete your registration.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setStep('initial')}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mt-2"
                disabled={isLoading}
              >
                Back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input 
                  id="otp" 
                  placeholder="Enter 6-digit OTP" 
                  className="h-11 text-center text-lg tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading || otp.length < 6}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Verify & Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <button 
                type="button" 
                onClick={() => setStep('initial')}
                className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mt-2"
                disabled={isLoading}
              >
                Change phone number
              </button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-2 border-t border-[var(--border)] mt-2 text-center pb-6">
          <p className="text-[11px] text-[var(--text-muted)] mt-4">
            By continuing, you agree to Artha&apos;s Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--text-muted)]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
