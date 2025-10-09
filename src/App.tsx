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
	const computerHand = getRandomHand();
	console.log("コンピューターの手:", computerHand);

	return (
		<div>
			<h1>じゃんけんゲーム</h1>
			<p>コンピューターの手: {computerHand}</p>
		</div>
	);
};

export default App;
