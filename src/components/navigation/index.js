import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"

// CSS
import styles from "./navigation.module.css"

// Images
import githubLogo from "../../images/github-logo-black.svg"
import TwitterIcon from "../../icons/twitterIcon"
import GithubIcon from "../../icons/githubIcon"
import EmailIcon from "../../icons/emailIcon"

// Data
import socialData from "../../../data/socialData"

export default function Navigation({ menuLinks, location }) {
  return (
    <nav className={styles.main_nav}>
      <Link to="/">
        <motion.h1
          whileHover={{ rotate: 360 }}
          transition={{ type: "spring", duration: 2 }}
        >
          {location.pathname === "/" ? "WK" : "<"}
        </motion.h1>
      </Link>
      <div>
        <a href="mailto:kempsterwilliam@gmail.com">
          <EmailIcon fill="#fbc531"></EmailIcon>
        </a>
        <a href={socialData.twitterUrl} target="_blank">
          <TwitterIcon fill="#fbc531"></TwitterIcon>
        </a>
        <a href="/" href={socialData.githubUrl} target="_blank">
          <img src={githubLogo} alt="" />
        </a>
      </div>
    </nav>
  )
}
