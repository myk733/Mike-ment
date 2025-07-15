import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Home, 
  BookOpen, 
  Lightbulb, 
  Users, 
  User, 
  Settings,
  Mic,
  PenTool,
  ChevronRight,
  Smile,
  Meh,
  Frown
} from 'lucide-react'

const Dashboard = ({ user }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [showAdminButton, setShowAdminButton] = useState(false)

  const moodOptions = [
    { icon: Frown, label: 'Struggling', value: 1, color: 'text-red-400' },
    { icon: Frown, label: 'Difficult', value: 2, color: 'text-orange-400' },
    { icon: Meh, label: 'Okay', value: 3, color: 'text-yellow-400' },
    { icon: Smile, label: 'Good', value: 4, color: 'text-green-400' },
    { icon: Smile, label: 'Great', value: 5, color: 'text-green-500' }
  ]

  const recentSolutions = [
    {
      title: 'Managing Work Stress',
      description: 'Breathing exercises and time management techniques',
      category: 'Work & Career',
      timeAgo: '2 hours ago'
    },
    {
      title: 'Building Confidence',
      description: 'Daily affirmations and goal-setting strategies',
      category: 'Personal Growth',
      timeAgo: '1 day ago'
    }
  ]

  const handleLogoClick = () => {
    setShowAdminButton(!showAdminButton)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MC</span>
            </div>
            <h1 className="text-lg font-semibold">Mike Care Builds</h1>
          </div>
          {showAdminButton && user?.isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Greeting */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name}
          </h2>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>

        {/* Daily Check-in */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Daily Check-In</CardTitle>
            <CardDescription>How do you feel today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between space-x-2">
              {moodOptions.map((mood) => {
                const IconComponent = mood.icon
                return (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                      selectedMood === mood.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${selectedMood === mood.value ? '' : mood.color}`} />
                    <span className="text-xs mt-1">{mood.label}</span>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/input">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 text-center">
                <PenTool className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Share Thoughts</h3>
                <p className="text-sm text-muted-foreground">Write or speak</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/input">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Mic className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Voice Note</h3>
                <p className="text-sm text-muted-foreground">Quick recording</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Solutions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Solutions</CardTitle>
            <CardDescription>Your latest wellness resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSolutions.map((solution, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{solution.title}</h4>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {solution.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{solution.timeAgo}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Keep up the great work!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weekly Goal</span>
                <span>5/7 days</span>
              </div>
              <Progress value={71} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Days streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">12</div>
                <div className="text-sm text-muted-foreground">Solutions used</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center p-2 text-primary">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/journal" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Journal</span>
          </Link>
          <Link to="/solutions" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs mt-1">Solutions</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Community</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}

export default Dashboard

