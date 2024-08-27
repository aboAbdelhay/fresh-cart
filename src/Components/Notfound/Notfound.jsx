import { Link } from "react-router-dom";
import notfound from "../../assets/images/notFound404.png";
export default function Notfound() {
  return (
    <>
      <div className="center flex-wrap flex-col ">
        <img src={notfound} alt="notfound page" />
        <Link
          to="/"
          className="w-40 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
        >
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
      </div>
    </>
  );
}
