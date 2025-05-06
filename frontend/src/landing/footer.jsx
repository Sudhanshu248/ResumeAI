import "../App.css"

export default function Footer() {
    return (
  
            <div className="container border-top " id="no-print">
                <div className="rows">
                    
                    <div className="left-part">
                        <div className="footer-text p-4">
                            <h3 className="p-3 footer-text" style={{width: "100%"}}>AI Powered Resume <br /> Builder</h3>
                            <p className="ps-3 pe-3">Let’s create your AI-powered resume for your next big job.</p>
                        </div>


                        <div className="links">
                            <div className="sub-link  text-center">
                                <h5 className="footer" style={{paddingBottom: "0.8rem"}}>Quick Links</h5>
                                <a href="" className="text-decoration-none">Home</a> <br />
                                <a href="" className="text-decoration-none">Templates</a><br />
                                <a href="" className="text-decoration-none">Pricing</a><br />
                                <a href="" className="text-decoration-none">Contact</a><br />
                            </div>
                        </div>
                    </div>

                    <div className="right-part">
                        <div className="links">
                            <div className="sub-link text-center">
                                <h5 className="footer" style={{paddingBottom: "0.8rem"}}>Resources</h5>
                                <a href="" className="text-decoration-none">Blog</a> <br />
                                <a href="" className="text-decoration-none">FAQs</a><br />
                                <a href="" className="text-decoration-none">Privacy Policy</a><br />
                                <a href="" className="text-decoration-none">Terms of Service</a><br />
                            </div>
                        </div>

                        <div className="links">
                            <div className="sub-link  text-center">
                                <h5 className="footer" style={{paddingBottom: "0.8rem"}}>Follow us</h5>
                                <div className="d-flex flex-direction-column m-3">
                                    <a href="" className=" m-2"><i className="fa-brands fa-instagram"></i></a> <br />
                                    <a href="" className="m-2"><i className="fa-brands fa-linkedin-in"></i></a><br />
                                    <a href="" className="m-2"><i className="fa-regular fa-envelope"></i></a><br />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                    <div className="row">
                        <div className="text-center pb-3">
                            <p style={{marginTop: "10px"}}>@2025, ResumeAI Builder. All rights reserved.</p>
                        </div>
                    </div>

            </div>
    
    )
}