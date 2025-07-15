import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Globe, Heart, Users, Shield } from 'lucide-react'

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState('english')
  const [responses, setResponses] = useState({})

  const steps = [
    {
      title: 'Choose Your Language',
      description: 'Select your preferred language for the app',
      component: LanguageSelection
    },
    {
      title: 'About You',
      description: 'Help us personalize your experience',
      component: PersonalInfo
    },
    {
      title: 'Mental Health Goals',
      description: 'What would you like to focus on?',
      component: Goals
    },
    {
      title: 'Privacy & Support',
      description: 'Your data is secure and private',
      component: Privacy
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem('mikecare_language', language)
      localStorage.setItem('mikecare_responses', JSON.stringify(responses))
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Mike Care Builds</h1>
          </div>
          <Progress value={(currentStep + 1) / steps.length * 100} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Current Step */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent 
              language={language}
              setLanguage={setLanguage}
              responses={responses}
              setResponses={setResponses}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function LanguageSelection({ language, setLanguage }) {
  return (
    <div className="space-y-4">
      <RadioGroup value={language} onValueChange={setLanguage}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="english" id="english" />
          <Label htmlFor="english" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>English</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="swahili" id="swahili" />
          <Label htmlFor="swahili" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Kiswahili</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

function PersonalInfo({ responses, setResponses }) {
  const handleChange = (key, value) => {
    setResponses(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Age Group</Label>
        <RadioGroup 
          value={responses.ageGroup || ''} 
          onValueChange={(value) => handleChange('ageGroup', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="18-25" id="18-25" />
            <Label htmlFor="18-25">18-25</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="26-35" id="26-35" />
            <Label htmlFor="26-35">26-35</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="36-50" id="36-50" />
            <Label htmlFor="36-50">36-50</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50+" id="50+" />
            <Label htmlFor="50+">50+</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function Goals({ responses, setResponses }) {
  const goals = [
    'Manage stress and anxiety',
    'Improve relationships',
    'Build self-confidence',
    'Better work-life balance',
    'Financial wellness',
    'Family support'
  ]

  const handleGoalToggle = (goal) => {
    const currentGoals = responses.goals || []
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal]
    
    setResponses(prev => ({ ...prev, goals: updatedGoals }))
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">What would you like to focus on? (Select all that apply)</Label>
      {goals.map((goal) => (
        <div key={goal} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={goal}
            checked={(responses.goals || []).includes(goal)}
            onChange={() => handleGoalToggle(goal)}
            className="rounded border-border"
          />
          <Label htmlFor={goal} className="text-sm">{goal}</Label>
        </div>
      ))}
    </div>
  )
}

function Privacy() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-medium">Your Privacy Matters</h4>
          <p className="text-sm text-muted-foreground">
            All your data is encrypted and stored securely. You control what you share.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Users className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-medium">Community Support</h4>
          <p className="text-sm text-muted-foreground">
            Connect with others on similar journeys while maintaining your privacy.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Heart className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <h4 className="font-medium">Professional Help</h4>
          <p className="text-sm text-muted-foreground">
            Access to licensed Kenyan therapists when you need additional support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Onboarding

