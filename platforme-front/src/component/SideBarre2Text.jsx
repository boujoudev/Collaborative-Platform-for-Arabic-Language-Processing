const SideBarre2Text = () => {
  return (
    <footer style={styles.footer}>
      <h3 style={styles.title}>About</h3>
      <p style={styles.description}>
        The TAL-Arabe platform is dedicated to research and development in the
        field of Arabic language automatic processing.
      </p>
      <div style={styles.links}>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a> |{" "}
        <a href="#">Legal Notice</a>
      </div>
      <p style={styles.more}>More</p>
      <p style={styles.copyright}>
        2025 TAL-Arabe Platform. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    fontSize: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    padding: "20px",
  },
  title: {
    fontSize: "8px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "8px",
    maxWidth: "600px",
    margin: "0 auto 15px",
    lineHeight: "1.5",
  },
  links: {
    fontSize: "8px",
    marginBottom: "10px",
  },
  more: {
    fontSize: "8px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  copyright: {
    fontSize: "8px",
    color: "#666",
  },
};

export default SideBarre2Text;
