"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogAnalysis } from './BlogAnalysis'
import { SitemapAnalysis } from './SitemapAnalysis'
import { PerformanceInsights } from './PerformanceInsights'
import { ConfigEditor } from './ConfigEditor'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function SEOGPTDashboard() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkApiKey = async () => {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        toast({
          title: "API Key Missing",
          description: "Please set your OpenAI API key in the environment variables.",
          variant: "destructive"
        })
      }
    }

    checkApiKey()
  }, [toast])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
        <p className="text-muted-foreground">
          AI-powered SEO analysis and optimization tools
        </p>
      </div>

      <Tabs defaultValue="blog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blog">Blog Analysis</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-4">
          <BlogAnalysis />
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <SitemapAnalysis />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceInsights />
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <ConfigEditor />
        </TabsContent>
      </Tabs>

      {loading && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  )
}