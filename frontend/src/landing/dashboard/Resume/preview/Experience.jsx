export default function Experience({ resumeInfo }) {
    return (
        <div className="ps-3 pe-3 pt-3 m-0">
            <h5 className="text-start" style={{color:resumeInfo.themeColor}}>Experience</h5>
            <div style={{border: `0.5px solid ${resumeInfo.themeColor}`}}></div>
            {
                resumeInfo.experience.map((experience) => (
                    <div key={experience.id}>
                        <h6 className="text-start fw-bold mt-1">{experience.title}</h6>
                       <div className="d-flex justify-content-between">
                       <p className="text-start">{experience.companyName},{experience.city}, {experience.state}</p>
                       <p className="text-start">{experience.startDate} - {experience.currentlyWorking ? 'Present' : experience.endDate}</p>
                       </div>
                        <p className="text-start">{experience.workSummery}</p>
                    </div>
                ))
            }
        </div>
    )
}
