"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { updateConfig } from '@/lib/config/actions'
import config from '@/config'

export function ConfigEditor() {
  const [formData, setFormData] = useState({
    appName: config.appName,
    appDescription: config.appDescription,
    domainName: config.domainName,
    seo: {
      title: {
        template: config.seo.title.template,
        default: config.seo.title.default
      },
      description: config.seo.description,
      keywords: config.seo.keywords.join(', ')
    },
    social: {
      twitter: config.social.twitter,
      facebook: config.social.facebook,
      instagram: config.social.instagram
    }
  })

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await updateConfig({
        ...formData,
        seo: {
          ...formData.seo,
          keywords: formData.seo.keywords.split(',').map(k => k.trim())
        }
      })

      toast({
        title: "Configuration Updated",
        description: "The changes have been saved successfully."
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update configuration",
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
          <CardDescription>
            Configure basic site information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="appName">Site Name</Label>
            <Input
              id="appName"
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="appDescription">Site Description</Label>
            <Textarea
              id="appDescription"
              value={formData.appDescription}
              onChange={(e) => setFormData({ ...formData, appDescription: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="domainName">Domain Name</Label>
            <Input
              id="domainName"
              value={formData.domainName}
              onChange={(e) => setFormData({ ...formData, domainName: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>
            Configure SEO-specific settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="titleTemplate">Title Template</Label>
            <Input
              id="titleTemplate"
              value={formData.seo.title.template}
              onChange={(e) => setFormData({
                ...formData,
                seo: {
                  ...formData.seo,
                  title: {
                    ...formData.seo.title,
                    template: e.target.value
                  }
                }
              })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="titleDefault">Default Title</Label>
            <Input
              id="titleDefault"
              value={formData.seo.title.default}
              onChange={(e) => setFormData({
                ...formData,
                seo: {
                  ...formData.seo,
                  title: {
                    ...formData.seo.title,
                    default: e.target.value
                  }
                }
              })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seo.description}
              onChange={(e) => setFormData({
                ...formData,
                seo: {
                  ...formData.seo,
                  description: e.target.value
                }
              })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Textarea
              id="keywords"
              value={formData.seo.keywords}
              onChange={(e) => setFormData({
                ...formData,
                seo: {
                  ...formData.seo,
                  keywords: e.target.value
                }
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Configure social media handles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="twitter">Twitter Handle</Label>
            <Input
              id="twitter"
              value={formData.social.twitter}
              onChange={(e) => setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  twitter: e.target.value
                }
              })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="facebook">Facebook Handle</Label>
            <Input
              id="facebook"
              value={formData.social.facebook}
              onChange={(e) => setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  facebook: e.target.value
                }
              })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input
              id="instagram"
              value={formData.social.instagram}
              onChange={(e) => setFormData({
                ...formData,
                social: {
                  ...formData.social,
                  instagram: e.target.value
                }
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Save Changes</Button>
    </form>
  )
}