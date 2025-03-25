import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useState } from 'react';
import Logo from './Logo';
import Menu from './Menu';

const NavBar = () => {   
   const [open, setOpen] = useState(false);

  const toggleMenu = () => {  
    setOpen((prev) => !prev);
  }

  return (
    <header className="bg-white relative">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center py-4 px-4">
        <Logo toggleMenu={toggleMenu} />

        <button className='md:hidden' onClick={toggleMenu}> 
          <IoMdMenu fontSize={30} />
        </button>

        <Menu menuStyle={"items-center gap-4 lg:flex hidden"} />
      </nav>

      {/* Mobile Menu */}
      {open && (
        <nav className='fixed inset-0 z-40 h-[250px] w-full bg-gray-200 p-5 rounded-b-2xl'>
          <div className='flex justify-between items-center'>
            <Logo toggleMenu={toggleMenu} /> 
            <IoMdClose fontSize={30} onClick={toggleMenu} />
          </div>
          <Menu menuStyle="w-full flex flex-col gap-4 pt-8" toggleMenu={toggleMenu} /> 
        </nav>
      )}
    </header>
  );
};

export default NavBar;
