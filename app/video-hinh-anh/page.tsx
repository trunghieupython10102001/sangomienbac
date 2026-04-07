"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

const mediaItems = [
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/MONAS Cốt xanh N777.mp4",
    thumbnail: "/Video & hình ảnh thực tế/MONAS N776.JPG",
    title: "MONAS Cốt xanh N777",
    description: "Video thi công sàn gỗ MONAS cốt xanh"
  },
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/OPEN W93.mp4",
    thumbnail: "/Video & hình ảnh thực tế/OPEN W91.JPG",
    title: "OPEN W93",
    description: "Video hoàn thiện sàn gỗ OPEN W93"
  },
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/Sàn nhựa SPC Z001.mov",
    thumbnail: "/Video & hình ảnh thực tế/OPEN Z001.JPG",
    title: "Sàn nhựa SPC Z001",
    description: "Video thi công sàn nhựa SPC Z001"
  },
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/Video O13.mov",
    thumbnail: "/Video & hình ảnh thực tế/OPEN OX6.jpeg",
    title: "Video O13",
    description: "Video hoàn thiện công trình"
  },
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/Video OX6.mov",
    thumbnail: "/Video & hình ảnh thực tế/OPEN OX6.jpeg",
    title: "Video OX6",
    description: "Video thi công sàn gỗ xương cá OX6"
  },
  {
    type: "video",
    src: "/Video & hình ảnh thực tế/video OX9.mov",
    thumbnail: "/Video & hình ảnh thực tế/OPEN OX8.JPG",
    title: "Video OX9",
    description: "Video hoàn thiện sàn gỗ xương cá OX9"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/MONAS N776(1).JPG",
    title: "MONAS N776",
    description: "Hình ảnh hoàn thiện sàn gỗ MONAS N776"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/MONAS N776.JPG",
    title: "MONAS N776",
    description: "Sàn gỗ MONAS N776 sau thi công"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/MONAS N778.JPG",
    title: "MONAS N778",
    description: "Hình ảnh hoàn thiện sàn gỗ MONAS N778"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN OX6.jpeg",
    title: "OPEN OX6",
    description: "Sàn gỗ xương cá OPEN OX6"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN OX8(1).JPG",
    title: "OPEN OX8",
    description: "Hình ảnh hoàn thiện sàn gỗ OPEN OX8"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN OX8.JPG",
    title: "OPEN OX8",
    description: "Sàn gỗ OPEN OX8 sau thi công"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN W91.JPG",
    title: "OPEN W91",
    description: "Hình ảnh hoàn thiện sàn gỗ OPEN W91"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN Z001.JPG",
    title: "OPEN Z001",
    description: "Sàn nhựa OPEN Z001 sau thi công"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/OPEN Z008.JPG",
    title: "OPEN Z008",
    description: "Hình ảnh hoàn thiện sàn nhựa OPEN Z008"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/PX99-2.JPG",
    title: "PX99",
    description: "Sàn gỗ PX99 sau thi công"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/PX99-3.jpeg",
    title: "PX99",
    description: "Hình ảnh hoàn thiện sàn gỗ PX99"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/z5734371078601_90d3ae5ed7edeff1f81738a260f34c34-1024x768.jpeg",
    title: "Công trình hoàn thiện",
    description: "Hình ảnh thực tế công trình"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/ỐP NANO 2.JPG",
    title: "Ốp NANO",
    description: "Ốp tường NANO hoàn thiện"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/ỐP NANO.PNG",
    title: "Ốp NANO",
    description: "Hình ảnh ốp tường NANO"
  },
  {
    type: "image",
    src: "/Video & hình ảnh thực tế/Ốp NANO.JPG",
    title: "Ốp NANO",
    description: "Ốp tường NANO sau thi công"
  }
];

export default function VideoHinhAnhPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "video" | "image">("all");

  const filteredItems = mediaItems.filter(item => 
    filter === "all" ? true : item.type === filter
  );

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-amber-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              THỰC TẾ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Video & Hình Ảnh Hoàn Thiện
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Những công trình thực tế đã thi công bởi Kho sàn gỗ Miền Bắc
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === "all"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Tất cả ({mediaItems.length})
              </button>
              <button
                onClick={() => setFilter("video")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === "video"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Video ({mediaItems.filter(i => i.type === "video").length})
              </button>
              <button
                onClick={() => setFilter("image")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === "image"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Hình ảnh ({mediaItems.filter(i => i.type === "image").length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-video bg-gray-100">
                  {item.type === "video" ? (
                    <>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedVideo(item.src)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all"
                      >
                        <div className="bg-amber-600 rounded-full p-4 group-hover:scale-110 transition-transform shadow-xl">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Không có nội dung nào</p>
            </div>
          )}
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      <section className="py-20 bg-gradient-to-br from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0tMTIgNmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTI0IDI0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bạn muốn thi công như thế này?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Liên hệ ngay để được tư vấn và báo giá miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:0363974768"
              className="group inline-flex items-center gap-3 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span>📞 0363.974.768</span>
            </a>
            <a
              href="tel:0969897297"
              className="group inline-flex items-center gap-3 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <span>📞 0969.897.297</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
