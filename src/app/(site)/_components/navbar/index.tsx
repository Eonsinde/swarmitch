import Logo from "./logo"
import Search from "./search"
import Actions from "./actions"

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-[49] bg-[#26262A] h-20 w-full flex justify-between items-center space-x-4 px-4 shadow-sm">
            <Logo />
            <Search />
            <Actions />
        </nav>
    )
}
 
export default Navbar