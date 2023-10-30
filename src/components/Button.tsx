import { ButtonHTMLAttributes } from "react";
import { Loading } from "./Loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  loading: boolean

}
export function Button({ title, loading, ...rest }: ButtonProps) {
  return (

    <button
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
      {...rest}
      disabled={loading}
    >
      {loading ? <Loading /> : title}
    </button>
  )
}