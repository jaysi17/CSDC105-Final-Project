import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header stretches full width */}
      <Header />
      {/* Page content is centered and scaled */}
      <div className="max-w-7xl mx-auto px-4">
        <main className="mt-6 mb-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
