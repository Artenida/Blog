const Footer = () => {
    return (
        <footer className="bg-custom-color2 py-8 mt-12">
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
                <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">

                    {/* Category 1 */}
                    <div>
                        <p className="font-medium tracking-wide text-custom-color3">Photography Categories</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Portfolios</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Photography Tips</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Gear Reviews</a>
                            </li>
                        </ul>
                    </div>

                    {/* Category 2 */}
                    <div>
                        <p className="font-medium tracking-wide text-custom-color3">About Us</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Our Story</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Meet the Team</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Category 3 */}
                    <div>
                        <p className="font-medium tracking-wide text-custom-color3">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Photography Workshops</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Photography Courses</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Photography Equipment Store</a>
                            </li>
                        </ul>
                    </div>

                    {/* Category 4 */}
                    <div>
                        <p className="font-medium tracking-wide text-custom-color3">Follow Us</p>
                        <ul className="mt-2 space-y-2">
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Instagram</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Facebook</a>
                            </li>
                            <li>
                                <a href="/" className="text-custom-color1 transition-colors duration-300 hover:text-custom-color3">Twitter</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
