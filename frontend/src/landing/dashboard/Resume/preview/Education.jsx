export default function Education({ resumeData }) {
    return (
        <div className="ps-3 pe-3 pt-3">
            <h5 className="text-start" style={{ color: resumeData.themeColor }}>Education</h5>
            <div style={{ border: `0.5px solid ${resumeData.themeColor}` }}></div>
            {
                resumeData.education?.map((education) => (
                    <div key={education.id} className="m-0">
                        <h6 className="text-start fw-bold mt-2">{education.universityName}</h6>
                        <div className="d-flex justify-content-between m-0" >
                            <p className="text-start " >{education.fieldofstudy}  {education.degree}</p>
                            <p className="text-start ">{education.startDate}  {education.endDate}</p>
                        </div>
                      <div className="text-start">
                       <div dangerouslySetInnerHTML={{ __html: education.description }} />
                      </div>
                    </div>
                ))
            }
        </div>
    )
}
