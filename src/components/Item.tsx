import { useState } from "react";
import { Launch } from "../lib/types";
import { getTimeAgo } from "../lib/utils";

export default function Item(launch: Launch) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <article className="launch">
      <div className="launch__header">
        <h2>{launch.mission_name}</h2>

        {launch.upcoming ? (
          <p className="launch__status launch__status--info">upcoming</p>
        ) : launch.launch_success ? (
          <p className="launch__status launch__status--success">success</p>
        ) : (
          <p className="launch__status launch__status--success">failed</p>
        )}
      </div>
      {isExpanded && (
        <div>
          <p>{getTimeAgo(launch.launch_date_local)}</p>
          <div className="launch__details">
            <img
              src={
                launch.links.mission_patch_small || launch.links.mission_patch
              }
              alt=""
            />
            <p>{launch.details}</p>
          </div>
        </div>
      )}
      <button className="btn btn--primary" onClick={toggleView}>
        {isExpanded ? "Hide" : "View"}
      </button>
    </article>
  );
}
