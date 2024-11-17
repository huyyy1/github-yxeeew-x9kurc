"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { analyzeBlogContent } from '@/lib/seo/analyze'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function BlogAnalysis() {
  const [content, setContent] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some blog content to analyze.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const result = await analyzeBlogContent(content)
      setAnalysis(result)
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze content",
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
          <CardTitle>Blog Content Analysis</CardTitle>
          <CardDescription>
            Analyze your blog content for SEO optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Content
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