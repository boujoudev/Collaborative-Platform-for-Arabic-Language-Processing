import React, { useState } from "react";
const Project = () => {
  const [likesProject, setLikesProject] = useState(100);
  const [likedProject, setLikedProject] = useState(false);
  const [dislikedProject, setDisLikedProject] = useState(true);
  const [three, setthree] = useState(false);
  const x = "notFinish";

  const handleLike = () => {
    if (likedProject) {
      setLikesProject(likesProject - 1);
      setLikedProject(!likedProject);
    } else {
      setLikesProject(likesProject + 1);
      setLikedProject(!likedProject);
    }
  };
  const handleDislike = () => {
    if (dislikedProject) {
      setLikesProject(likesProject - 1);
      setDisLikedProject(!dislikedProject);
    } else {
      setLikesProject(likesProject + 1);
      setDisLikedProject(!dislikedProject);
    }
  };
  return (
    <div
      className="Project"
      style={{
        marginBottom: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="EntetProjectPublie"
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
            marginLeft: "10px",
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
        className="ProjectContent"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <h5
          className="ProjectTitre"
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
        </h5>
        <h5
          className="ProjectTitre"
          style={{
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
            color: "black",
            padding: "0px",
            paddingLeft: "10px",
            paddingBottom: "2px",
            margin: "0px",
          }}
        >
          Traitment des erreures
        </h5>
        <div className="ProjectText">
          <h6
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "normal",
              color: "black",
              padding: "0px",
              paddingLeft: "10px",
              margin: "0px",
              fontSize: "12px",
            }}
          >
            Status : <span className={x}>{x}</span>
          </h6>
          <h6
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "normal",
              color: "black",
              padding: "0px",
              paddingLeft: "10px",
              margin: "0px",
              fontSize: "12px",
            }}
          >
            Responsible : <span>{}</span>
          </h6>
          <h6
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "normal",
              color: "black",
              padding: "0px",
              paddingLeft: "10px",
              margin: "0px",
              fontSize: "12px",
            }}
          >
            Project description :{" "}
            <span
              style={{
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              ddddddddddddddddddddd dddd dddd d dddd d dd ddddd d ddddd d d d d
              d fffffffffffff ffffffffffffff ffffffffffffff f f ffffffffffffff f
              fffffffff
            </span>
          </h6>
          <a
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "bold",
              padding: "0px",
              paddingLeft: "10px",
              paddingBottom: "2px",
              fontSize: "12px",
              margin: "0px",
            }}
            href="hhhhhhh"
          >
            voire ici
          </a>
          <br />

          <button className="projetDetail">
            <i class="fa-solid fa-link"></i> Project details
          </button>
        </div>
      </div>
      <hr
        style={{
          marginTop: "0px",
          width: "97%",
          height: "0.5px",
          backgroundColor: "#D3D3D3",
          border: "none",
        }}
      />

      <div
        className="LikeCommentShareProject"
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
          {likesProject}
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
};

export default Project;
