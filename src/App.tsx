import { useState } from "react";
import "./App.css";
import type { Hand, GameResult } from "./types/types";

const App = () => {
	const [userHand, setUserHand] = useState<Hand | null>(null);
	const [npcHand, setNpcHand] = useState<Hand | null>(null);
	const [result, setResult] = useState<GameResult | "">("");
	const [streak, setStreak] = useState<number>(0);
	const hands = ["✊", "✌️", "🖐️"] as const;

	const getWinProbability = (streak: number) => {
		if (streak === 0) return "—"; // 未勝利時は確率なし
		const percent = (100 / 2 ** streak).toFixed(2);
		return `${percent}%`;
	};

	const getRandomHand = () => {
		const randomIndex = Math.floor(Math.random() * hands.length);
		const randomHand = hands[randomIndex];
		return randomHand;
	};

	const handleUserHand = (hand: Hand) => {
		setUserHand(hand);
		const npc = getRandomHand();
		setNpcHand(npc);

		const gameResult = judgeWinner(hand, npc);
		setResult(gameResult);

		if (gameResult === "あなたの勝ち") {
			setStreak((prev) => prev + 1);
		} else if (gameResult === "あなたの負け") {
			setStreak(0);
		}
	};

	const judgeWinner = (user: Hand, npc: Hand): GameResult => {
		if (user === npc) {
			return "あいこ";
		}
		if (
			(user === "✊" && npc === "✌️") ||
			(user === "✌️" && npc === "🖐️") ||
			(user === "🖐️" && npc === "✊")
		) {
			return "あなたの勝ち";
		} else {
			return "あなたの負け";
		}
	};

	return (
		<div>
			<h1>じゃんけんゲーム</h1>
			<div>
				<button onClick={() => handleUserHand("✊")}>✊ グー</button>
				<button onClick={() => handleUserHand("✌️")}>✌️ チョキ</button>
				<button onClick={() => handleUserHand("🖐️")}>🖐️ パー</button>
			</div>
			<div className="game-result">
				<p className="hand-display">あなたの手：{userHand ?? "未選択"}</p>
				<p className="hand-display">
					コンピューターの手：{npcHand ?? "未決定"}
				</p>
				<p className="result-text">結果：{result}</p>

				<p className="streak-info">
					{streak}連勝中！確率{getWinProbability(streak)}
				</p>
			</div>
		</div>
	);
};

export default App;
