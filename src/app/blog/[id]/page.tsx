"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  Share2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { parseStringPromise } from "xml2js"
import Header from "@/components/Header"

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
          "https://api.allorigins.win/get?url=" + encodeURIComponent("https://medium.com/feed/@michael.rodrigues")
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

        const removeFirstImage = (content: string): string => {
          return content.replace(/<img[^>]+>/i, "")
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
            content: removeFirstImage(content),
            readTime: calculateReadTime(content),
            author: {
              name: "Michael Rodrigues",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Desenvolvedor e escritor compartilhando ideias sobre tecnologia, programação e desenvolvimento web.",
            },
            image: extractImage(content),
          }
        })

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
      <div className="min-h-screen bg-[#2E2F33] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
        <p className="mb-8">O artigo que você procura não existe ou foi removido.</p>
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
              <span>{post.readTime} min de leitura</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button> */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                      console.log("Link copiado!");
                      // você pode mostrar um toast ou algo visual se quiser
                    })
                    .catch((err) => {
                      console.error("Erro ao copiar link: ", err);
                    });
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>

            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <article className="mx-auto max-w-3xl">          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden">
            <Image
              src={post.image}
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
            <h3 className="text-xl font-semibold mb-4">Sobre o autor</h3>
            <div className="flex items-start gap-4">
              <div>
                <div className="font-medium text-lg">{post.author.name}</div>
                <p className="text-muted-foreground mt-1">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
