import styles from "./Review.module.css";

function Review(props) {
  return (
    <div className={styles.review}>
      <p className={styles.comment}>{props.comment}</p>
      <p className={styles.userName}>{props.userName}</p>
      <p className={styles.memberSince}>{props.memberSince}</p>
    </div>
  );
}

export default Review;
