import { useInvestments } from '../hooks/useInvestments';

import { InvestmentCard } from '../components/InvestmentCard';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export default function InvestmentsPage() {
    const { data: contracts = [], isLoading, error, refetch } = useInvestments();

    return (
        <div
            className="max-w-[960px] mx-auto w-full min-w-0 box-border px-2.5 sm:px-4 lg:px-5 py-3 sm:py-6 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
            dir="rtl"
        >


            {/* Content states */}
            {isLoading && <LoadingState />}

            {
                error && !isLoading && (
                    <ErrorState
                        error={error?.message || 'تعذر تحميل الاستثمارات. حاول مرة أخرى.'}
                        onRetry={refetch}
                    />
                )
            }

            {!isLoading && !error && contracts.length === 0 && <EmptyState />}

            {
                !isLoading && !error && contracts.length > 0 && (
                    <div className="space-y-3 sm:space-y-4 min-w-0">
                        {contracts.map((contract) => (
                            <InvestmentCard key={contract.id} contract={contract} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}