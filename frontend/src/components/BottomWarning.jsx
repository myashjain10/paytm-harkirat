import { Link } from "react-router-dom";

export function BottomWarning({label, buttonText, to}){
    return(
        <p className="mt-4 text-center text-gray-600">
        {label}
            <Link to={to} className="text-blue-500 ml-1 hover:underline">
            {buttonText}
            </Link>
        </p>
    )
}