export const metadata = { title: "HMS Web", description: "Hospital Management Platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system" }}>
				<div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
					<h1>HMS Web</h1>
					{children}
				</div>
			</body>
		</html>
	);
}