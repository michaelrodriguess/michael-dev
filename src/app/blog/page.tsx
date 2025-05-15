"use client";

import Header from "@/components/Header";
import { Loader2 } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="w-full bg-[#2E2F33] text-white">
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="bg-[#3C3F45] p-8 rounded-2xl shadow-lg text-center max-w-md w-full animate-fade-in">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#86AB89]" />
            <h1 className="text-2xl font-bold mb-2">Working in Progress</h1>
            <p className="text-gray-300">
              The blog is being built with care. Amazing content will be here soon!            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
