import { useState } from "react";

type Hand = "✊" | "✌️" | "🖐️";

const App = () => {
	const [userHand, setUserHand] = useState<Hand | null>(null);
	const [npcHand, setNpcHand] = useState<Hand | null>(null);
	const [result, setResult] = useState<string>("");
	const [streak, setStreak] = useState<number>(0);
	const [history, setHistory] = useState([]);
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

	const judgeWinner = (user: Hand, npc: Hand) => {
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
			<p>開発中...</p>
			<div>
				<button onClick={() => handleUserHand("✊")}>✊ グー</button>
				<button onClick={() => handleUserHand("✌️")}>✌️ チョキ</button>
				<button onClick={() => handleUserHand("🖐️")}>🖐️ パー</button>
			</div>
			<p>あなたの手：{userHand ?? "未選択"}</p>
			<p>コンピューターの手：{npcHand ?? "未決定"}</p>
			<p>結果：{result}</p>
			<p>{streak}連勝中</p>
			<p>
				{streak}連勝中！確率{getWinProbability(streak)}
			</p>
		</div>
	);
};

export default App;
