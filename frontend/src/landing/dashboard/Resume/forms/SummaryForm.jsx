export default function SummaryForm() {
    return (
        <div>
            
            <div className="pt-2 pb-5 ps-3 pe-3 rounded-3 mt-4 ms-3" style={{ height: "fit-content", borderTop: "5px solid #0d6ff2f2", boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
            <h4 className="fw-bold pb-1 m-0 mt-2">Summary</h4>
            <p className="pb-4">Add a summary of your career and skills</p>

            <div>
                <label htmlFor="summary" className="mb-1 fw-medium">Summary</label>
                <textarea name="summary" id="summary" className="form-control" placeholder="Summary"></textarea>
            </div>
            </div>
        </div>
    )
}
