"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroTerminalScene.module.css";

type SceneLine = {
  html: string;
  delay: number;
};

type Scene =
  | {
      kind: "terminal";
      duration: number;
      title: string;
      badge: string;
      showCursor?: boolean;
      lines: SceneLine[];
    }
  | {
      kind: "chaos" | "solution" | "success";
      duration: number;
      title: string;
      badge: string;
    };

const scenes: Scene[] = [
  {
    kind: "terminal",
    duration: 3200,
    title: "developer@macbook — ~/projects/work-repo",
    badge: "identity mismatch",
    showCursor: true,
    lines: [
      {
        delay: 0,
        html: `<span class="${styles.prompt}">developer@macbook</span> <span class="${styles.dim}">~/projects/work-repo</span> <span class="${styles.command}">git push origin main</span>`,
      },
      {
        delay: 320,
        html: `<span class="${styles.dim}">Enumerating objects: 14, done.</span>`,
      },
      {
        delay: 220,
        html: `<span class="${styles.dim}">Counting objects: 100% (14/14), done.</span>`,
      },
      {
        delay: 420,
        html: `<span class="${styles.errorPanel}"><span class="${styles.errorIcon}">Error</span><span class="${styles.error}">Permission denied to company/project for personal-account.</span></span>`,
      },
      {
        delay: 200,
        html: `<span class="${styles.errorPanel}"><span class="${styles.errorIcon}">Fatal</span><span class="${styles.error}">Could not read from remote repository.</span></span>`,
      },
      { delay: 200, html: "&nbsp;" },
      {
        delay: 180,
        html: `<span class="${styles.dim}">Please make sure you have the correct access rights.</span>`,
      },
    ],
  },
  {
    kind: "terminal",
    duration: 3800,
    title: "developer@macbook — ~/.ssh/config",
    badge: "manual fixing",
    showCursor: true,
    lines: [
      {
        delay: 0,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">cat ~/.ssh/config</span>`,
      },
      { delay: 220, html: `<span class="${styles.dim}">Host github-work</span>` },
      { delay: 140, html: `<span class="${styles.dim}">  HostName github.com</span>` },
      { delay: 140, html: `<span class="${styles.dim}">  User git</span>` },
      {
        delay: 140,
        html: `<span class="${styles.dim}">  IdentityFile ~/.ssh/id_work</span>`,
      },
      { delay: 160, html: "&nbsp;" },
      {
        delay: 180,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">git remote set-url origin git@github-work:company/project.git</span>`,
      },
      {
        delay: 220,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">git config user.email "work@company.com"</span>`,
      },
      {
        delay: 240,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">git push origin main</span>`,
      },
      {
        delay: 320,
        html: `<span class="${styles.success}">✓ Pushed.</span> <span class="${styles.warningPanel}"><span class="${styles.warning}">...but was that the right account?</span></span>`,
      },
    ],
  },
  {
    kind: "chaos",
    duration: 2200,
    title: "developer@macbook — account chaos",
    badge: "too many moving parts",
  },
  {
    kind: "solution",
    duration: 1900,
    title: "developer@macbook — bgit",
    badge: "one command",
  },
  {
    kind: "terminal",
    duration: 2900,
    title: "developer@macbook — ~/.config/bgit",
    badge: "the simpler path",
    showCursor: true,
    lines: [
      {
        delay: 0,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">bgit use personal</span>`,
      },
      { delay: 220, html: "&nbsp;" },
      {
        delay: 240,
        html: `<span class="${styles.cyan}">  ╭────────────────────────────────────╮</span>`,
      },
      {
        delay: 180,
        html: `<span class="${styles.cyan}">  │</span>  <span class="${styles.success}">✓ Switched to personal account</span> <span class="${styles.cyan}">│</span>`,
      },
      {
        delay: 160,
        html: `<span class="${styles.cyan}">  │</span>  <span class="${styles.dim}">Email: personal@gmail.com</span>     <span class="${styles.cyan}">│</span>`,
      },
      {
        delay: 160,
        html: `<span class="${styles.cyan}">  │</span>  <span class="${styles.dim}">SSH:   ~/.ssh/id_personal</span>      <span class="${styles.cyan}">│</span>`,
      },
      {
        delay: 160,
        html: `<span class="${styles.cyan}">  ╰────────────────────────────────────╯</span>`,
      },
      { delay: 220, html: "&nbsp;" },
      {
        delay: 260,
        html: `<span class="${styles.prompt}">$</span> <span class="${styles.command}">git push</span>`,
      },
      {
        delay: 320,
        html: `<span class="${styles.success}">✓ Pushed to personal/repo as personal@gmail.com</span>`,
      },
    ],
  },
  {
    kind: "success",
    duration: 2200,
    title: "developer@macbook — done",
    badge: "correct identity",
  },
];

const totalCycleDuration = scenes.reduce((total, scene) => total + scene.duration, 0) + 1000;

