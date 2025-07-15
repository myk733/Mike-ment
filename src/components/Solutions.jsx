import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Video,
  Phone,
  CheckCircle,
  Circle,
  Heart,
  Lightbulb,
  Users,
  ExternalLink
} from 'lucide-react'

const Solutions = () => {
  const navigate = useNavigate()
  const [solution, setSolution] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])

  useEffect(() => {
    const savedSolution = localStorage.getItem('currentSolution')
    if (savedSolution) {
      setSolution(JSON.parse(savedSolution))
    } else {
      // If no solution in localStorage, navigate back to input or dashboard
      navigate('/')
    }
  }, [navigate])

  const toggleStepCompletion = (stepIndex, weekIndex = null) => {
    const stepId = weekIndex !== null ? `${weekIndex}-${stepIndex}` : `immediate-${stepIndex}`
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card>
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">No solution found. Please share your thoughts first.</p>
            <Button onClick={() => navigate('/input')} className="mt-4">
              Share Your Thoughts
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalSteps = (solution.immediateSteps?.length || 0) + (solution.healingPlan?.reduce((acc, week) => acc + week.tasks.length, 0) || 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Your Personalized Solutions</h1>
            <p className="text-sm text-muted-foreground">Based on your input</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Solution Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <CardTitle className="text-primary">{solution.title}</CardTitle>
            </div>
            <CardDescription>{solution.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Estimated time: {solution.estimatedTime}</span>
              </div>
              {solution.category && <Badge variant="secondary">{solution.category}</Badge>}
            </div>
          </CardContent>
        </Card>

        {/* Immediate Relief */}
        {solution.immediateSteps && solution.immediateSteps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Immediate Relief (Right Now)</span>
              </CardTitle>
              <CardDescription>
                Quick strategies to help you feel better immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {solution.immediateSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleStepCompletion(index)}
                      className="mt-0.5"
                    >
                      {completedSteps.includes(`immediate-${index}`) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <span className={completedSteps.includes(`immediate-${index}`) ? 'line-through text-muted-foreground' : ''}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Healing Plan */}
        {solution.healingPlan && solution.healingPlan.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Your Healing Journey</span>
              </CardTitle>
              <CardDescription>
                Step-by-step plan for long-term wellness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {solution.healingPlan.map((week, weekIndex) => (
                <div key={weekIndex} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {week.week}
                    </div>
                    <h3 className="font-medium">{week.title}</h3>
                  </div>
                  <div className="ml-10 space-y-2">
                    {week.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleStepCompletion(taskIndex, weekIndex)}
                          className="mt-0.5"
                        >
                          {completedSteps.includes(`${weekIndex}-${taskIndex}`) ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <span className={`text-sm ${completedSteps.includes(`${weekIndex}-${taskIndex}`) ? 'line-through text-muted-foreground' : ''}`}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Resources */}
        {solution.resources && solution.resources.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>
                Books, videos, and support services to help your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {solution.resources.map((resource, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <div className="mt-1">
                    {resource.type === 'book' && <BookOpen className="w-5 h-5 text-blue-400" />}
                    {resource.type === 'video' && <Video className="w-5 h-5 text-red-400" />}
                    {resource.type === 'helpline' && <Phone className="w-5 h-5 text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    {resource.contact && (
                      <p className="text-sm font-medium text-primary mt-1">{resource.contact}</p>
                    )}
                  </div>
                  {resource.link && <a href={resource.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 text-muted-foreground" /></a>}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Steps</span>
                <span>{completedSteps.length} / {totalSteps}</span>
              </div>
              <Progress 
                value={(completedSteps.length / totalSteps) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => navigate('/journal')}>
            Save to Journal
          </Button>
          <Button onClick={() => navigate('/input')}>
            Share More Thoughts
          </Button>
        </div>
      </main>

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}

export default Solutions

