import { useState } from "react";

type Hand = "✊" | "✌️" | "🖐️";

const App = () => {
	const [userHand, setUserHand] = useState<Hand | null>(null);
	const [npcHand, setNpcHand] = useState<Hand | null>(null);
	const [result, setResult] = useState<string>("");
	const hands = ["✊", "✌️", "🖐️"] as const;

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
		</div>
	);
};

export default App;