const chaosItems = [
  { text: "🔑 id_rsa_work", top: "16%", left: "10%", delay: "0s" },
  { text: "🔑 id_rsa_personal", top: "12%", left: "58%", delay: "0.4s" },
  { text: "📧 work@company.com", top: "48%", left: "8%", delay: "0.8s" },
  { text: "📧 personal@gmail.com", top: "34%", left: "58%", delay: "1s" },
  { text: "📁 company/project", top: "72%", left: "18%", delay: "0.2s" },
  { text: "⚙️ git config --global??", top: "70%", left: "54%", delay: "0.6s" },
  { text: "❓ which key is active?", top: "26%", left: "28%", delay: "1.2s" },
  { text: "🔄 ssh-add -l", top: "52%", left: "66%", delay: "0.9s" },
];

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function HeroTerminalScene() {
  const [currentScene, setCurrentScene] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [successPopped, setSuccessPopped] = useState(false);
  const cycleStartedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];

    const schedule = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, delay);

      timeouts.push(timeoutId);
    };

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - cycleStartedAt.current;
      setProgress(Math.min((elapsed / totalCycleDuration) * 100, 100));
    }, 80);

    const run = async () => {
      while (!cancelled) {
        cycleStartedAt.current = Date.now();
        setProgress(0);

        for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex += 1) {
          if (cancelled) {
            return;
          }

          const scene = scenes[sceneIndex];
          setCurrentScene(sceneIndex);
          setVisibleLineCount(0);
          setSuccessPopped(false);

          if (scene.kind === "terminal") {
            let elapsed = 0;

            scene.lines.forEach((line, lineIndex) => {
              elapsed += line.delay;
              schedule(() => {
                setVisibleLineCount(lineIndex + 1);
              }, elapsed);
            });
          }

          if (scene.kind === "success") {
            schedule(() => {
              setSuccessPopped(true);
            }, 280);
          }

          await wait(scene.duration);
        }

        await wait(1000);
      }
    };

    run();

    return () => {
      cancelled = true;
      window.clearInterval(progressInterval);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const activeScene = scenes[currentScene];
  const terminalClassName = [
    styles.terminal,
    activeScene.kind === "chaos" ? styles.terminalDim : "",
    activeScene.kind === "solution" || activeScene.kind === "success"
      ? styles.terminalHidden
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.sceneContainer} aria-label="Animated bgit workflow preview">
      <div className={styles.sceneCounter} aria-hidden="true">
        {scenes.map((_, index) => (
          <span
            key={index}
            className={`${styles.sceneDot} ${index <= currentScene ? styles.sceneDotActive : ""}`}
          />
        ))}
      </div>

      <div className={terminalClassName}>
        <div className={styles.terminalBar}>
          <div className={styles.terminalChrome} aria-hidden="true">
            <span className={`${styles.terminalDot} ${styles.terminalDotRed}`} />
            <span className={`${styles.terminalDot} ${styles.terminalDotYellow}`} />
            <span className={`${styles.terminalDot} ${styles.terminalDotGreen}`} />
          </div>
          <div className={styles.terminalTitle}>{activeScene.title}</div>
          <div className={styles.terminalBadge}>{activeScene.badge}</div>
        </div>

        <div className={styles.terminalBody}>
          {activeScene.kind === "terminal" &&
            activeScene.lines.map((line, index) => (
              <div
                key={`${currentScene}-${index}`}
                className={`${styles.line} ${index < visibleLineCount ? styles.lineVisible : ""}`}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: line.html }}
                />
                {activeScene.showCursor &&
                  visibleLineCount === activeScene.lines.length &&
                  index === activeScene.lines.length - 1 && <span className={styles.cursor} />}
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.overlay} ${activeScene.kind === "chaos" ? styles.overlayActive : ""}`}
        aria-hidden={activeScene.kind !== "chaos"}
      >
        <div className={styles.chaosContainer}>
          {chaosItems.map((item) => (
            <div
              key={item.text}
              className={styles.floatingItem}
              style={{ top: item.top, left: item.left, animationDelay: item.delay }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.overlay} ${activeScene.kind === "solution" ? styles.overlayActive : ""}`}
        aria-hidden={activeScene.kind !== "solution"}
      >
        <div className={styles.solutionContainer}>
          <div className={styles.logoRow}>
            <div className={styles.logoIcon}>⇄</div>
            <div className={styles.logoText}>
              <span>bgit</span>
            </div>
          </div>
          <p className={styles.tagline}>
            One tool for every Git identity, without juggling SSH configs, email
            changes, or remote rewrites.
          </p>
          <div className={styles.commandShowcase}>
            <span className={styles.promptChar}>$</span>
            <span>bgit use</span>
            <span className={styles.arg}>work</span>
          </div>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${activeScene.kind === "success" ? styles.overlayActive : ""}`}
        aria-hidden={activeScene.kind !== "success"}
      >
        <div className={styles.successContainer}>
          <div className={`${styles.successIcon} ${successPopped ? styles.successIconPop : ""}`}>
            ✓
          </div>
          <div className={styles.successMessage}>
            Pushed to <span className={styles.highlight}>personal/repo</span>
          </div>
          <div className={styles.successSub}>
            Account: personal@gmail.com • SSH: ~/.ssh/id_personal
          </div>
        </div>
      </div>

      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scanlines} aria-hidden="true" />

      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
