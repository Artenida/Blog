import { NavLink} from "react-router-dom";
import { FaUser } from "react-icons/fa";


const Account = () => {
  return (
    <div>
      <div className="flex justify-center align-center gap-2">
        <div className="rounded-full border-2 border-custom-color2 text-custom-color2 text-3xl w-9 h-9
                        flex items-center justify-center cursor-pointer
                        hover:border-custom-color3 hover:text-custom-color3 transition-all duration-200">
          <NavLink to="signIn"><FaUser style={{ fontSize: '20px' }}/></NavLink>
        </div>
        <NavLink to="signIn"><button className="hidden md:block rounded border-custom-color2 text-xl hover:text-custom-color3 hover:border-b-2 hover:border-custom-color3 text-custom-color2">Log In</button></NavLink>
      </div>     
    </div>
    )
}

export default Account;