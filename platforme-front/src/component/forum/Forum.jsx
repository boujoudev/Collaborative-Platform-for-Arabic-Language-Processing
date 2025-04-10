import React, { useState } from "react";

const Forum = () => {
  const [likes, setLikes] = useState(100);
  const [liked, setLiked] = useState(false);
  const [Disliked, setDisLiked] = useState(true);

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
    if (Disliked) {
      setLikes(likes - 1);
      setDisLiked(!Disliked);
    } else {
      setLikes(likes + 1);
      setDisLiked(!Disliked);
    }
  };
  return (
    <div
      className="Forum"
      style={{
        marginBottom: "10px",
        borderRadius: "5px",
        boxShadow: " 1px 1px 2px 2px rgb(223, 223, 225)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="EntetForumPublie"
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "5px",
          alignItems: "flex-start",
        }}
      >
        <img
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            paddingTop: "5px",
            paddingBottom: "0px",
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
          style={{
            border: "none",
            backgroundColor: "white",
            marginLeft: "auto",
            marginTop: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
            cursor: "pointer",
          }}
        >
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>
      <div
        className="ForumContent"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          className="ForumTitre"
          style={{
            fontSize: "14px",
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
            color: "black",
            padding: "5px",
            paddingLeft: "15px",
            paddingBottom:"0px",
            margin: "0px",
          }}
        >
          Traitement de language
        </div>
        <p className="ForumText">
          TextConteh hhhhhhhhhhh hhhhhhhh hhhhh hhhhhhhhh hhhhhhhhh hhhhhhhh
          hhhhhhhh hhhhhhh hhhhhhhhhh hhhhhhhh hhhhhhh hhhhhhhhhhh hhhhhhhhhh
          hhhhhhhhhh hnt hhh dqsd a zdazd a d zedaz azd azd az dazd azda e fz d az a d a zd azfazdazd
          jjjjjjj jjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjj
          jjjjjjjjjjj jjjjjj jjjjjjjj jjjjjjjjjjj
        </p>
      </div>
      <hr
        style={{
          width: "80%",
          height: "1px",
          backgroundColor: "gray",
          border: "none",
        }}
      />

      <div
        className="LikeCommentShareForum"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          margin: "10px",
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

export default Forum;
