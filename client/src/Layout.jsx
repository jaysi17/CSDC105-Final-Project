import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

//  Layout component that wraps the entire application
//  It includes the Header, Footer, and the main content area
//  The Outlet component is used to render the child routes
export default function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    //  Layout component that wraps the entire application
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!isAuthPage && <Header />}
      <main className={!isAuthPage ? "max-w-7xl mx-auto px-4 py-6" : ""}>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}
