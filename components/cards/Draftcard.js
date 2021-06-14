import React from "react";
import styles from "./draftcard.module.sass";
import Link from "next/link";
import FormButton from "../buttons/FormButton";

const Draftcard = ({ title, posted, deadline, link }) => {
  return (
    <div className={styles.draftcard}>
      <div className={styles.draftcard_left}>
        <h1>{title}</h1>
        <p>
          Posted: <span>{posted}</span>
        </p>
        <p>
          Deadline: <span>{deadline}</span>
        </p>
      </div>
      <div className={styles.draftcard_right}>
        <div className={styles.links}>
          <p>
            <Link href={link}>Edit</Link>
          </p>
          <p>
            <Link href={link}>Preview</Link>
          </p>
        </div>
        <div className={styles.button}>
          <FormButton btnClass={"btn-primary"} text={"Publish"}></FormButton>
        </div>
      </div>
    </div>
  );
};

export default Draftcard;