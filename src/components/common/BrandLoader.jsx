import logo from "../../assets/logos/logo.png";
import "./BrandLoader.css";

export default function BrandLoader() {
  return (
    <div className="ipsa-loader" role="status" aria-live="polite" aria-label="Loading page, please wait">
      <div className="ipsa-loader__content" aria-hidden="true">
        <div className="ipsa-loader__emblem">
          <span className="ipsa-loader__ring ipsa-loader__ring--outer" />
          <span className="ipsa-loader__ring ipsa-loader__ring--inner" />
          <span className="ipsa-loader__orbit"><i /></span>
          <div className="ipsa-loader__crest">
            <img className="ipsa-loader__logo" src={logo} alt="" width="2999" height="968" fetchPriority="high" />
          </div>
        </div>
        <p className="ipsa-loader__name">IPS ACADEMY</p>
        <p className="ipsa-loader__location">INDORE · INDIA</p>
        <div className="ipsa-loader__status">
          <span>Getting things ready</span>
          <span className="ipsa-loader__dots"><i /><i /><i /></span>
        </div>
      </div>
    </div>
  );
}
