import Card from "../components/card";
import Sidebar from "../components/sidebar";
import "../styles/home.module.css"

export default function Home() {
    return (
        <div className="">
            <div className="main-layout">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container">
                    <h1>Home</h1>
                    <Card />
                </div>
            </div>
        </div>

    )
}