import { Link } from "react-router-dom";

export default function ResumeCard({ resume }) {
  return (
    <>
      <div className="add-icon bg-body-secondary d-flex flex-column justify-content-center align-items-center rounded-3" style={{ width: '18rem', height: '18rem' }}>
        <Link to={`/resume/${resume.id}/edit`}>
          <i className="fa-solid fa-book-open"></i>
        </Link>
          <h5 className="text-center">{resume.title}</h5>
          <small className="text-muted">
            {new Date(resume.createdAt).toLocaleDateString()}
          </small>
      </div>
    
        </>
    )
}