import {Link} from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-16 w-16 mr-2" />
        </Link>
    )
}