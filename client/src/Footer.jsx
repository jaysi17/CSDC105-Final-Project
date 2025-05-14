export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-[#1746a2] via-[#2563eb] to-[#1746a2] shadow-lg py-3 px-2 md:px-8">   
            <div className="container mx-auto text-center">
                <p className="text-sm text-white font-semibold">© {new Date().getFullYear()} Medenilla and Barandon. All rights reserved.</p>
                <p className="text-sm  text-white">Follow us on social media:</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                </div>
            </div>
        </footer>
    );
}   