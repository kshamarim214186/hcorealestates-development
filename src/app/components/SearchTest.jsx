import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";

export default function SearchTest({ onClick }) {
  return (
    <div className="search">
      <button type="button" className="btn close-btn" onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="search--modify">
        <input type="search" placeholder="Enter a Locality, Builder or Project..." className="form-control" />
        <button type="button" className="btn btn-secondary custom-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
}
