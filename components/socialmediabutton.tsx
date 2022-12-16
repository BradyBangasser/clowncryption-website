import style from "../styles/buttons.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"

const SocialMediaButton = ({ title, icon, color = "black", backgroundColor = "white", href }: { icon: IconDefinition, href: string, title: string, color?: string, borderRadius?: number, backgroundColor?: string }) => {

  const defaultStyles = {
    color,
    backgroundColor,
    borderRadius: "50%",
    transition: "5ms"
  }

  const hoverStyle = {
    color: backgroundColor,
    backgroundColor: color,
    borderRadius: "50%",
    transition: "5ms"
  }

  const [styles, setStyles] = useState<{ [key: string]: any }>(defaultStyles)

  return (
    <a target="blank" title={title} href={href} style={styles} onMouseEnter={() => setStyles(hoverStyle)} onMouseLeave={() => setStyles(defaultStyles)} className={style.mediaButtonDiv}>
      <FontAwesomeIcon icon={icon} size="xl" className={style.mediaButtonIcon} />
    </a>
  )
}

export default SocialMediaButton