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
  const [currentInput, setCurrentInput] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])

  useEffect(() => {
    const savedInput = localStorage.getItem('currentInput')
    if (savedInput) {
      setCurrentInput(JSON.parse(savedInput))
    }
  }, [])

  const getSolutionsForCategory = (category) => {
    const solutionsMap = {
      work: {
        title: 'Managing Work Stress',
        description: 'Evidence-based strategies to reduce workplace stress and improve work-life balance',
        estimatedTime: '2-4 weeks',
        immediateSteps: [
          'Take 5 deep breaths using the 4-7-8 technique',
          'Step away from your workspace for 10 minutes',
          'Practice progressive muscle relaxation',
          'Write down 3 things you accomplished today'
        ],
        healingPlan: [
          {
            week: 1,
            title: 'Foundation Building',
            tasks: [
              'Establish morning mindfulness routine (10 minutes)',
              'Set clear work boundaries',
              'Practice saying "no" to non-essential tasks',
              'Create a dedicated workspace at home'
            ]
          },
          {
            week: 2,
            title: 'Stress Management',
            tasks: [
              'Learn and practice breathing exercises',
              'Implement the Pomodoro Technique',
              'Schedule regular breaks throughout the day',
              'Start a gratitude journal'
            ]
          },
          {
            week: 3,
            title: 'Communication Skills',
            tasks: [
              'Practice assertive communication',
              'Have honest conversations with your supervisor',
              'Join a professional support group',
              'Seek feedback on workload management'
            ]
          },
          {
            week: 4,
            title: 'Long-term Wellness',
            tasks: [
              'Develop a sustainable work routine',
              'Create boundaries between work and personal time',
              'Plan regular self-care activities',
              'Evaluate career goals and alignment'
            ]
          }
        ],
        resources: [
          {
            type: 'book',
            title: 'The Stress-Proof Brain by Melanie Greenberg',
            description: 'Master your emotional response to stress using mindfulness and neuroplasticity'
          },
          {
            type: 'video',
            title: 'Workplace Stress Management - WHO Guidelines',
            description: 'Evidence-based strategies from the World Health Organization'
          },
          {
            type: 'helpline',
            title: 'Befrienders Kenya',
            description: 'Free emotional support helpline',
            contact: '0722 178 177'
          }
        ]
      },
      relationships: {
        title: 'Building Healthy Relationships',
        description: 'Strengthen communication and trust in your relationships',
        estimatedTime: '3-6 weeks',
        immediateSteps: [
          'Practice active listening for the next conversation',
          'Express one genuine appreciation to someone close',
          'Take a 20-minute walk to clear your mind',
          'Write down your feelings without judgment'
        ],
        healingPlan: [
          {
            week: 1,
            title: 'Self-Awareness',
            tasks: [
              'Identify your communication patterns',
              'Reflect on your relationship needs',
              'Practice emotional regulation techniques',
              'Start a relationship journal'
            ]
          },
          {
            week: 2,
            title: 'Communication Skills',
            tasks: [
              'Learn "I" statements for expressing feelings',
              'Practice active listening daily',
              'Set healthy boundaries',
              'Address one small conflict constructively'
            ]
          },
          {
            week: 3,
            title: 'Building Trust',
            tasks: [
              'Practice vulnerability in safe relationships',
              'Keep commitments and promises',
              'Express appreciation regularly',
              'Work on forgiveness (self and others)'
            ]
          }
        ],
        resources: [
          {
            type: 'book',
            title: 'The Seven Principles for Making Marriage Work by John Gottman',
            description: 'Research-based approach to building strong relationships'
          },
          {
            type: 'video',
            title: 'Healthy Relationships in African Context',
            description: 'Culturally relevant relationship guidance'
          }
        ]
      },
      // Add more categories as needed
      personal: {
        title: 'Personal Growth & Self-Esteem',
        description: 'Build confidence and develop a positive self-image',
        estimatedTime: '4-8 weeks',
        immediateSteps: [
          'Write down 5 things you like about yourself',
          'Practice positive self-talk for the next hour',
          'Do one small thing that makes you proud',
          'Celebrate a recent accomplishment'
        ],
        healingPlan: [
          {
            week: 1,
            title: 'Self-Discovery',
            tasks: [
              'Complete a values assessment',
              'Identify your strengths and talents',
              'Set one small, achievable goal',
              'Start a daily affirmation practice'
            ]
          },
          {
            week: 2,
            title: 'Mindset Shift',
            tasks: [
              'Challenge negative self-talk',
              'Practice self-compassion exercises',
              'Keep a success journal',
              'Learn from setbacks without self-blame'
            ]
          }
        ],
        resources: [
          {
            type: 'book',
            title: 'Self-Compassion by Kristin Neff',
            description: 'Learn to treat yourself with kindness and understanding'
          }
        ]
      }
    }

    return solutionsMap[category] || solutionsMap.work
  }

  const toggleStepCompletion = (stepIndex, weekIndex = null) => {
    const stepId = weekIndex !== null ? `${weekIndex}-${stepIndex}` : `immediate-${stepIndex}`
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  if (!currentInput) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card>
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">No input found. Please share your thoughts first.</p>
            <Button onClick={() => navigate('/input')} className="mt-4">
              Share Your Thoughts
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const solutions = getSolutionsForCategory(currentInput.category)

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
              <CardTitle className="text-primary">{solutions.title}</CardTitle>
            </div>
            <CardDescription>{solutions.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Estimated time: {solutions.estimatedTime}</span>
              </div>
              <Badge variant="secondary">{currentInput.category}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Immediate Relief */}
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
              {solutions.immediateSteps.map((step, index) => (
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

        {/* Healing Plan */}
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
            {solutions.healingPlan.map((week, weekIndex) => (
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

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>
              Books, videos, and support services to help your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {solutions.resources.map((resource, index) => (
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
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Steps</span>
                <span>{completedSteps.length} / {solutions.immediateSteps.length + solutions.healingPlan.reduce((acc, week) => acc + week.tasks.length, 0)}</span>
              </div>
              <Progress 
                value={(completedSteps.length / (solutions.immediateSteps.length + solutions.healingPlan.reduce((acc, week) => acc + week.tasks.length, 0))) * 100} 
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

