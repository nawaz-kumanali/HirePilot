import { Link } from 'react-router-dom'
import { Rocket } from "lucide-react";
import './logo.scss'

const Logo = () => {
    return (

        <Link to={"/"} >
            <div className="logo-box">
                <Rocket size={24} className="logo-icon" />
                <span className="logo-text">HirePilot.</span>
            </div>
        </Link>
    )
}

export default Logo