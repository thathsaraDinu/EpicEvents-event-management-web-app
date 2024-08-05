import { Link } from "react-router-dom";

function ErrorPage(){
    return (
        <div className="p-5">
            <div className="font-semibold">Erorr 404, Page not found</div>
            <Link to={'/'} className="m-4, p-2 italic">Go Back to Homepage</Link>
        </div>
    )
}

export default ErrorPage;