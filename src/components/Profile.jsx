import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Moon, 
  LogOut,
  Award,
  Target,
  Calendar,
  TrendingUp,
  Heart
} from 'lucide-react'

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  const stats = {
    daysActive: 15,
    entriesCreated: 8,
    solutionsUsed: 12,
    streakDays: 5,
    completedGoals: 3,
    totalGoals: 5
  }

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Created your first journal entry', earned: true },
    { id: 2, title: 'Consistent Care', description: '7 days of daily check-ins', earned: true },
    { id: 3, title: 'Solution Seeker', description: 'Used 10 different solutions', earned: true },
    { id: 4, title: 'Wellness Warrior', description: '30 days of active use', earned: false },
    { id: 5, title: 'Community Helper', description: 'Helped 5 community members', earned: false }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Member since January 2024
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Your Wellness Journey</span>
            </CardTitle>
            <CardDescription>Track your progress and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.daysActive}</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-accent">{stats.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-400">{stats.entriesCreated}</div>
                <div className="text-sm text-muted-foreground">Journal Entries</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{stats.solutionsUsed}</div>
                <div className="text-sm text-muted-foreground">Solutions Used</div>
              </div>
            </div>

            {/* Goal Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Goals</span>
                <span>{stats.completedGoals}/{stats.totalGoals} completed</span>
              </div>
              <Progress value={(stats.completedGoals / stats.totalGoals) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>Celebrate your wellness milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Daily reminders and updates</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Easier on the eyes</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-muted-foreground">English</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>

            {/* Data Sharing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Share with Therapists</p>
                  <p className="text-sm text-muted-foreground">Allow licensed therapists to access your data</p>
                </div>
              </div>
              <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-2" />
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Target className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}

export default Profile

