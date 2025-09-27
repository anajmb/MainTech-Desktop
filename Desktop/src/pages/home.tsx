import Card from "../components/card";
import Sidebar from "../components/sidebar";

export default function Home() {
    return (
        <>
        {/* <div className="body"> */}
            <div className="main-layout">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container">
                    <h1>Home</h1>
                    <Card />
                </div>
            </div>
        {/* </div > */}
        </>
    )
}