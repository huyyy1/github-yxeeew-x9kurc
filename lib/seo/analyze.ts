import axios from 'axios'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

async function makeOpenAIRequest(messages: { role: string; content: string }[]) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to get AI response')
    }
    throw error
  }
}

export async function analyzeBlogContent(content: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are an SEO expert analyzing blog content for optimization opportunities.',
    },
    {
      role: 'user',
      content: `Please analyze this blog content and provide specific recommendations for SEO improvement:

${content}

Focus on:
1. Keyword optimization
2. Content structure
3. Meta description suggestions
4. Internal linking opportunities
5. Readability improvements`,
    },
  ]

  return makeOpenAIRequest(messages)
}

export async function analyzeSitemap(urls: string[]): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are an SEO expert analyzing website structure and content coverage.',
    },
    {
      role: 'user',
      content: `Please analyze these URLs and provide recommendations for sitemap optimization:

${urls.join('\n')}

Focus on:
1. Content gaps
2. URL structure
3. Navigation hierarchy
4. Content siloing
5. Missing important pages`,
    },
  ]

  return makeOpenAIRequest(messages)
}

interface PerformanceMetrics {
  lcp: string
  fid: string
  cls: string
}

export async function analyzePerformance(metrics: PerformanceMetrics): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are an SEO expert analyzing Core Web Vitals and performance metrics.',
    },
    {
      role: 'user',
      content: `Please analyze these Core Web Vitals metrics and provide optimization recommendations:

Largest Contentful Paint (LCP): ${metrics.lcp}s
First Input Delay (FID): ${metrics.fid}ms
Cumulative Layout Shift (CLS): ${metrics.cls}

Focus on:
1. Performance impact on SEO
2. Specific optimization suggestions
3. Priority improvements
4. Technical implementation tips
5. Expected impact of improvements`,
    },
  ]

  return makeOpenAIRequest(messages)
}