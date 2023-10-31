import React, { useState, useEffect } from "react";

import * as styles from "./Content.module.scss";

interface Props {
  title: string;
  body: string;
}

const Content: React.FC<Props> = ({ body, title }: Props) => (
    const [data, setData] = useState(''); // State to store the XHR data

  useEffect(() => {
    // Make an XHR request on page load
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.countapi.xyz/get/unaligned.world/:PATHNAME:', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // Parse the response data (assuming it's JSON)
        const responseData = JSON.parse(xhr.responseText);
        setData(responseData.value); // Update the state with the data
      }
    };
    xhr.send();
  }, []);

  <div className={styles.content}>
    <h1 className={styles.title}>{title}</h1>
    <p>{data}</p>
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
