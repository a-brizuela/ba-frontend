"use client";

import styles from "./page.module.css";
import SearchBar from "@/components/search-bar/page";
import TripPnrMobileExample from "@/components/trip-pnr-mobile-example/page";
import TripPnr from "@/components/trip-pnr/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBar />
      <div style={{ display: "flex", gap: "3rem" }}>
        <TripPnr />
        <TripPnrMobileExample />
      </div>
    </main>
  );
}
