// src/features/contracts/api/verifyNafath.js
import api from '../../../lib/api';

export async function verifyNafath(contractId) {
    const { data } = await api.post(`/contracts/${contractId}/nafath`);
    return {
        challengeNumber: data?.challenge_number || data?.sadq?.challenge_number || null,
        message: `${document.dir === 'rtl' ? 'تم إرسال الطلب إلى تطبيق نفاذ 📱' : 'Request sent to Nafath 📱'}`,
    };
}