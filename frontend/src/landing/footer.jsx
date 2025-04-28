export default function Footer() {
    return (
        <>
            <div className="container border-top">
                <div className="row">
                    <div className="col-4 p-4">
                        <h3 className="p-3 footer-text">AI Powered Resume <br /> Builder</h3>
                        <p className="ps-3 pe-3">Let’s create your AI-powered resume for your next big job.</p>
                    </div>

                    <div className="col-2"></div>

                    <div className="col-2 p-5 text-center">
                        <h5 className="" style={{color: "Black", paddingBottom: "0.8rem"}}>Quick Links</h5>
                        <a href="" className="text-decoration-none">Home</a> <br />
                        <a href="" className="text-decoration-none">Templates</a><br />
                        <a href="" className="text-decoration-none">Pricing</a><br />
                        <a href="" className="text-decoration-none">Contact</a><br />
                    </div>

                    <div className="col-2 p-5 text-center">
                        <h5 className="" style={{color: "Black", paddingBottom: "0.8rem"}}>Resources</h5>
                        <a href="" className="text-decoration-none">Blog</a> <br />
                        <a href="" className="text-decoration-none">FAQs</a><br />
                        <a href="" className="text-decoration-none">Privacy Policy</a><br />
                        <a href="" className="text-decoration-none">Terms of Service</a><br />
                    </div>

                    <div className="col-2 p-5 text-center">
                        <h5 className="" style={{color: "Black", paddingBottom: "0.8rem"}}>Follow us</h5>
                        <div className="d-flex flex-direction-column m-3">
                        <a href="" className=" m-2" ><i class="fa-brands fa-instagram"></i></a> <br />
                        <a href="" className="m-2"><i class="fa-brands fa-linkedin-in"></i></a><br />
                        <a href="" className="m-2"><i class="fa-regular fa-envelope"></i></a><br />

                        </div>
                    </div>

                    <div className="row">
                        <div className="text-center pb-3">
                            <p>@2025, ResumeAI Builder. All rights reserved.</p>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}