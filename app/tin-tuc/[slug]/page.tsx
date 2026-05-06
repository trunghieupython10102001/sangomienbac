import { newsArticles } from "@/lib/news";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} - Kho sàn gỗ Miền Bắc`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Tin tức
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString("vi-VN")}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700">
            {article.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("| ")) {
                const rows = article.content
                  .split("\n")
                  .filter((line) => line.startsWith("| ") && !line.startsWith("|---"));
                if (index === article.content.split("\n").findIndex((l) => l.startsWith("| "))) {
                  const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim()) || [];
                  const dataRows = rows.slice(1);
                  return (
                    <div key={index} className="overflow-x-auto my-6">
                      <table className="w-full border-collapse border border-gray-200 text-sm">
                        <thead>
                          <tr className="bg-amber-50">
                            {headers.map((header, i) => (
                              <th key={i} className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataRows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              {row.split("|").filter(Boolean).map((cell, ci) => (
                                <td key={ci} className="border border-gray-200 px-4 py-3 text-gray-700">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return null;
              }
              if (paragraph.startsWith("|---")) return null;
              if (paragraph.startsWith("- **")) {
                const match = paragraph.match(/^- \*\*(.+?)\*\*(.*)$/);
                if (match) {
                  return (
                    <div key={index} className="flex gap-2 my-2 ml-4">
                      <span className="text-amber-500 mt-1">•</span>
                      <p className="text-gray-700">
                        <strong className="text-gray-900">{match[1]}</strong>
                        {match[2]}
                      </p>
                    </div>
                  );
                }
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <div key={index} className="flex gap-2 my-2 ml-4">
                    <span className="text-amber-500 mt-1">•</span>
                    <p className="text-gray-700">{paragraph.replace("- ", "")}</p>
                  </div>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.match(/^\d+\. /)) {
                const match = paragraph.match(/^(\d+)\. \*\*(.+?)\*\*(.*)$/);
                if (match) {
                  return (
                    <div key={index} className="flex gap-3 my-3 ml-4">
                      <span className="bg-amber-100 text-amber-800 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {match[1]}
                      </span>
                      <p className="text-gray-700">
                        <strong className="text-gray-900">{match[2]}</strong>
                        {match[3]}
                      </p>
                    </div>
                  );
                }
              }
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <p key={index} className="font-bold text-gray-900 my-4">
                    {paragraph.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-gray-700 my-3 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Xem tất cả tin tức
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
