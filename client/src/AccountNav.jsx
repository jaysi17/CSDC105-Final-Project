import { Link, useLocation } from "react-router-dom"

export default function AccountNav() {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];

    if(subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type=null) {
        let classes = 'inline-flex items-center gap-2 py-2 px-6 rounded-full text-base font-semibold transition-all duration-200';

        if (type === subpage) {
            classes += ' bg-[#2563eb] text-white shadow-md'; // blue active
        }
        else {
            classes += ' bg-blue-100 text-[#2563eb] hover:bg-blue-200'; // blue inactive
        }

        return classes;
    }
    return(
        <nav className="w-full flex justify-center mt-8 mb-10 gap-4">
            <Link to={'/account'} className={linkClasses('profile')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                My Profile 
            </Link>
            <Link to={'/account/bookings'} className={linkClasses('bookings')}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0Z" />
                </svg>
                My Bookings 
            </Link>
            <Link to={'/account/places'} className={linkClasses('places')}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
                My Accomodations
            </Link>
        </nav>
    )
}