import { useQuery } from '@tanstack/react-query';
import { getContractPayments } from '../api/getContractPayments';

export function getContractPaymentsQueryKey(contractId) {
    return ['investments', 'payments', contractId];
}

export function useContractPayments(contractId, contract, activationDate, enabled = false) {
    return useQuery({
        queryKey: getContractPaymentsQueryKey(contractId),
        queryFn: () => getContractPayments(contractId, contract, activationDate),
        enabled: enabled && !!contractId && !!activationDate,
        staleTime: 5 * 60 * 1000,
    });
}