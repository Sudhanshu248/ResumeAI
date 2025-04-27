export default function Footer() {
    return (
        <>
            <div className="container border-top">
                <div className="row">
                    <div className="col">
                        <h1 className="p-3 footer-text">AI Powered Resume <br /> Generator</h1>
                        <p className="ps-3 pe-3">Let’s create your AI-powered resume for that next big job</p>
                    </div>
                    <div className="col">


                        <div className="row">
                            <h4 className="p-4">Contact Us</h4>
                            <div className="col fs-4 ">
                                <ul>
                                    <li>
                                        <i className="fa-brands fa-linkedin footer-logo-1" ></i>
                                        <p className="fs-6 fw-bold form-check-inline ">Linkedin</p>

                                    </li>
                                    <li>
                                        <i className="fa-brands fa-github footer-logo-2"></i>

                                        <p className="fs-6  form-check-inline">Github</p>
                                    </li>

                                </ul>
                            </div>

                            <div className="col fs-4 footer-contact">

                                <ul>
                                    <li>
                                        <i className="fa-solid fa-envelope footer-logo-3"></i>
                                        <p className="fs-6  form-check-inline">Email</p>
                                    </li>
                                    <li>
                                        <i className="fa-brands fa-instagram footer-logo-4"></i>
                                        <p className="fs-6  form-check-inline">Instagram</p>
                                    </li>
                                </ul>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}