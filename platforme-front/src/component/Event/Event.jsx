import React, { useState } from "react";

const Event = () => {
  const [likes, setLikes] = useState(100);
  const [liked, setLiked] = useState(false);
  const [Disliked, setDisLiked] = useState(true);
  const [clickInterested, setclickInterested] = useState(false);
  const [interested, setinterested] = useState("No");
  const [interestedButton, setinterestedButton] = useState("to interest");

  const changeButtonValue = () => {
    setclickInterested(!clickInterested);
    if (clickInterested) {
      setinterested("yes");
      setinterestedButton("interested");
    } else {
      setinterested("No");
      setinterestedButton("to interest");
    }
  };

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
      className="Event"
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
        className="EntetEventPublie"
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
        className="EventContent"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <h5
          className="EventTitre"
          style={{
            fontSize: "14px",
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
            color: "black",
            padding: "5px",
            paddingLeft: "15px",
            paddingBottom: "5px",
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
              paddingLeft: "15px",
              margin: "0px",
              fontSize: "12px",
            }}
          >
            Deadline : <span>{}</span>
          </h6>
          <h6
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "normal",
              color: "black",
              padding: "0px",
              paddingLeft: "15px",
              margin: "0px",
              fontSize: "12px",
            }}
          >
            Location : <span>{}</span>
          </h6>
          <h6
            style={{
              fontFamily: "Arial , sans-serif",
              fontWeight: "normal",
              color: "black",
              padding: "0px",
              paddingLeft: "15px",
              margin: "0px",
              wordWrap: "break-word",
              whiteSpace: "normal",
              fontSize: "12px",
            }}
          >
            Description : <span>{}</span>
          </h6>
          <button className={interested} onClick={changeButtonValue}>
            <i class="fa-solid fa-bell"></i> {interestedButton}
          </button>
        </div>
      </div>
      <hr
        style={{
          marginTop: "0px",
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
export default Event;
