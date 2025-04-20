import { useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";

export const Sidebar = () => {

    const [toggleProducts, setToggleProducts] = useState(false)

    return (
        <div className="w-1/5 bg-gray-200 h-screen">
                {/* Sidebar content goes here */}
                <Link to="/admin/dashboard">
                    <div className="bg-[#9037dc] hover:bg-[#9810fa] text-white font-bold py-2 px-4 rounded m-2">
                        Dashboard
                    </div>
                </Link>
                <div 
                    className={`flex flex-col bg-[#9037dc] mx-2 overflow-hidden transition-all duration-700  ease-in-out ${toggleProducts ? "max-h-96" : "max-h-10"}`}
                    onMouseOver={() => setToggleProducts(true)}
                    onMouseLeave={() => setToggleProducts(false)}
                    >
                    <div 
                        className="bg-[#9037dc] hover:bg-[#9810fa] text-white font-bold rounded py-2 px-4 relative flex items-center"
                        
                    >
                        Edit products
                        <span
                        className={`absolute right-6 transition-transform duration-300 ease-in-out ${
                            toggleProducts ? "rotate-90" : ""
                        }`}
                        >
                        <FaArrowRight />
                        </span>
                    </div>
                    <div className="text-white font-bold py-2 px-4 rounded m-2 flex flex-col gap-3">
                        <Link className="hover:bg-[#9810fa]" to="/admin/add-products">
                        Add Products
                        </Link>
                        <Link className="hover:bg-[#9810fa]" to="/admin/remove-products">
                        Remove Products
                        </Link>
                        <Link className="hover:bg-[#9810fa]" to="/admin/edit-products">
                        Edit Products
                        </Link>
                    </div>
                </div>

            </div>
    )
}
