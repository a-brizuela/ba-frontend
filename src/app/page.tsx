"use client";

import styles from "./page.module.css";
import SearchBar from "@/components/search-bar/page";
import TripPnr from "@/components/trip-pnr/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar />
      <TripPnr />
    </main>
  );
}
