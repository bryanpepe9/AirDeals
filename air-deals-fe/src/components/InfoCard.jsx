import styles from "./InfoCard.module.css";

function InfoCard(props) {
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImage}
        src={props.imagePath}
        alt="location icon"
      />
      <div className={styles.textArea}>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default InfoCard;
