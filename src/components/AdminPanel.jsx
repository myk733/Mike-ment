import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const AdminPanel = ({ user }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card>
          <CardContent className="text-center p-6">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You don't have permission to access the admin panel.</p>
            <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock data
  const dashboardStats = {
    totalUsers: 1254,
    activeUsers: 83,
    totalEntries: 4921,
    solutionsViewed: 12847,
    avgSessionTime: '12m 34s',
    userGrowth: '+15.2%'
  }

  const recentUsers = [
    { id: 1, name: 'Sarah K.', email: 'sarah@example.com', joinDate: '2024-01-15', status: 'active', entries: 8 },
    { id: 2, name: 'John M.', email: 'john@example.com', joinDate: '2024-01-14', status: 'active', entries: 12 },
    { id: 3, name: 'Grace W.', email: 'grace@example.com', joinDate: '2024-01-13', status: 'inactive', entries: 3 },
    { id: 4, name: 'David L.', email: 'david@example.com', joinDate: '2024-01-12', status: 'active', entries: 15 }
  ]

  const contentItems = [
    { id: 1, title: 'Managing Work Stress', category: 'Work & Career', type: 'Solution', status: 'published', views: 245 },
    { id: 2, title: 'Building Healthy Relationships', category: 'Relationships', type: 'Solution', status: 'published', views: 189 },
    { id: 3, title: 'Financial Wellness Guide', category: 'Financial Stress', type: 'Resource', status: 'draft', views: 0 },
    { id: 4, title: 'Mindfulness for Anxiety', category: 'Personal Growth', type: 'Solution', status: 'published', views: 312 }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Manage Mike Care Builds</p>
            </div>
          </div>
          <Badge variant="secondary">Admin Mode</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{dashboardStats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-400">{dashboardStats.userGrowth}</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{dashboardStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Currently online</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{dashboardStats.totalEntries}</div>
                  <p className="text-xs text-muted-foreground">Total journal entries</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>Latest user registrations and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentUsers.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.entries} entries</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Application performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <span className="text-sm text-muted-foreground">142ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Session Time</span>
                    <span className="text-sm text-muted-foreground">{dashboardStats.avgSessionTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-1" />
                  Add User
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Join Date</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Entries</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">{user.entries}</td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Content Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-1" />
                  New Content
                </Button>
              </div>
            </div>

            {/* Content Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Title</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Views</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b border-border">
                          <td className="p-4 font-medium">{item.title}</td>
                          <td className="p-4 text-sm text-muted-foreground">{item.category}</td>
                          <td className="p-4">
                            <Badge variant="outline">{item.type}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">{item.views}</td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">System Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Configure app behavior and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    General Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    User Permissions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Content Moderation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Database and system operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    System Logs
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}

export default AdminPanel

