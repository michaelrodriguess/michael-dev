"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Share2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseStringPromise } from "xml2js"
import Header from "@/components/Header"
import { toast } from "sonner"
import DOMPurify from "dompurify"

type Post = {
  id: string
  title: string
  link: string
  pubDate: string
  content: string
  readTime: number
  author: {
    name: string
    avatar: string
    bio: string
  }
  image: string
}

type XmlItem = {
  title: string
  link: string
  pubDate: string
  guid: { _: string }
  "content:encoded": string
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
  return match?.[1] ?? "/placeholder.svg?height=600&width=1200"
}

const removeFirstFigure = (content: string): string => {
  return content.replace(/<figure>.*?<\/figure>/i, "")
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
    if (!id) {
      return;
    }

    const fetchPost = async () => {
      try {
        const cachedPosts = sessionStorage.getItem("mediumPostsCache")
        let postsData: Post[] = []

        if (cachedPosts) {
          postsData = JSON.parse(cachedPosts)
        } else {
          const res = await fetch(
            "https://api.allorigins.win/get?url=" + encodeURIComponent("https://medium.com/feed/@michael.rodrigues")
          )
          if (!res.ok) {
            throw new Error("Erro ao buscar o feed")
          }

          const data = await res.json()
          if (!data.contents) {
            throw new Error("Conteúdo vazio do feed")
          }
          const result = await parseStringPromise(data.contents, { explicitArray: false })
          const items: XmlItem[] = Array.isArray(result?.rss?.channel?.item) ? result.rss.channel.item : [result.rss.channel.item];
          
          if (!items) throw new Error("Itens do feed não encontrados")

          postsData = items.map((item, index) => {
            const content = item["content:encoded"] ?? ""
            const postId = item.guid?._?.split("/").pop() ?? index.toString()

            return {
              id: postId,
              title: item.title ?? "Sem título",
              link: item.link,
              pubDate: new Date(item.pubDate).toLocaleDateString("pt-BR"),
              content: removeFirstFigure(content),
              readTime: calculateReadTime(content),
              author: {
                name: "Michael Rodrigues",
                avatar: "/placeholder.svg?height=40&width=40",
                bio: "Desenvolvedor e escritor compartilhando ideias sobre tecnologia, programação e desenvolvimento web.",
              },
              image: extractImage(content),
            }
          })
          sessionStorage.setItem("mediumPostsCache", JSON.stringify(postsData))
        }

        const foundPost = postsData.find((p) => p.id === id)
        setPost(foundPost ?? null)
      } catch (err) {
        console.error("Erro ao buscar post:", err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2E2F33] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="w-full bg-[#2E2F33] text-white min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="mb-8 text-white/70">O artigo que você procura não existe ou foi removido.</p>
            <Button asChild>
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Blog
                </Link>
            </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full bg-[#2E2F33] text-white">
        <Header />

        <div
          className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 origin-left"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />

        <header className="sticky w-full top-0 z-40 border-b border-white/10 bg-[#2E2F33]/80 backdrop-blur">
          <div className="container flex h-16 items-center justify-between px-6 py-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog" className="flex items-center text-base font-medium hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar para o Blog
              </Link>
            </Button>

            <div className="flex items-center gap-6 min-w-[180px] justify-end">
              <div className="flex items-center gap-2 text-sm text-white/70 select-none">
                <Clock className="h-5 w-5" />
                <span>{post.readTime} min de leitura</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 transition-colors rounded"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => toast.success("Link copiado!"))
                    .catch(() => toast.error("Erro ao copiar o link."));
                }}
                aria-label="Copiar link da página"
              >
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-10">
          <article className="mx-auto max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">{post.title}</h1>

            <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />

            <div className="border-t border-white/10 pt-8 mt-10">
              <h3 className="text-xl font-semibold mb-4">Sobre o autor</h3>
              <div className="flex items-start gap-4">
                <div>
                  <div className="font-medium text-lg text-white">{post.author.name}</div>
                  <p className="text-white/70 mt-1">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>

      <style jsx global>{`
        .article-content {
          color: #d1d5db;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        .article-content p {
          margin-bottom: 1.25em;
        }
        .article-content h1,
        .article-content h2,
        .article-content h3 {
          color: #ffffff;
          font-weight: 600;
          margin-top: 2em;
          margin-bottom: 1em;
          line-height: 1.3;
        }
        .article-content a {
          color: #93c5fd;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .article-content a:hover {
          color: #ffffff;
        }
        .article-content strong {
          color: #ffffff;
          font-weight: 600;
        }
        .article-content ul,
        .article-content ol {
          margin-left: 1.5em;
          margin-bottom: 1.25em;
          padding-left: 1em;
        }
        .article-content li::marker {
          color: #d1d5db;
        }
        .article-content blockquote {
          margin-left: 1em;
          padding-left: 1em;
          border-left: 3px solid #6b7280;
          color: #9ca3af;
          font-style: italic;
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin-top: 2.5em;
          margin-bottom: 2.5em;
        }
        .article-content img[src*="medium.com/_/stat"] {
          display: none;
        }
      `}</style>
    </>
  )
}