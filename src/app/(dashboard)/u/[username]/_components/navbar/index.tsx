import Logo from "./logo"
import Actions from "./actions"

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-[49] bg-[#26262A] h-20 w-full flex justify-between items-center px-4 shadow-sm">
            <Logo />
            <Actions />
        </nav>
    )
}
 
export default Navbar