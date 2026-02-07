const BASE = '/api';

export async function fetchChallenges(adtType) {
  const url = adtType ? `${BASE}/challenges?adt=${adtType}` : `${BASE}/challenges`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch challenges');
  return res.json();
}

export async function fetchChallenge(id) {
  const res = await fetch(`${BASE}/challenges/${id}`);
  if (!res.ok) throw new Error('Failed to fetch challenge');
  return res.json();
}

export async function fetchAdtTypes() {
  const res = await fetch(`${BASE}/challenges/types`);
  if (!res.ok) throw new Error('Failed to fetch ADT types');
  return res.json();
}

export async function executeCode(code, challengeId = null) {
  const res = await fetch(`${BASE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, challengeId }),
  });
  if (!res.ok) throw new Error('Execution request failed');
  return res.json();
}
