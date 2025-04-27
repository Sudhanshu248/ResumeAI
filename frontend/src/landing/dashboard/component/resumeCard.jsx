export default function ResumeCard({resume}){
    return(
        <>
         <div className="add-icon bg-body-secondary d-flex flex-column justify-content-center align-items-center rounded-3" style={{width: '18rem' , height: '18rem'}}>
         <i className="fa-solid fa-book-open"></i>
            <h5 className="text-center">{resume.title}</h5>
            <small className="text-muted">
              {new Date(resume.createdAt).toLocaleDateString()}
            </small>
         </div>
        </>
    )
}