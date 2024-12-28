import { Footer } from "../components/footer"
import { Main } from "../components/main"

export const Home = ()=>{
    return(
        <section className="bg-stone-50 h-[full]  md:hidden justify-between min-h-screen">
        <Main/>
        <Footer/>                   
    </section>
    )
}