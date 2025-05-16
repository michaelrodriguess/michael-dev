"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Bookmark, Clock, Heart, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { parseStringPromise } from "xml2js"
import { Loader2 } from "lucide-react"
import Header from "@/components/Header"

type Post = {
  id: string
  title: string
  link: string
  pubDate: string
  content: string
  category: string
  readTime: number
  author: {
    name: string
    avatar: string
    bio: string
  }
  image: string
}

export default function ArticlePage() {
  const params = useParams()
  const id = params.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          "https://api.allorigins.win/get?url=" + encodeURIComponent("https://medium.com/feed/@michael.rodrigues"),
        )

        if (!res.ok) throw new Error("Erro ao buscar o feed")

        const data = await res.json()

        if (!data.contents) throw new Error("Conteúdo vazio do feed")

        const result = await parseStringPromise(data.contents, {
          explicitArray: false,
        })

        const items = result?.rss?.channel?.item
        if (!items) throw new Error("Itens do feed não encontrados")

        const parsedPosts = Array.isArray(items) ? items : [items]

        // Extract categories from content if possible
        const extractCategory = (content: string): string => {
          // This is a simple example - you might need to adjust based on your Medium content
          if (content.includes("development") || content.includes("programming")) return "Development"
          if (content.includes("technology") || content.includes("tech")) return "Technology"
          if (content.includes("design") || content.includes("ui") || content.includes("ux")) return "Design"
          if (content.includes("career") || content.includes("job")) return "Career"
          return "General"
        }

        const calculateReadTime = (content: string): number => {
          const wordsPerMinute = 200
          const textContent = content.replace(/<[^>]*>/g, "")
          const wordCount = textContent.split(/\s+/).length
          return Math.ceil(wordCount / wordsPerMinute)
        }

        const extractImage = (content: string): string => {
          const imgRegex = /<img[^>]+src="([^">]+)"/
          const match = content.match(imgRegex)
          return match ? match[1] : "/placeholder.svg?height=600&width=1200"
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const postsData: Post[] = parsedPosts.map((item: any, index: number) => {
          const content = item["content:encoded"] || ""
          const postId = item.guid?._?.split("/").pop() || index.toString()

          return {
            id: postId,
            title: item.title || "Sem título",
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString("pt-BR"),
            content: content,
            category: extractCategory(content),
            readTime: calculateReadTime(content),
            author: {
              name: "Michael Rodrigues",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Developer and writer sharing insights about technology, programming, and web development.",
            },
            image: extractImage(content),
          }
        })

        // Find the post with the matching ID
        const foundPost = postsData.find((post) => post.id === id)
        setPost(foundPost || null)
      } catch (err) {
        console.error("Erro ao buscar post:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p className="mb-8">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#2E2F33] text-white">
      <Header />
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <article className="mx-auto max-w-3xl">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {post.pubDate} · {post.readTime} min read
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg?height=600&width=1200"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="border-t pt-8 mt-10">
            <h3 className="text-xl font-semibold mb-4">About the author</h3>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{post.author.name}</div>
                <p className="text-muted-foreground mt-1">{post.author.bio}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-b py-8 my-10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Share this article</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6">Discussion</h3>
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  className="w-full min-h-[100px] p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Share your thoughts..."
                />
                <div className="flex justify-end mt-2">
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t py-10">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Medium Blog. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
