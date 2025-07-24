import { Link } from "react-router-dom";

export default function ResumeCard({ resume, onDelete }) {
  return (
    <div
      className="card-logo-1 add-icon position-relative bg-body-secondary p-8 rounded-3 d-flex align-items-center justify-content-center"
      style={{ width: "18rem", height: "18rem", cursor: "pointer", position: 'relative' }}
    >
      {/* Trash icon at top-right in red */}
      <div
         className=""
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          onDelete(resume._id);
        }}
      >
        <i className="fa-solid fa-trash-can"></i>
      </div>

      {/* Centered content */}
      <div className="text-center d-flex flex-column justify-content-center align-items-center">
        <i className="fa-solid fa-book-open fa-2x mb-3"></i>
        <h5>{resume.title}</h5>
        <small className="text-muted">
          {new Date(resume.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
}

