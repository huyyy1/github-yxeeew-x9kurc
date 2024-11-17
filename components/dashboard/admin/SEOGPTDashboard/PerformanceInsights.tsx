"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { analyzePerformance } from '@/lib/seo/analyze'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface PerformanceMetrics {
  lcp: string
  fid: string
  cls: string
}

export function PerformanceInsights() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: '',
    fid: '',
    cls: ''
  })
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!metrics.lcp || !metrics.fid || !metrics.cls) {
      toast({
        title: "Metrics Required",
        description: "Please enter all performance metrics.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const result = await analyzePerformance(metrics)
      setAnalysis(result)
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze performance",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>
            Analyze Core Web Vitals and get optimization recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="lcp">Largest Contentful Paint (LCP)</Label>
              <Input
                id="lcp"
                placeholder="e.g., 2.5"
                value={metrics.lcp}
                onChange={(e) => setMetrics({ ...metrics, lcp: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fid">First Input Delay (FID)</Label>
              <Input
                id="fid"
                placeholder="e.g., 100"
                value={metrics.fid}
                onChange={(e) => setMetrics({ ...metrics, fid: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cls">Cumulative Layout Shift (CLS)</Label>
              <Input
                id="cls"
                placeholder="e.g., 0.1"
                value={metrics.cls}
                onChange={(e) => setMetrics({ ...metrics, cls: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Performance
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{analysis}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}