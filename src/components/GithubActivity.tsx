
import Image from "next/image";
import styles from "./ui/GithubActivity.module.css";

const githubUsername = "KevnPnjtn";

export function GithubActivity() {
  const githubProfileUrl = `https://github.com/${githubUsername}`;

  return (
    <div className={styles.githubActivity}>
      <div className={styles.githubActivity__header}>
        <div>
          <p className={styles.githubActivity__eyebrow}>
            OPEN SOURCE & DEVELOPMENT
          </p>

          <h3 className={styles.githubActivity__title}>
            GitHub Activity
          </h3>

          <p className={styles.githubActivity__description}>
            A look at my coding activity and development journey.
          </p>
        </div>

        <a
          className={styles.githubActivity__profileIcon}
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.41.36.76 1.04.76 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"
            />
          </svg>
        </a>
      </div>

      <div className={styles.githubActivity__chart}>
        <p className={styles.githubActivity__chartLabel}>
          Contribution activity
        </p>

        <div className={styles.githubActivity__chartScroll}>
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View contribution chart on GitHub"
          >
            <Image
              src={`https://ghchart.xqsit94.in/dark:3b82f6/${githubUsername}`}
              alt={`GitHub contribution chart for ${githubUsername}`}
              width={900}
              height={140}
              unoptimized
            />
          </a>
        </div>

        <div
          className={styles.githubActivity__legend}
          aria-label="Contribution activity levels, from less to more"
        >
          <span>Less</span>
          <span
            className={`${styles.githubActivity__level} ${styles["githubActivity__level--0"]}`}
          />
          <span
            className={`${styles.githubActivity__level} ${styles["githubActivity__level--1"]}`}
          />
          <span
            className={`${styles.githubActivity__level} ${styles["githubActivity__level--2"]}`}
          />
          <span
            className={`${styles.githubActivity__level} ${styles["githubActivity__level--3"]}`}
          />
          <span
            className={`${styles.githubActivity__level} ${styles["githubActivity__level--4"]}`}
          />
          <span>More</span>
        </div>
      </div>

      <div className={styles.githubActivity__footer}>
        <p>
          Building, learning, and improving one commit at a time.
        </p>

        <a
          className={styles.githubActivity__button}
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View GitHub Profile

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17 17 7M7 7h10v10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
