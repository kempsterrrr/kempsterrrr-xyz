import React from "react"
import { Link } from "gatsby"

// CSS
import styles from "./navigation.module.css"

// Images
import githubLogo from "../../images/github-logo-black.svg"
import TwitterIcon from "../../icons/twitterIcon"
import GithubIcon from "../../icons/githubIcon"

// Data
import socialData from "../../../data/socialData"

export default function Navigation({ menuLinks }) {
  return (
    <nav className={styles.main_nav}>
      <Link to="/">
        <h1>WK</h1>
      </Link>
      <div>
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
