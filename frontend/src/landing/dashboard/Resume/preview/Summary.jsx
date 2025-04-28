export default function Summary({ resumeInfo }) {
    return (
        <div className="ps-3 pe-3 pt-3">
            <h5 className="text-start" style={{color:resumeInfo.themeColor}}>Summary</h5>
            <p className="text-start m-0">{resumeInfo.summery}</p>
        </div>
    )
}
