import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";


const NotFoundPage = () => {
  return (
    <div className="container">
      <Link className="linkBack" to="/"><AiOutlineHome /> Home page</Link>
      <h2 className="title">Page not found</h2>
    </div>
  )
}

export default NotFoundPage;