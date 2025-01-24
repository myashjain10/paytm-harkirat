export function InputwithLabel({label, placeholder, onChange, type="text"}){
    return(
        <div className="mb-4">
            <label htmlFor="first-name" className="block text-gray-700 px-2">
              {label}
            </label>
            <input
              onChange={onChange}
              type={type}
              className="w-full px-3 py-2 border rounded-lg hover:border-black"
              placeholder={placeholder}
            />
          </div>
    )
}