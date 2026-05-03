// src/features/contracts/hooks/useReceiptUpload.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPaymentReceipt } from '../api/uploadPaymentReceipt';
import { uploadSaleReceipt } from '../api/uploadSaleReceipt';
import { CONTRACTS_QUERY_KEY } from './useContracts';

export function useReceiptUpload() {
    const queryClient = useQueryClient();

    const legacyUpload = useMutation({
        mutationFn: ({ contractId, file }) => uploadPaymentReceipt(contractId, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONTRACTS_QUERY_KEY });
        },
    });

    const saleUpload = useMutation({
        mutationFn: ({ contractId, file }) => uploadSaleReceipt(contractId, file),
        onSuccess: (data, variables) => {
            // Optimistic update: directly update the contract in cache
            queryClient.setQueryData(CONTRACTS_QUERY_KEY, (old) => {
                if (!old) return old;
                return old.map((c) =>
                    c.id === variables.contractId ? { ...c, ...data } : c
                );
            });
        },
    });

    return { legacyUpload, saleUpload };
}