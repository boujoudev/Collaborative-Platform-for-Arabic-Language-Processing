import React, { useState } from "react";
import { useNavigate } from "react-router"; 

const PostInForum = () => {
  const [likes, setLikes] = useState(100);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(true);
  const [three, setThree] = useState(false);
  const GoTo = useNavigate();

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(!liked);
    } else {
      setLikes(likes + 1);
      setLiked(!liked);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setLikes(likes - 1);
      setDisliked(!disliked);
    } else {
      setLikes(likes + 1);
      setDisliked(!disliked);
    }
  };

  return (
    <div
      className="PostInForum"
      style={{
        marginBottom: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header Section */}
      <div
        className="EntetPostInForum"
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
            cursor: "pointer",
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
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {GoTo("/Forum/id")}}
          >
            Name Forum
          </p>
          <p
            style={{
              color: "gray",
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "10px",
              fontFamily: "Arial, sans-serif",
              cursor: "pointer",
            }}
          >
            User Name
          </p>
        </div>
        <button
          onClick={() => {
            setThree(!three);
          }}
          style={{
            width: "5px",
            height: "5px",
            border: "none",
            backgroundColor: "white",
            marginLeft: "76%",
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

      {/* Content Section */}
      <div
        className="PostContent"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
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
        
        <p
          className="PostText"
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "normal",
            color: "black",
            padding: "5px",
            paddingLeft: "10px",
            fontSize: "12px",
            margin: "0px",
          }}
        >
          Text content goes here...
        </p>
        <a
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            padding: "5px",
            paddingLeft: "10px",
            fontSize: "12px",
            margin: "0px",
          }}
          href="#"
        >
          Voir ici
        </a>
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

      {/* Footer Section */}
      <div
        className="LikeCommentSharePost"
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
            <i className="fa-regular fa-circle-up"></i>
          </button>
          {likes}
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
            <i className="fa-regular fa-circle-down"></i>
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
          <i className="fa-regular fa-comment"></i> NBc
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
          <i className="fa-regular fa-share-from-square"></i> Share
        </button>
      </div>
    </div>
  );
};

export default PostInForum;
