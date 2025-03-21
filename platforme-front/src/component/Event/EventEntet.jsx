import React from "react";

const EventEntet = () => {
    return (
        <div>
        {" "}
        <div className="EventEntet">
            <h3
            style={{
                "font-family": "Arial , sans-serif",
                color: "black",
                margin: "0px",
                padding: "5px",
                paddingTop: "10px",
            }}
            >
            Events
            </h3>
            <button className="AddEvent">+ New Event</button>
        </div>
        </div>
    );
};

export default EventEntet;
