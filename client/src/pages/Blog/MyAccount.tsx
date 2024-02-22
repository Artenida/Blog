import Sidebar from "../../components/Sidebar";
import background from "../../assets/about1.avif";

const MyAccount = () => {
  return (
    <div className="flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white opacity-30 inset-0"></div>
      <Sidebar />

<h2>My account</h2>
    </div>
  );
};

export default MyAccount;
