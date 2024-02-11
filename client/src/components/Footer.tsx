import { Link } from 'react-router-dom';
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-custom-color3 py-8">
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
                <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">

                    {/* Category 1 */}
                    <div>
                        <p className="text-lg  tracking-wide text-custom-color2">Photography Categories</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Portfolios</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Photography tips</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Gear Reviews</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Category 2 */}
                    <div>
                        <p className="text-lg  tracking-wide text-custom-color2">About Us</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Our Story</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Meet the team</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Category 3 */}
                    <div>
                        <p className="text-lg tracking-wide text-custom-color2">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Photography Shops</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Photography Courses</Link>
                            </li>
                            <li>
                            <Link to='/' className="text-custom-color1 duration-300 hover:text-custom-color2">Photography Equipment Store</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Category 4 */}
                    <div>
                        <p className="text-lg tracking-wide text-custom-color2">Follow Us</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                            <Link to='/' className="flex align-center items-center gap-2 text-custom-color1 duration-300 hover:text-custom-color2"><IoLogoInstagram />Instagram</Link>
                            </li>
                            <li>
                            <Link to='/' className="flex align-center items-center gap-2 text-custom-color1 duration-300 hover:text-custom-color2"><FaTiktok />TikTok</Link>
                            </li>
                            <li>
                            <Link to='/' className="flex align-center items-center gap-2 text-custom-color1 duration-300 hover:text-custom-color2"><FaTwitter />Twitter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex justify-center align-center pt-9'>
                        <p className='text-custom-color2 text-sm'>© 2024 Writer. All Rights Reserved.</p>
                    </div>
        </footer>
    );
}

export default Footer;
