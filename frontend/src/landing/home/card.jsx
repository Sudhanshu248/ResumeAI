import "./home.css";

export default function Card() {
    return (
        <>
            <div className="container text-start  card-container">
                <div className="row cards">

                    <div className="col">
                        <div className="card p-3 border border-0 h-100 rounded-4" >
                            <div className="card-logo fs-3 ">
                                <i className="fa-brands fa-react card-logo-1"></i>
                            </div>
                            <h1 className="fs-4 ">Create Your Template</h1>
                            <p>Starting  by the  SignIn. Our single, professionally designed template ensures a clean and consistent look for all users.</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card p-3 border border-0 h-100 rounded-4" >
                            <div className="card-logo fs-3 ">
                                <i className="fa-solid fa-pen-to-square card-logo-2"></i>
                            </div>
                            <h1 className="fs-4 ">Update Your Information</h1>
                            <p>Enter your personal details, work experience, education, and skills into the provided form. Our AI assists you in filling out each section accurately and effectively.</p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card p-3 border border-0 h-100 rounded-4" >
                            <div className="card-logo fs-3 ">
                                <i className="fa-solid fa-share-nodes card-logo-1"></i>
                            </div>
                            <h1 className="fs-4">Share Your Resume
                            </h1>
                            <p> After completing your resume, save it securely and generate a shareable link. Easily update your information anytime and share the link with potential employers or download it in a preferred format.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}