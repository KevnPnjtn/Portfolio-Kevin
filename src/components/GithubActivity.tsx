"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ui/GithubActivity.module.css";

const githubUsername = "KevnPnjtn";
const currentYear = new Date().getFullYear();

const availableYears = Array.from(
  { length: currentYear - 2019 },
  (_, index) => currentYear - index
);

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type Status = "loading" | "ready" | "error";

type FetchResult = {
  year: number;
  days: ContributionDay[];
  error: boolean;
};

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function buildWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];

  if (days.length === 0) return weeks;

  // Pad the first week so the first day lands on the right weekday row (Sun = 0)
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded: (ContributionDay | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...days,
  ];

  for (let i = 0; i < padded.length; i += 7) {
    const week = padded.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function buildMonthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: { index: number; label: string }[] = [];
  let previousMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week.find((day) => day !== null);
    if (!firstDay) return;

    const month = new Date(`${firstDay.date}T00:00:00Z`).getUTCMonth();

    if (month !== previousMonth) {
      labels.push({ index, label: monthNames[month] });
      previousMonth = month;
    }
  });

  // Avoid overlapping labels when the first month is only 1-2 columns wide
  if (labels.length > 1 && labels[1].index - labels[0].index < 3) {
    labels.shift();
  }

  return labels;
}

export function GithubActivity() {
  const [year, setYear] = useState<number>(currentYear);
  const [result, setResult] = useState<FetchResult | null>(null);

  const githubProfileUrl = `https://github.com/${githubUsername}`;

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=${year}`,
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch contributions");
        return response.json();
      })
      .then((data: { contributions: ContributionDay[] }) => {
        setResult({ year, days: data.contributions ?? [], error: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setResult({ year, days: [], error: true });
      });

    return () => controller.abort();
  }, [year]);

  // Status diturunkan saat render: dianggap "loading" selama hasil yang
  // tersimpan belum cocok dengan tahun yang sedang dipilih.
  const current = result?.year === year ? result : null;
  const status: Status = !current ? "loading" : current.error ? "error" : "ready";
  const days = current && !current.error ? current.days : null;

  const { weeks, monthLabels, total } = useMemo(() => {
    const source = days ?? [];
    const today = new Date().toISOString().slice(0, 10);

    // Sembunyikan hari yang belum terjadi (untuk tahun berjalan)
    const visibleDays = source.filter((day) => day.date <= today);

    const builtWeeks = buildWeeks(visibleDays);

    return {
      weeks: builtWeeks,
      monthLabels: buildMonthLabels(builtWeeks),
      total: visibleDays.reduce((sum, day) => sum + day.count, 0),
    };
  }, [days]);

  const columns = `repeat(${weeks.length}, var(--cell))`;

  return (
    <div className={styles.githubActivity}>
      {/* Profile card */}
      <div className={`${styles.githubActivity__card} ${styles.githubActivity__profile}`}>
        <div className={styles.githubActivity__profileTop}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.githubActivity__avatar}
            src={`https://github.com/${githubUsername}.png?size=96`}
            alt={`${githubUsername} avatar`}
            width={48}
            height={48}
          />

          <div className={styles.githubActivity__profileInfo}>
            <span className={styles.githubActivity__profileLabel}>
              Coding with
            </span>
            <strong>Kevin</strong>
            <span className={styles.githubActivity__profileHandle}>
              @{githubUsername}
            </span>
          </div>
        </div>

        <a
          className={styles.githubActivity__profileLink}
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.41.36.76 1.04.76 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"
            />
          </svg>
        </a>
      </div>

      {/* Contribution card */}
      <div className={`${styles.githubActivity__card} ${styles.githubActivity__chart}`}>
        <div className={styles.githubActivity__scroll}>
          {status === "ready" && weeks.length > 0 ? (
            <div className={styles.githubActivity__heat}>
              <div
                className={styles.githubActivity__months}
                style={{ gridTemplateColumns: columns }}
                aria-hidden="true"
              >
                {monthLabels.map(({ index, label }) => (
                  <span key={`${label}-${index}`} style={{ gridColumnStart: index + 1 }}>
                    {label}
                  </span>
                ))}
              </div>

              <div className={styles.githubActivity__dayLabels} aria-hidden="true">
                <span style={{ gridRow: 3 }}>Tue</span>
                <span style={{ gridRow: 5 }}>Thu</span>
                <span style={{ gridRow: 7 }}>Sat</span>
              </div>

              <div
                className={styles.githubActivity__grid}
                style={{ gridTemplateColumns: columns }}
                role="img"
                aria-label={`${total} GitHub contributions in ${year}`}
              >
                {weeks.flatMap((week, weekIndex) =>
                  week.map((day, dayIndex) =>
                    day ? (
                      <span
                        key={day.date}
                        title={`${day.count} contributions on ${day.date}`}
                        className={`${styles.githubActivity__cell} ${styles[`githubActivity__level--${day.level}`]}`}
                      />
                    ) : (
                      <span
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className={styles.githubActivity__cellEmpty}
                      />
                    )
                  )
                )}
              </div>
            </div>
          ) : (
            <p className={styles.githubActivity__state} aria-live="polite">
              {status === "error"
                ? "Gagal memuat data kontribusi."
                : "Memuat kontribusi…"}
            </p>
          )}
        </div>

        <div className={styles.githubActivity__footer}>
          <span className={styles.githubActivity__total}>
            {status === "ready" ? `${total} contributions in ${year}` : "\u00A0"}
          </span>

          <div className={styles.githubActivity__controls}>
            <label className={styles.githubActivity__yearFilter}>
              <select
                value={year}
                onChange={(event) => setYear(Number(event.target.value))}
                aria-label="Filter contributions by year"
              >
                {availableYears.map((availableYear) => (
                  <option key={availableYear} value={availableYear}>
                    {availableYear}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.githubActivity__legend} aria-hidden="true">
              <span>Less</span>
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`${styles.githubActivity__cell} ${styles[`githubActivity__level--${index}`]}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}