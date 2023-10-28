import { ReactNode } from "react";

interface PrincipalProps {
  children: ReactNode

}
export function Principal({ children }: PrincipalProps) {
  return (

    <div className="flex bg-slate-800 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {children}
      </div>
    </div>
  )
}