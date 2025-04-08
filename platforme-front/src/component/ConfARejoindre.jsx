import React from "react";

const ConfARejoindre = () => {
  return (
    <div style={styles.Container}>
      {" "}
      <div style={styles.card}>
        <img src="image.jpg" alt="Profile" style={styles.avatar} />
        <div style={styles.info}>
          <h3 style={styles.name}>Hassen Aissa</h3>
          <p style={styles.role}>them de conferance</p>
          <button style={styles.followButton}>Join</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  Container: {
    display: "flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    width :"240px",
    height: "67px",
    backgroundColor: "white",
    padding: "0px",
    marginTop: "5px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "10px",
    fontFamily: "Arial, sans-serif",
  },
  avatar: {
    padding: "0px",
    marginTop: "0px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: "10px",
    fontWeight: "bold",
    margin: "0",
  },
  role: {
    fontSize: "10px",
    color: "#888",
    margin: "2px 0",
  },
  followButton: {
    width: "60%",
    height: "25px",
    padding: "5px 10px",
    border: "2px solid #AAAAAA",
    borderRadius: "5px",
    background: "white",
    cursor: "pointer",
    fontSize: "10px",
    color: "#333333",
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ConfARejoindre;
