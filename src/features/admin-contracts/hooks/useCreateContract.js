import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContract } from '../api/createContract';
import { CONTRACTS_QUERY_KEY } from './useContracts';
import { notify } from '../../auth/utils/notify';

export function useCreateContract() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (form) => createContract(form),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONTRACTS_QUERY_KEY });
            notify('تم', 'تم إنشاء العقد بنجاح.', 'success');
        },
        onError: (error) => {
            notify('خطأ', error.message, 'danger');
        },
    });
}