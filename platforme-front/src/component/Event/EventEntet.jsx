import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddEvent from "./AddEvent";

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
            padding: "10px",
            paddingTop: "10px",
          }}
        >
          Events
        </h3>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className="AddEvent"
              style={{
                "font-family": "Arial , sans-serif",
                color: "white",
                marginLeft: "10px",
              }}
            >
              + New Event
            </button>
          </DialogTrigger>

          <DialogContent className="EventDialogContent">
            <AddEvent/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EventEntet;
