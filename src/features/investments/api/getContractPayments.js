import api from '../../../lib/api';

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function buildClientSchedule(contract, activationDate) {
    const monthlyAmount =
        contract.monthly_payment_amount ||
        (contract.total_amount ? Math.round(Number(contract.total_amount) / 12) : 0);

    const rows = [];
    for (let i = 0; i < 12; i++) {
        const start = new Date(activationDate);
        start.setMonth(start.getMonth() + i + 1);
        start.setDate(1);
        const end = addDays(start, 29);

        const apiPayment = contract.payments?.find((p) => p.month_number === i + 1);

        rows.push({
            month: i + 1,
            start,
            end,
            amount: apiPayment?.amount != null ? Number(apiPayment.amount) : monthlyAmount,
            status: apiPayment?.status ?? 'pending',
            payment_date: apiPayment?.payment_date ?? null,
        });
    }
    return rows;
}

function mapApiToRows(apiData, contract, clientActivationDate) {
    const activationRef = apiData.activation_date
        ? new Date(apiData.activation_date)
        : clientActivationDate;

    const monthlyAmount =
        contract.monthly_payment_amount ||
        (contract.total_amount ? Math.round(Number(contract.total_amount) / 12) : 0);

    const list = apiData.payments || [];
    const byMonth = new Map(list.map((p) => [Number(p.month_number ?? p.monthNumber), p]));

    const rows = [];
    for (let i = 0; i < 12; i++) {
        const m = i + 1;
        const p = byMonth.get(m);
        let start, end;

        const due = p?.due_date ?? p?.dueDate;
        if (due) {
            start = new Date(due);
            end = addDays(start, 29);
        } else {
            start = new Date(activationRef);
            start.setMonth(start.getMonth() + i + 1);
            start.setDate(1);
            end = new Date(start);
            end.setDate(start.getDate() + 29);
        }

        const amount = p?.amount != null ? Number(p.amount) : monthlyAmount;
        const paymentDate = p?.payment_date ?? p?.paymentDate ?? null;

        rows.push({
            month: m,
            start,
            end,
            amount,
            status: p?.status ?? 'pending',
            payment_date: paymentDate,
        });
    }
    return rows;
}

export async function getContractPayments(contractId, contract, activationDate) {
    const urls = [
        `/contracts/${contractId}/payments`,
        `/portallogistice/contracts/${contractId}/payments`,
    ];

    let lastError;
    for (const url of urls) {
        try {
            const { data: res } = await api.get(url);
            const data = res?.data;
            if (res?.success && data && Array.isArray(data.payments)) {
                return {
                    source: 'api',
                    rows: mapApiToRows(data, contract, activationDate),
                };
            }
            throw new Error(res?.message || 'استجابة غير متوقعة من الخادم');
        } catch (e) {
            lastError = e;
            if (e.response?.status === 404) continue;
            throw e;
        }
    }

    // Fallback to client-side schedule
    return {
        source: 'client',
        rows: buildClientSchedule(contract, activationDate),
    };
}