import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Heart, 
  Home, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity,
  Send,
  Loader2
} from 'lucide-react'

const InputScreen = () => {
  const navigate = useNavigate()
  const [inputText, setInputText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const categories = [
    {
      id: 'relationships',
      name: 'Relationships',
      icon: Heart,
      description: 'Romantic conflicts, trust, communication',
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      id: 'family',
      name: 'Family Issues',
      icon: Home,
      description: 'Parenting stress, sibling rivalry, financial burdens',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 'work',
      name: 'Work & Career',
      icon: Briefcase,
      description: 'Job stress, burnout, work-life balance',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      id: 'financial',
      name: 'Financial Stress',
      icon: DollarSign,
      description: 'Debt, unemployment, budgeting',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      id: 'personal',
      name: 'Personal Growth',
      icon: TrendingUp,
      description: 'Self-esteem, motivation, identity struggles',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'social',
      name: 'Social Pressures',
      icon: Users,
      description: 'Peer pressure, stigma, isolation',
      color: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    },
    {
      id: 'health',
      name: 'Health & Lifestyle',
      icon: Activity,
      description: 'Chronic illness, sleep, substance use',
      color: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
    }
  ]

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // In a real app, this would process the audio
      setInputText(prev => prev + ' [Voice note recorded]')
    } else {
      // Start recording
      setIsRecording(true)
      // In a real app, this would start audio recording
    }
  }

  const handleSubmit = async () => {
    if (!inputText.trim() || !selectedCategory) return

    setIsAnalyzing(true)
    
    // Simulate analysis and solution generation
    setTimeout(() => {
      // Store the input and category for the solutions page
      localStorage.setItem('currentInput', JSON.stringify({
        text: inputText,
        category: selectedCategory,
        timestamp: new Date().toISOString()
      }))
      
      setIsAnalyzing(false)
      navigate('/solutions')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Share Your Thoughts</h1>
            <p className="text-sm text-muted-foreground">We're here to help</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">What's on your mind today?</CardTitle>
            <CardDescription>
              Share your thoughts, feelings, or concerns. Everything is private and secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type here or use voice recording below..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            {/* Voice Recording */}
            <div className="flex items-center justify-center">
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                onClick={handleVoiceToggle}
                className="rounded-full w-16 h-16"
              >
                {isRecording ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </Button>
            </div>
            
            {isRecording && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Recording...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>What area does this relate to?</CardTitle>
            <CardDescription>
              Select the category that best matches your concern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all text-left ${
                      selectedCategory === category.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={!inputText.trim() || !selectedCategory || isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing & Finding Solutions...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Personalized Solutions
            </>
          )}
        </Button>

        {/* Privacy Note */}
        <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <p>🔒 Your information is encrypted and private. You can choose to share with licensed therapists if you need additional support.</p>
        </div>
      </main>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}

export default InputScreen

