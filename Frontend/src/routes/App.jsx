import { Outlet } from "react-router-dom"
import { Footer} from "./components/footer"
import { HeaderBox } from "./components/header"


export const App=()=> {
    return (
      <div>
        <HeaderBox/>
        <main className=" min-h-[84vh] bg-[#FFFDF5]">
        <Outlet/>
        </main>
  z
      </div>
    )
}


