import { Link, } from 'react-router';
import { UseAuth } from '../../hooks/useAuth';
import AuthMenu from './AuthMenu';


const NavBar = () => {

  const {user} = UseAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-3xl font-bold text-gray-800">
          E-Commerce
        </Link>

         {user ? <AuthMenu/> : <div className="space-x-4">
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
          
            
        
       

       
      </nav>

     
    </header>
  );
};

export default NavBar;
