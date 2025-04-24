import React, { useState } from "react";

function Tool() {
  const [likesTool, setLikesTool] = useState(100);
  const [three, setthree] = useState(false);

  const [likedTool, setLikedTool] = useState(false);
  const [dislikedTool, setDisLikedTool] = useState(true);

  const handleLike = () => {
    if (likedTool) {
      setLikesTool(likesTool - 1);
      setLikedTool(!likedTool);
    } else {
      setLikesTool(likesTool + 1);
      setLikedTool(!likedTool);
    }
  };
  const handleDislike = () => {
    if (dislikedTool) {
      setLikesTool(likesTool - 1);
      setDisLikedTool(!dislikedTool);
    } else {
      setLikesTool(likesTool + 1);
      setDisLikedTool(!dislikedTool);
    }
  };
  return (
    <div
      className="Tool"
      style={{
        marginBottom: "10px",
        borderRadius: "5px",
        boxShadow: " 0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="EntetToolPublie"
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "5px",
          alignItems: "flex-start",
        }}
      >
        <img
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            marginLeft: "10PX",
            // paddingBottom: "0px",
          }}
          src="image.jpg"
          alt=""
        />
        <div>
          <p
            style={{
              margin: "0px",
              paddingTop: "7px",
              paddingLeft: "3px",
              fontSize: "12px",
              fontFamily: "Arial , sans-serif",
              fontWeight: "bold",
            }}
          >
            Name de chercheur
          </p>
          <p
            style={{
              color: "gray",
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "10px",
              "font-family": "Arial , sans-serif",
            }}
          >
            date de publication
          </p>
        </div>
        <button
          onClick={() => {
            setthree(!three);
          }}
          style={{
            width: "5px",
            height: "5px",
            border: "none",
            backgroundColor: "white",
            marginLeft: "70%",
            marginTop: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
            cursor: "pointer",
          }}
        >
          <i class="fa-solid fa-ellipsis"></i>
          {three && (
            <div className="THreepoint">
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "white",
                  color: "red",
                }}
              >
                Report
              </button>
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Block
              </button>
            </div>
          )}
        </button>
      </div>
      <div
        className="ToolContent"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
            color: "black",
            padding: "5px",
            paddingLeft: "10px",
            paddingBottom: "2px",
            margin: "0px",
          }}
        >
          Traitement de language
        </div>
        <p className="ToolText">
          TextContehhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
          hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhh
          hhhhhhhhhhhnt
        </p>
        <a  style={{
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
            padding: "5px",
            paddingLeft: "10px",
            paddingBottom: "2px",
            fontSize: "12px",
            margin: "0px",
          }} href="hhhhhhh">voire ici</a>
      </div>
      <hr
        style={{
          marginTop: "5px",
          width: "97%",
          height: "0.5px",
          backgroundColor: "#D3D3D3",
          border: "none",
        }}
      />

      <div
        className="LikeCommentShareProjects"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginTop: "10px",
          marginBottom: "10px",
          padding: "0px",
        }}
      >
        <button
          style={{
            marginLeft: "10px",
            width: "80px",
            height: "30px",
            backgroundColor: "rgb(230, 230, 230)",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              cursor: "pointer",
              backgroundColor: "rgb(230, 230, 230)",
              border: "0px",
              padding: "0px",
              width: "20px",
            }}
          >
            <i class="fa-regular fa-circle-up"></i>
          </button>
          {likesTool}
          <button
            onClick={handleDislike}
            style={{
              cursor: "pointer",
              backgroundColor: "rgb(230, 230, 230)",
              border: "0px",
              padding: "0px",
              width: "20px",
            }}
          >
            <i class="fa-regular fa-circle-down"></i>
          </button>
        </button>
        <button
          style={{
            marginLeft: "10px",
            width: "80px",
            height: "30px",
            backgroundColor: "rgb(230, 230, 230)",
            border: "1px solid gray",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <i class="fa-regular fa-comment"></i> NBc
        </button>
        <button
          style={{
            marginLeft: "10px",
            width: "80px",
            height: "30px",
            backgroundColor: "rgb(230, 230, 230)",
            border: "1px solid gray",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <i class="fa-regular fa-share-from-square"></i> Share
        </button>
      </div>
    </div>
  );
}

export default Tool;
