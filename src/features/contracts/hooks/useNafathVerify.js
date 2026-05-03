// src/features/contracts/hooks/useNafathVerify.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyNafath } from '../api/verifyNafath';
import { CONTRACTS_QUERY_KEY } from './useContracts';

export function useNafathVerify() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyNafath,
        onSuccess: () => {
            // Invalidate contracts to refresh status after nafath verification
            queryClient.invalidateQueries({ queryKey: CONTRACTS_QUERY_KEY });
        },
        // We don't use onError here — we handle it in the component for per-contract feedback
    });
}