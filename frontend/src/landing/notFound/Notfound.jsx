import "./notFound.css";

export default function NotFound(){
    return(
        <>
            <div className="notFound container text-center">
                <div className="row">
                    <div className="notFound-text">404</div>
                    <h1 className="p-2">Sorry, Page Not Found!</h1>
                    <p className="pb-5">The page you requested could not be found.</p>
                </div>
            </div>
        </>
    )
}