import Head from "next/head";
import styles from "../styles/layout.module.scss"
import SocialMediaButton from "./socialmediabutton";
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faBookSkull } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Layout = ({ name = "", descrption = "A ClownCryption Page", children }: any) => {
  return (
    <div className={styles.page}>
      <Head>
        <link rel="icon" href='/icon.png' />
        <title>Clowncryption{((name.length > 0) ? ` - ${name}` : "")}</title>
        <meta name="description" content={descrption} />
        <meta name="keywords" content="ClownCryption, Encryption, Emoji, Emojis, Binary, AES" />
        <meta name="author" content="Brady Bangasser" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="lang" content="en-US" />
      </Head>

      <div className={styles.nav}>
        <div style={{
          marginTop: "auto",
          marginBottom: "auto",
          padding: "5px"
        }}>
          <h2 style={{
            height: "max-content"
          }}>🤡 ClownCryption</h2>
        </div>
        <div className={styles.linksDiv}>
          <Link href="/try-it-out">Try it Out</Link>
          <br />
          <Link href="/how-it-works">How it Works</Link>
        </div>
      </div>

      <div className={styles.content}>
        {children}
      </div>

      <footer className={styles.footer}>
        <div style={{ display: "flex" }}>
          <SocialMediaButton title="Github" icon={faGithub} href="https://github.com/BradyBangasser/ClownCryption" />
          <SocialMediaButton title="Documentation" icon={faBookSkull} href="https://clowncryption.bangasser.dev" />
        </div>
        <div className={styles.footerDiv}>
          <p style={{
            color: "white"
          }}>© 2022 Brady Bangasser</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout