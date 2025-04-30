export default function Summary({   resumeData }) {
    return (
        <div className="ps-3 pe-3 pt-3">
            <h5 className="text-start" style={{color:resumeData.themeColor}}>Summary</h5>
            <div className="text-start" dangerouslySetInnerHTML={{ __html: resumeData.personalInfo?.summary }} />
        </div>
    )
}
