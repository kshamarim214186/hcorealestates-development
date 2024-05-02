"use client";
import Container from "react-bootstrap/Container";
import styles from "./HomeSearch.module.scss";
const HomeSearch = () => {
  return (
    <>
      <div className={styles.homesearch}>
        <Container fluid="xl">
          <div className={styles.inner}></div>
        </Container>
      </div>
    </>
  );
};
export default HomeSearch;
