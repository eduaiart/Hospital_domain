export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function apiGet<T>(path: string): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
	if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
	return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
	return res.json();
}