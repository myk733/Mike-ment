import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Search, 
  Filter,
  Smile,
  Meh,
  Frown,
  Heart,
  Briefcase,
  Home
} from 'lucide-react'

const Journal = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock journal entries
  const journalEntries = [
    {
      id: 1,
      date: '2024-01-15',
      mood: 4,
      category: 'work',
      title: 'Feeling overwhelmed at work',
      excerpt: 'Had a really challenging day with multiple deadlines...',
      content: 'Had a really challenging day with multiple deadlines. The new project requirements keep changing and I feel like I\'m constantly playing catch-up. Need to find better ways to manage my stress.',
      solutions: ['Managing Work Stress'],
      tags: ['stress', 'deadlines', 'overwhelmed']
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 3,
      category: 'relationships',
      title: 'Communication issues with partner',
      excerpt: 'We had another misunderstanding today...',
      content: 'We had another misunderstanding today about household responsibilities. I feel like we\'re not really hearing each other. Maybe we need to set aside dedicated time to talk.',
      solutions: ['Building Healthy Relationships'],
      tags: ['communication', 'relationships', 'misunderstanding']
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 5,
      category: 'personal',
      title: 'Great progress on my goals',
      excerpt: 'Feeling really good about the steps I\'ve taken...',
      content: 'Feeling really good about the steps I\'ve taken this week. Completed my morning routine consistently and started reading that book I\'ve been meaning to get to.',
      solutions: ['Personal Growth & Self-Esteem'],
      tags: ['progress', 'goals', 'routine']
    }
  ]

  const getMoodIcon = (mood) => {
    if (mood >= 4) return <Smile className="w-4 h-4 text-green-400" />
    if (mood === 3) return <Meh className="w-4 h-4 text-yellow-400" />
    return <Frown className="w-4 h-4 text-red-400" />
  }

  const getCategoryIcon = (category) => {
    const icons = {
      work: <Briefcase className="w-4 h-4" />,
      relationships: <Heart className="w-4 h-4" />,
      family: <Home className="w-4 h-4" />,
      personal: <Smile className="w-4 h-4" />
    }
    return icons[category] || <Smile className="w-4 h-4" />
  }

  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-amber-500/20 text-amber-400',
      relationships: 'bg-red-500/20 text-red-400',
      family: 'bg-blue-500/20 text-blue-400',
      personal: 'bg-purple-500/20 text-purple-400'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400'
  }

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = selectedFilter === 'all' || entry.category === selectedFilter
    
    return matchesSearch && matchesFilter
  })

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
              <h1 className="text-lg font-semibold">My Journal</h1>
              <p className="text-sm text-muted-foreground">Your wellness journey</p>
            </div>
          </div>
          <Button onClick={() => navigate('/input')}>
            <Plus className="w-4 h-4 mr-1" />
            New Entry
          </Button>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {['all', 'work', 'relationships', 'family', 'personal'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entries */}
      <main className="p-4 space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="text-center p-8">
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedFilter !== 'all' 
                  ? 'No entries match your search criteria.' 
                  : 'No journal entries yet.'}
              </p>
              <Button onClick={() => navigate('/input')}>
                <Plus className="w-4 h-4 mr-1" />
                Create Your First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{entry.title}</CardTitle>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getMoodIcon(entry.mood)}
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getCategoryColor(entry.category)}`}>
                        {getCategoryIcon(entry.category)}
                        <span>{entry.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-3">{entry.excerpt}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Solutions */}
                {entry.solutions.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Related solutions:</p>
                    {entry.solutions.map((solution) => (
                      <Badge key={solution} variant="outline" className="text-xs">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </main>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}

export default Journal

