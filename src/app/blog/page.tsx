"use client";

import Header from "@/components/Header";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

type Post = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent("https://medium.com/feed/@michael.rodrigues")
        );

        if (!res.ok) throw new Error("Erro ao buscar o feed");

        const data = await res.json();

        if (!data.contents) throw new Error("Conteúdo vazio do feed");

        const result = await parseStringPromise(data.contents, {
          explicitArray: false,
        });

        const items = result?.rss?.channel?.item;

        if (!items) throw new Error("Itens do feed não encontrados");

        const parsedPosts = Array.isArray(items) ? items : [items];

        const postsData: Post[] = parsedPosts.map((item: any) => ({
          title: item.title || "Sem título",
          link: item.link,
          pubDate: new Date(item.pubDate).toLocaleDateString("pt-BR"),
          content: item["content:encoded"] || "",
        }));

        setPosts(postsData);
      } catch (err) {
        console.error("Erro ao buscar feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <main className="w-full bg-[#2E2F33] text-white">
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex flex-1 items-center justify-center px-4">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <Loader2 className="animate-spin text-white" />
            </div>
          ) : (
            <div className="w-full max-w-3xl">
              {posts.map((post) => (
                <div
                  key={post.link}
                  className="bg-[#23272A] p-4 rounded-lg shadow-md mb-6"
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-semibold hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-gray-400 text-sm mb-2">{post.pubDate}</p>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
