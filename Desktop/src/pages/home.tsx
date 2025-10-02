import Card from "../components/card";
import Sidebar from "../components/sidebar";
import "../styles/home.css"

export default function Home() {
    return (
        <div className="containerGeralHome">
            <div className="containerSidebarHome">
                <Sidebar />
            </div>
            <div className="containerHome">
                <h1>Home</h1>
                <Card />
            </div>
        </div>
    )
}