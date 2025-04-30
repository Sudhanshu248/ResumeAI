import React from "react";

export default function PersonalInfo({ resumeData }) {

    return (
        <div className="pe-3 ps-3 pt-3  m-0">
            <h2 className="text-center fs-4">{resumeData.personalInfo?.firstName} {resumeData.personalInfo?.lastName}</h2>
            <h2 className="text-center fs-5">{resumeData.personalInfo?.jobTitle}</h2>
            <p className="text-center fw-600">{resumeData.personalInfo?.address}</p>
            <div className="d-flex justify-content-between align-items-center">
                <p>{resumeData.personalInfo?.phone}</p>
                <p>{resumeData.personalInfo?.email}</p>
            </div>
            <div className="m-0" style={{border:`1px solid ${resumeData.themeColor}`,borderColor:resumeData.themeColor}} ></div>
        </div>
    )
}
