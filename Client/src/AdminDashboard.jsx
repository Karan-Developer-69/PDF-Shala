import { Route,  Routes } from "react-router-dom"
import { Sidebar } from "./DashboardComponents/Sidebar"
import { Dashboard } from "./DashboardComponents/Dashboard"
import { AddProducts } from "./DashboardComponents/AddProducts"
import { EditProducts } from "./DashboardComponents/EditProducts"
import { RemoveProducts } from "./DashboardComponents/RemoveProducts"



const AdminDashboard = () => {

    return <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-4/5 h-screen overflow-y-scroll">
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/add-products" element={<AddProducts/>} />
                <Route path="/remove-products" element={<RemoveProducts/>} />
                <Route path="/edit-products" element={<EditProducts/>} />
            </Routes>
        </div>
    </div>
}

export default AdminDashboard