import { Link, } from 'react-router';
import { UseAuth } from '../../hooks/useAuth';
import AuthMenu from './AuthMenu';
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useState } from 'react';


const NavBar = () => {   
   const [open, setOpen] = useState(false);
  const {user} = UseAuth();

  const toggleMenu = () => {  
    setOpen((prev) => !prev)
  }
  return (
    <header className="bg-white shadow-md relative ">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-3xl font-bold text-gray-800">
          Store
        </Link>

         {user ? <AuthMenu/> : <div className="space-x-4 hidden lg:flex">
             
              <Link to="/auth/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Register
                </button>
              </Link>
            </div>
           
        }
        <button className='md:hidden' onClick={toggleMenu}> 
        <IoMdMenu fontSize={30} />
        </button>
       
      </nav>

      {open && (
        <nav className='fixed inset-0 z-40 h-[300px] w-full bg-blue-900 p-5 space-y-5'>
          <div>
            
          </div>
          
          <IoMdClose fontSize={30} onClick={toggleMenu} />
          <menu>
          {user ? <AuthMenu/> : <div className="space-x-4 flex flex-col gap-4 items-center justify-center">
              <Link to="/auth/login">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/auth/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Register
                </button>
              </Link>
            </div>
            }
          </menu>
         
        </nav>
      )}

     
    </header>
  );
};

export default NavBar;
