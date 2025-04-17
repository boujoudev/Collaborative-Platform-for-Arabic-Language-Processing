import React from "react";
import { Clock } from "lucide-react";
const Activité = (props) => {
  return (
    <div className="activityItemAct">
      <div className="avatarAct">
        <img src="" alt="" />
      </div>
      <div className="contentAct">
        <p className="actionTextAct">{props.Title}</p>
        <p href="#" className="linkTitleAct">
          {props.Title1}
        </p>
        <p className="descriptionAct">{props.Disc}</p>
        <p className="timestampAct">
          <Clock className="h-3 w-3" />
          <span>{props.Time}</span>
        </p>
      </div>
    </div>
  );
};

export default Activité;
