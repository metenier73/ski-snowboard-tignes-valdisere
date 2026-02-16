import { useState } from 'react'
import Logo from '@/assets/Logo.png'
import QRCode from '@/assets/qr-code.png'
import BookingWidget from '@/components/booking/BookingWidget.jsx'
import RAGAssistant from '@/components/rag/RAGAssistant.jsx'
import { Button } from '@/components/ui/button.jsx'

export default function App() {
  const [isRAGOpen, setIsRAGOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <img src={Logo} alt="Tignes logo" className="h-6 w-6 object-contain" loading="lazy" decoding="async" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Myriam Ski
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Private ski and snowboard lessons in Val d'Isère 🏔️
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Enjoy private lessons in Val d'Isère, in the heart of one of the most beautiful ski areas in the Alps. Whether you want to learn the basics, perfect your technique, or explore new sensations, I'll guide you on the legendary slopes of Espace Killy with personalized and supportive instruction ❄️✨.
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Ski and snowboard lessons for all levels 🎯
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              My ski and snowboard lessons in Tignes – Val d'Isère are suitable for beginners as well as experienced skiers and riders looking to improve their performance 🏂🔥. The goal: to progress effectively, gain confidence, and above all, have fun on the snow 😄.
            </p>
            <a href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4">
                Book My Lesson
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose a private lesson in Tignes – Val d'Isère? ⭐
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                👤
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Personalized Private Lessons</h3>
              <p className="text-gray-600">Tailored instruction adapted to your level and goals</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                🏆
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certified and Passionate Instructor</h3>
              <p className="text-gray-600">State-certified with extensive teaching experience</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapid Progress and Safe Supervision</h3>
              <p className="text-gray-600">Quick improvement with professional safety standards</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                🏔️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover the Most Beautiful Areas</h3>
              <p className="text-gray-600">Tignes Le Lac, Val Claret, and Val d'Isère</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                📍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Schedule and Meeting Point</h3>
              <p className="text-gray-600">Adapted to your availability and preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Myriam 🏔️⛷️💻
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🌟 My Story
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  My name is Myriam Metenier, born in Lyon and living in the Tarentaise Valley for over 32 years. The mountains are not just my home: they are my playground for expression, learning, and sharing 🌲❄️.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  ⛷️🏂 Teaching Expertise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Known for my expertise, teaching methods, and deep connection to the mountains, I teach alpine skiing and snowboarding to children and adults alike. I guide each student with a personalized approach, adapted to their level, goals, and individual needs.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🏃‍♀️🔥 Athletic Background
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  From a very young age, sport shaped my path. Raised in a high-level sports environment, I focused on running – middle-distance, achieving a French record at 15. Pushing my limits has always been a core value for me: surpassing myself, and helping others reach their full potential.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🎓 Professional Background
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  After graduating with a degree in chemistry, my deep-seated need to be close to the mountains led me to settle permanently in the Tarentaise region. I earned my State Diploma in Alpine Skiing, after starting as an instructor at age 16.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  💻 Tech Expertise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  In parallel, I built a solid career in new technologies. Holding a BTS in IT Services for Organizations, I found a valuable balance between field work and analytical thinking. This naturally led me to a Master's degree in Infrastructure and Cloud Administration.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  🌿🧠 Holistic Approach
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Deeply interested in fostering greater self-awareness, I earned degrees in naturopathy and psychoanalysis, enriching my understanding of human nature, its mechanisms, and its potential.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">4,500+</div>
              <div className="text-gray-600">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Ski Lessons ⛷️❄️
              </h3>
              <p className="text-xl text-gray-700 mb-8 text-center">
                Discover the joy of alpine skiing with lessons adapted to all levels, from beginner to expert!
              </p>

              {/* Beginner Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">🌱 Beginners</h4>
                <p className="text-gray-600 mb-4">For skiers discovering alpine skiing.</p>
                <p className="text-gray-700 mb-4">You will learn:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>🎿 Equipment setup and adjustment (boots, skis, poles)</li>
                  <li>⚖️ Basic stance and balance</li>
                  <li>⛷️ Straight gliding and first sensations</li>
                  <li>↩️ Braking techniques (snowplow) and first turns</li>
                </ul>
                <p className="text-gray-700 font-semibold">🎯 Objective: acquire the basics of skiing, gain confidence, and descend gentle slopes safely 🛡️.</p>
              </div>

              {/* Intermediate Section */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">🎯 Intermediate level</h4>
                <p className="text-gray-600 mb-4">For those who wish to improve their technique.</p>
                <p className="text-gray-700 mb-4">On the agenda:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>🔄 Parallel turns and smooth transitions</li>
                  <li>🏁 Improved speed and trajectory control</li>
                  <li>🎯 Balance training</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Snowboard Lessons 🏂❄️
              </h3>
              <p className="text-xl text-gray-700 mb-8 text-center">
                Master snowboarding with personalized instruction for all levels!
              </p>

              {/* Beginner Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">🌱 Beginners</h4>
                <p className="text-gray-600 mb-4">For those discovering snowboarding.</p>
                <p className="text-gray-700 mb-4">You will learn:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>🏂 Equipment setup and adjustment</li>
                  <li>⚖️ Basic stance and balance</li>
                  <li>🏂 First glides and turns</li>
                  <li>↩️ Braking techniques</li>
                </ul>
                <p className="text-gray-700 font-semibold">🎯 Objective: acquire the basics of snowboarding, gain confidence, and descend gentle slopes safely 🛡️.</p>
              </div>

              {/* Intermediate Section */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">🎯 Intermediate level</h4>
                <p className="text-gray-600 mb-4">For those who wish to improve their technique.</p>
                <p className="text-gray-700 mb-4">On the agenda:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>🔄 Linked turns and smooth transitions</li>
                  <li>🏁 Improved speed and trajectory control</li>
                  <li>🎯 Balance training</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📅 Book by Date
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Check real-time availability and book your lesson
            </p>
          </div>

          {/* Interactive booking widget */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Availability Calendar</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select a date to see available time slots
              </p>
            </div>
            <BookingWidget 
              bookingUrl="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📞 Contact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question? Feel free to contact me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                📧
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">By Email</h3>
              <p className="text-gray-600 mb-4">myriam.ski@example.com</p>
              <Button className="w-full">Send Message</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">By Phone</h3>
              <p className="text-gray-600 mb-4">+33 6 12 34 56 78</p>
              <Button className="w-full">Call Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={Logo} alt="Tignes logo" className="h-10 w-10 object-contain mb-4 mx-auto" loading="lazy" decoding="async" />
              <span className="text-lg font-semibold">Myriam Ski</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Prices</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Availability</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Social Media</h4>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">
              © 2025 Myriam Ski. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Assistant RAG */}
      <RAGAssistant 
        isOpen={isRAGOpen} 
        onClose={() => setIsRAGOpen(false)} 
      />
    </div>
  )
}
