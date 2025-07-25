import { Link } from "react-router-dom";
import "./addResume.css";

export default function ResumeCard({ resume, onDelete }) {
  return (
    <div className="resume-cards rounded-3" style={{ width: "18rem"}}>
      <div
      className=" card-logo-1 add-icon mt-4 bg-body-secondary position-relative rounded-3"
      style={{ width: "18rem", height: "18rem", cursor: "pointer"}}
    >
      {/* Trash icon at top-right in red */}
      <div className="d-flex justify-content-end"  style={{height: "15%", width: "100%"}}>
        <div
         className="p-3"
        onClick={(e) => {
          e.stopPropagation(); // prevent card click
          onDelete(resume._id);
        }}
      >
        <i className="fa-solid fa-trash-can fa-xl"></i>
      </div>
      </div>

      {/* Centered content */}
      <div className="d-flex align-items-center justify-content-center" style={{ height: '85%' }}>
        <div className="text-center d-flex flex-column justify-content-center align-items-center" >
          <i className="fa-solid fa-book-open fa-2x mb-3"></i>
          <h4>{resume.title}</h4>
          <small className="text-muted">
            {new Date(resume.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
    </div>
  );
}

