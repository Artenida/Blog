import { FaUser } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

type AccountRoutes = {
  path: string;
  name: string;
}

const navBarRoutes: AccountRoutes[] = [
{
  path: '/signIn',
  name: 'Log In'
}
];

const Account = () => {
  const location = useLocation(); // Invoke the useLocation hook
  const active = 'text-lg font-bold text-xl text-custom-color3 leading-6 border-b-2 border-custom-color2'
  const inActive = 'hidden md:block text-xl rounded border-custom-color2 text-xl hover:text-custom-color3 hover:border-b-2 hover:border-custom-color3 text-custom-color2'
  return (
    <div>
      <div className="flex justify-center align-center gap-2">
        <div className="rounded-full border-2 border-custom-color2 text-custom-color2 text-3xl w-9 h-9
                        flex items-center justify-center cursor-pointer
                        hover:border-custom-color3 hover:text-custom-color3 transition-all duration-200">
          <NavLink to="/"><FaUser style={{ fontSize: '20px' }}/></NavLink>
        </div>
        {/* <NavLink to="signIn"><button>Log In</button></NavLink> */}
        <ul>
            {
              navBarRoutes.map((item, index) => (
                <NavLink key={index} to={item.path}>
                  <li className={location.pathname === item.path ? active : inActive}>{item.name}</li>
                </NavLink>
              ))
            }
          </ul>   
      </div>     
    </div>
    )
}

export default Account;