import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerScale } from "@fortawesome/pro-regular-svg-icons";


export default function LoadingCustom() {
  return <>
    <div className="load-ui">
      <FontAwesomeIcon icon={faSpinnerScale} spinPulse />
      <div className="load-ui__text">Please wait, data is loading...</div>
    </div>
  </>
}