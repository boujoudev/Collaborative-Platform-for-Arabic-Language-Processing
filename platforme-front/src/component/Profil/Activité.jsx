import React from "react";
import { Clock } from "lucide-react";
const Activité = (props) => {
  return (
    <div className="activityItem">
      <div className="avatar">
        <img src="" alt="" />
      </div>
      <div className="content">
        <p className="actionText">{props.Title}</p>
        <p href="#" className="linkTitle">
          {props.Title1}
        </p>
        <p className="description">{props.Disc}</p>
        <p className="timestamp">
          <Clock className="h-3 w-3" />
          <span>{props.Time}</span>
        </p>
      </div>
    </div>
  );
};

export default Activité;
