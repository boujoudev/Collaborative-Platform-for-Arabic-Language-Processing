import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddLanguageTool from "./AddLanguageTool";

function ToolEntet() {
  return (
    <div className="ToolEntet">
      <h3
        style={{
          fontFamily: "Arial , sans-serif",
          color: "black",
          margin: "0px",
          padding: "10px",
          paddingTop: "10px",
        }}
      >
        Linguistic Tools
      </h3>
      <h5
        style={{
          fontFamily: "Arial , sans-serif",
          color: "black",
          margin: "0px",
          padding: "10px",
          paddingTop: "10px",
        }}
      >
        This section includes tools for the automatic processing of the Arabic
        language, including text analysis and speech processing.
      </h5>
      <Dialog>
        <DialogTrigger asChild>
          <button
            style={{
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginLeft: "10px",
            }}
            className="AddTool"
            aria-label="Add a new tool"
          >
            + New Tool
          </button>
        </DialogTrigger>

        <DialogContent className="ToolDialogContent">
          <AddLanguageTool />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ToolEntet;
