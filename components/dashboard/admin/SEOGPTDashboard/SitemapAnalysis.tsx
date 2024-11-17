"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { analyzeSitemap } from '@/lib/seo/analyze'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Plus, X } from 'lucide-react'

export function SitemapAnalysis() {
  const [urls, setUrls] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAddUrl = () => {
    if (!newUrl.trim()) return
    setUrls([...urls, newUrl.trim()])
    setNewUrl('')
  }

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (urls.length === 0) {
      toast({
        title: "URLs Required",
        description: "Please add some URLs to analyze.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const result = await analyzeSitemap(urls)
      setAnalysis(result)
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze sitemap",
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
          <CardTitle>Sitemap Analysis</CardTitle>
          <CardDescription>
            Analyze your sitemap for coverage and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter URL..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
            />
            <Button onClick={handleAddUrl} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {urls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1 bg-muted p-2 rounded-md text-sm">
                  {url}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveUrl(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleAnalyze} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Sitemap
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