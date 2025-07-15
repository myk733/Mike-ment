import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('') // New state for name
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginView, setIsLoginView] = useState(true) // New state to toggle between login/signup

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const endpoint = isLoginView ? "/api/login" : "/api/register"
    const body = isLoginView ? { email, password } : { name, email, password }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        onLogin(data.user);
      } else {
        alert(data.message || (isLoginView ? "Login failed" : "Registration failed"));
      }
    } catch (error) {
      console.error(isLoginView ? "Login error:" : "Registration error:", error);
      alert("An error occurred during " + (isLoginView ? "login." : "registration."));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Mike Care Builds</h1>
          </div>
          <p className="text-muted-foreground">Mental Health & Wellness for Kenya</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Community Support</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Culturally Relevant</span>
          </div>
        </div>

        {/* Login/Signup Form */}
        <Card>
          <CardHeader>
            <CardTitle>{isLoginView ? "Welcome Back" : "Join Mike Care Builds"}</CardTitle>
            <CardDescription>
              {isLoginView ? "Sign in to continue your wellness journey" : "Create your account to start your wellness journey"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginView && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (isLoginView ? 'Signing in...' : 'Registering...') : (isLoginView ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              {isLoginView ? (
                <>Don't have an account? {" "}
                  <Button variant="link" onClick={() => setIsLoginView(false)} className="p-0 h-auto">
                    Sign Up
                  </Button>
                </>
              ) : (
                <>Already have an account? {" "}
                  <Button variant="link" onClick={() => setIsLoginView(true)} className="p-0 h-auto">
                    Sign In
                  </Button>
                </>
              )}
            </div>

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Login


