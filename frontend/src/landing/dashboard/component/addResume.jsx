import AddIcon from '@mui/icons-material/Add';
import './addResume.css';

export default function AddResume() {

  return (
    <>{/* Outer container for the add resume box with styling*/}
      <div className='add-icon mt-4  bg-body-secondary d-flex justify-content-center align-items-center rounded-3 ' style={{ width: '18rem', height: '18rem' }}>
        {/* Inner container that centers the icon */}
        <div className="add-icon  d-flex justify-content-center align-items-center w-100" style={{ width: '18rem', height: '18rem' }}>
          <AddIcon style={{ color: "rgb(17 51 110)", width: "6rem", height: "2rem" }} />
        </div>
      </div>
    </>
  )
}
