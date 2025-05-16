"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Clock, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { parseStringPromise } from "xml2js"
import Header from "@/components/Header"

type Post = {
  id: string
  title: string
  link: string
  pubDate: string
  content: string
  excerpt: string
  readTime: number
  author: {
    name: string
    avatar: string
  }
  image: string
  featured?: boolean
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          "https://api.allorigins.win/get?url=" + encodeURIComponent("https://medium.com/feed/@michael.rodrigues")
        )
        if (!res.ok) throw new Error("Erro ao buscar o feed")
        const data = await res.json()
        const result = await parseStringPromise(data.contents, { explicitArray: false })
        const items = result?.rss?.channel?.item
        if (!items) throw new Error("Itens do feed não encontrados")

        const parsedPosts = Array.isArray(items) ? items : [items]

        const calculateReadTime = (content: string): number => {
          const wordsPerMinute = 200
          const textContent = content.replace(/<[^>]*>/g, "")
          const wordCount = textContent.split(/\s+/).length
          return Math.ceil(wordCount / wordsPerMinute)
        }

        const extractExcerpt = (content: string): string => {
          const textContent = content.replace(/<[^>]*>/g, "")
          return textContent.substring(0, 150) + "..."
        }

        const extractImage = (content: string): string => {
          const imgRegex = /<img[^>]+src=\"([^\">]+)\"/
          const match = content.match(imgRegex)
          return match ? match[1] : "/placeholder.svg?height=400&width=600"
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const postsData: Post[] = parsedPosts.map((item: any, index: number) => {
          const content = item["content:encoded"] || ""
          return {
            id: item.guid?._?.split("/").pop() || index.toString(),
            title: item.title || "Sem título",
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString("pt-BR"),
            content,
            excerpt: extractExcerpt(content),
            readTime: calculateReadTime(content),
            author: {
              name: "Michael Rodrigues",
              avatar: "/placeholder.svg?height=40&width=40"
            },
            image: extractImage(content),
            featured: index === 0
          }
        })

        setPosts(postsData);

      } catch (err) {
        console.error("Erro ao buscar feed:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeed()
  }, [])

  const featuredArticle = posts.find((post) => post.featured)
  const filteredArticles = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) && !post.featured
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="w-full bg-[#2E2F33] text-white">
      <Header />

      <main className="container px-4 py-8">
        {featuredArticle && (
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-6">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 group">
              <div className="lg:col-span-3 relative overflow-hidden rounded-xl">
                <Image
                  src={featuredArticle.image || "/placeholder.svg?height=600&width=1200"}
                  alt=""
                  width={800}
                  height={500}
                  className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="~absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <Badge className="mb-3 bg-primary hover:bg-primary/90">Destaque</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredArticle.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticle.readTime} min read</span>
                    <span>•</span>
                    <span>{featuredArticle.pubDate}</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center">
                <p className="text-lg text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                
                <Button asChild className="justify-center w-fit">
                  <Link href={`/blog/${featuredArticle.id}`}>
                    Read Article
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
                
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <div className="flex items-center flex-wrap gap-4">
            <h2 className="text-xl font-medium text-white">Latest Articles</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search by title..."
                className="bg-[#2E2F33] border border-muted text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>
          </div>
        </section>


      <section>
        {filteredArticles.length > 0 ? (
          <ArticleGrid articles={filteredArticles} />
        ) : (
          <p className="text-muted-foreground mt-4">No articles found for this title.</p>
        )}
      </section>

      </main>

      <footer className="py-10 text-center">
        <div className="container mx-auto px-4">
          <hr className="border-t border-[#C1C1C1]/30 mb-4" />
          <p className="text-[#C1C1C1] text-xs sm:text-sm">
            © Copyright 2024 - Michael Rodrigues. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function ArticleGrid({ articles }: { articles: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

function ArticleCard({ article }: { article: Post }) {
  return (
    <Link href={`/blog/${article.id}`} className="group">
      <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-tight line-clamp-2">{article.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
          <div className="flex flex-wrap items-center text-xs gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min</span>
            <span>•</span>
            <span>{article.pubDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
