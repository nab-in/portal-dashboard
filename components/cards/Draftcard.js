import React from "react";
import styles from "./draftcard.module.sass";
import Link from "next/link";
import FormButton from "../buttons/FormButton";

const Draftcard = ({draft}) => {
  return (
    <div className={`card ${styles.draftcard}`}>
      <div className={styles.draftcard_left}>
        <h1>{draft.name}</h1>
        <p>
          Posted: <span>{draft.created}</span>
        </p>
        <p>
          Deadline: <span>{draft.created}</span>
        </p>
      </div>
      <div className={styles.draftcard_right}>
        <div className={styles.links}>
          <p>
            <Link href={`/jobs/${draft.id}`}>Edit</Link>
          </p>
          <p>
            <Link href={`/jobs/${draft.id}`}>Preview</Link>
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
