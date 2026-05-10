// src/features/requests/api/initiateNafath.js
import api from '../../../lib/api';

export async function initiateNafath(requestId) {
  const { data: body } = await api.post(`/investor-requests/${requestId}/nafath`);
  const inner = body?.data;
  // Laravel often wraps payload in `data`; backend may also return challenge_number at root
  return {
    ...body,
    challenge_number: inner?.challenge_number ?? body.challenge_number ?? null,
    request: inner?.request ?? body.request ?? null,
  };
}