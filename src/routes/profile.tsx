import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import avatarImg from "@/assets/menu-avatar.png";
import {
  getPlayerName,
  setPlayerName,
  getMaxLevel,
  getBank,
  getBoard,
  renameBoardEntries,
  type ScoreEntry,
} from "@/game/shop";

import { renderProfileCard } from "@/lib/profileCard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Player Profile — Toy Blitz Carnival" },
      {
        name: "description",
        content:
          "View your Toy Blitz Carnival player profile: nickname, level reached, coins banked and your best carnival scores.",
      },
      { property: "og:title", content: "Player Profile — Toy Blitz Carnival" },
      {
        property: "og:description",
        content: "Your carnival stats: level, coins and top scores from the shooting gallery.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [board, setBoard] = useState<ScoreEntry[]>([]);
  const [sharing, setSharing] = useState(false);
  const [shareNote, setShareNote] = useState("");

  useEffect(() => {
    setName(getPlayerName());
    setLevel(getMaxLevel());
    setCoins(getBank());
    setBoard(getBoard());
  }, []);

  const save = (v: string) => {
    const prev = getPlayerName();
    setName(v);
    setPlayerName(v);
    // keep saved scores attached to the player after a rename
    if (v.trim()) setBoard(renameBoardEntries(prev, v));
  };


  const shareCard = async () => {
    setSharing(true);
    setShareNote("");
    try {
      const blob = await renderProfileCard({
        name,
        level,
        coins,
        best: board[0]?.score ?? 0,
        avatarSrc: avatarImg,
      });
      if (!blob) throw new Error("render failed");
      const file = new File([blob], "toy-blitz-profile.png", { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({
          files: [file],
          title: "My Toy Blitz Carnival profile",
          text: `${(name || "PLAYER ONE").toUpperCase()} — Level ${level}. Can you beat my score?`,
        });
        setShareNote("Shared!");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "toy-blitz-profile.png";
        a.click();
        URL.revokeObjectURL(url);
        setShareNote("Card downloaded — send it to your friends!");
      }
    } catch {
      setShareNote("Couldn't share the card. Try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <main className="pf-root">
      <div className="pf-card">
        <Link to="/" className="pf-back">
          ← BACK TO MENU
        </Link>


        <div className="pf-head">
          <img className="pf-avatar" src={avatarImg} alt="Player avatar" width={512} height={512} />
          <div>
            <h1 className="pf-name">{(name || "PLAYER ONE").toUpperCase()}</h1>
            <span className="pf-sub">Level {level}</span>
          </div>
        </div>

        <label className="pf-field">
          <span>NICKNAME</span>
          <input
            value={name}
            maxLength={14}
            placeholder="PLAYER ONE"
            onChange={(e) => save(e.target.value)}
          />
        </label>

        <div className="pf-stats">
          <div className="pf-stat">
            <strong>{level}</strong>
            <span>LEVEL</span>
          </div>
          <div className="pf-stat">
            <strong>{coins.toLocaleString()}</strong>
            <span>COINS</span>
          </div>
          <div className="pf-stat">
            <strong>{(board[0]?.score ?? 0).toLocaleString()}</strong>
            <span>BEST SCORE</span>
          </div>
        </div>

        <button className="pf-share" onClick={shareCard} disabled={sharing}>
          <span>📤</span> {sharing ? "MAKING CARD…" : "SHARE PROFILE CARD"}
        </button>
        {shareNote && <p className="pf-note">{shareNote}</p>}



        <h2 className="pf-h2">TOP SCORES</h2>
        <ul className="pf-board">
          {board.length === 0 && <li className="pf-empty">No scores yet — go play!</li>}
          {board.map((e, i) => (
            <li key={`${e.name}-${i}`}>
              <span>#{i + 1}</span>
              <span>{e.name}</span>
              <strong>{e.score.toLocaleString()}</strong>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
