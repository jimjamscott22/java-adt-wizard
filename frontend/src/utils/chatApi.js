export const DEFAULT_SETTINGS = {
  endpoint: 'http://localhost:11434',
  model: 'llama3.2',
  provider: 'ollama',
};

export async function sendChatMessage(messages, settings) {
  const { endpoint, model, provider } = { ...DEFAULT_SETTINGS, ...settings };

  const isOllama = provider === 'ollama';
  const url = isOllama
    ? `${endpoint}/api/chat`
    : `${endpoint}/v1/chat/completions`;

  const label = provider === 'ollama' ? 'Ollama' : 'LM Studio';

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: false }),
    });
  } catch {
    throw new Error(`Could not reach ${label} at ${endpoint}. Is it running?`);
  }

  if (!res.ok) {
    throw new Error(
      `Could not reach ${label} at ${endpoint}. Is it running? (HTTP ${res.status})`
    );
  }

  const data = await res.json();

  if (isOllama) {
    if (!data.message?.content) {
      throw new Error(
        `${label} returned an unexpected response.${data.error ? ` Error: ${data.error}` : ''}`
      );
    }
    return data.message.content;
  } else {
    if (!data.choices?.[0]?.message?.content) {
      throw new Error(
        `${label} returned an unexpected response.${data.error ? ` Error: ${data.error}` : ''}`
      );
    }
    return data.choices[0].message.content;
  }
}
