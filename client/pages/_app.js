import "@/styles/globals.css";
import DayNightMode from "./api/DayNightMode";

export default function App({ Component, pageProps }) {
  return(
    <DayNightMode>
      <Component {...pageProps} />;
    </DayNightMode>
  );
}

