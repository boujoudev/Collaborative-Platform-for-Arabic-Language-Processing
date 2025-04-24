import React from "react";
import AddProject from "./AddProject";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const ProjectEntet = () => {
  return (
    <div>
      <div className="ProjectEntet">
        <h3
          style={{
            "font-family": "Arial , sans-serif",
            color: "black",
            margin: "0px",
            padding: "10px",
            paddingTop: "10px",
          }}
        >
          Research Projects
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <button
              style={{
                "font-family": "Arial , sans-serif",
                color: "white",
                marginLeft: "10px",
              }}
              className="AddProject"
            >
              + New Project
            </button>
          </DialogTrigger>
          <DialogContent className="ProjectDialogContent">
            <AddProject />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectEntet;
