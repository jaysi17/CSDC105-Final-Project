import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

//  Layout component that wraps the entire application
//  It includes the Header, Footer, and the main content area
//  The Outlet component is used to render the child routes
export default function Layout() {
  return (
    //  Layout component that wraps the entire application
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
