"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";

interface Patient {
	id: string;
	first_name: string;
	last_name: string;
	date_of_birth?: string;
	sex?: string;
	phone?: string;
	email?: string;
}

export default function Page() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [note, setNote] = useState("");
	const [summary, setSummary] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const refresh = async () => {
		const data = await apiGet<Patient[]>("/api/v1/patients/");
		setPatients(data);
	};

	useEffect(() => {
		refresh();
	}, []);

	const create = async () => {
		await apiPost<Patient>("/api/v1/patients/", { first_name: firstName, last_name: lastName });
		setFirstName("");
		setLastName("");
		refresh();
	};

	const summarize = async () => {
		setLoading(true);
		try {
			const res = await apiPost<{ summary: string }>("/api/v1/ai/summarize", { text: note });
			setSummary(res.summary);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ display: "grid", gap: 24 }}>
			<section>
				<h2>Patients</h2>
				<div style={{ display: "flex", gap: 8 }}>
					<input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
					<input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
					<button onClick={create}>Create</button>
				</div>
				<ul>
					{patients.map(p => (
						<li key={p.id}>{p.first_name} {p.last_name}</li>
					))}
				</ul>
			</section>
			<section>
				<h2>AI Summarize</h2>
				<textarea rows={4} placeholder="Enter text" value={note} onChange={e => setNote(e.target.value)} />
				<div>
					<button onClick={summarize} disabled={loading}>{loading ? "Summarizing..." : "Summarize"}</button>
				</div>
				{summary && (
					<pre>{summary}</pre>
				)}
			</section>
		</div>
	);
}