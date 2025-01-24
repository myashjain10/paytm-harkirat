export function Button({label, onClick}){
    return(
        <button
            onClick={onClick}
            className="w-full bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
        >
        {label}
        </button>
    )

}