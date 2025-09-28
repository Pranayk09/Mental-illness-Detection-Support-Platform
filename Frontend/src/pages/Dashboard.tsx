import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar,
  Target,
  Heart,
  Book,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for demonstration
  const weeklyData = [
    { day: 'Mon', depression: 25, anxiety: 30, stress: 35 },
    { day: 'Tue', depression: 20, anxiety: 25, stress: 30 },
    { day: 'Wed', depression: 15, anxiety: 20, stress: 25 },
    { day: 'Thu', depression: 18, anxiety: 22, stress: 28 },
    { day: 'Fri', depression: 12, anxiety: 18, stress: 20 },
    { day: 'Sat', depression: 10, anxiety: 15, stress: 18 },
    { day: 'Sun', depression: 8, anxiety: 12, stress: 15 }
  ];

  const monthlyTrend = [
    { month: 'Jan', overall: 70 },
    { month: 'Feb', overall: 65 },
    { month: 'Mar', overall: 58 },
    { month: 'Apr', overall: 52 },
    { month: 'May', overall: 45 },
    { month: 'Jun', overall: 35 }
  ];

  const pieData = [
    { name: 'Meditation', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Exercise', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'Journaling', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Sleep', value: 20, color: 'hsl(var(--muted))' }
  ];

  const activities = [
    { 
      id: 1, 
      title: "Morning Meditation", 
      time: "10 minutes", 
      completed: true, 
      type: "meditation" 
    },
    { 
      id: 2, 
      title: "Gratitude Journal", 
      time: "5 minutes", 
      completed: true, 
      type: "journaling" 
    },
    { 
      id: 3, 
      title: "Evening Walk", 
      time: "20 minutes", 
      completed: false, 
      type: "exercise" 
    },
    { 
      id: 4, 
      title: "Deep Breathing", 
      time: "5 minutes", 
      completed: false, 
      type: "breathing" 
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Your Wellness Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your mental health journey and celebrate your progress
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/assessment">
                  New Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Wellness</p>
                  <p className="text-2xl font-bold text-success">72%</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-foreground">14 days</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep it up!
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Weekly Goals</p>
                  <p className="text-2xl font-bold text-foreground">3/4</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Almost there!
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resources Read</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                  <Book className="h-6 w-6 text-warning-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress */}
          <Card className="card-gradient shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Weekly Mental Health Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Bar dataKey="depression" fill="hsl(var(--primary))" name="Depression" />
                  <Bar dataKey="anxiety" fill="hsl(var(--secondary))" name="Anxiety" />
                  <Bar dataKey="stress" fill="hsl(var(--accent))" name="Stress" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="card-gradient shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                6-Month Wellness Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="overall" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity Breakdown and Today's Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Breakdown */}
          <Card className="card-gradient shadow-gentle">
            <CardHeader>
              <CardTitle>Weekly Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Self-Care Tasks */}
          <Card className="card-gradient shadow-gentle">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Self-Care Tasks</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      activity.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        activity.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}>
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary-soft rounded-lg">
                <p className="text-sm font-medium text-primary-deep mb-2">
                  Daily Progress: 50%
                </p>
                <Progress value={50} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;