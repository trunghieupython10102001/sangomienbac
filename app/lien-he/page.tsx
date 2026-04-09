import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-amber-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              LIÊN HỆ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hãy liên hệ với chúng tôi để được tư vấn và báo giá chi tiết
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Thông tin liên hệ</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 border border-green-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Hotline</h3>
                        <div className="space-y-2">
                          <a href="tel:0363974768" className="text-green-700 hover:text-green-800 font-semibold text-lg block transition-colors">
                            0363.974.768
                          </a>
                          <a href="tel:0969897297" className="text-green-700 hover:text-green-800 font-semibold text-lg block transition-colors">
                            0969.897.297
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 border border-blue-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Email</h3>
                        <a href="mailto:Sangomienbac86@gmail.com" className="text-blue-700 hover:text-blue-800 font-semibold transition-colors break-all">
                          Sangomienbac86@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300 border border-amber-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Địa chỉ Showroom</h3>
                        <p className="text-gray-700 leading-relaxed">26a, ngõ 31 Cầu Diễn, Xuân Phương, Hà Nội</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 border border-purple-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Giờ làm việc</h3>
                        <p className="text-gray-700 leading-relaxed">Thứ 2 - Chủ nhật: 8:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Gửi tin nhắn</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
