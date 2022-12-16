import type { AppProps } from 'next/app'
import "../styles/global.scss"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} lang="en-US" />
}
