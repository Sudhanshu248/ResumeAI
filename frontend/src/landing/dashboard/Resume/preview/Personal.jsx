import React from "react";

export default function PersonalInfo({ resumeInfo }) {

    return (
        <div className="pe-3 ps-3 pt-3  m-0">
            <h2 className="text-center fs-4">{resumeInfo.firstName} {resumeInfo.lastName}</h2>
            <h2 className="text-center fs-5">{resumeInfo.jobTitle}</h2>
            <p className="text-center fw-600">{resumeInfo.address}</p>
            <div className="d-flex justify-content-between align-items-center">
                <p>{resumeInfo.phone}</p>
                <p>{resumeInfo.email}</p>
            </div>
            <div className="m-0" style={{border:`1px solid ${resumeInfo.themeColor}`,borderColor:resumeInfo.themeColor}} ></div>
        </div>
    )
}
