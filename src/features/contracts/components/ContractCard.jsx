// src/features/contracts/components/ContractCard.jsx
import { StatusBadge } from './StatusBadge';
import { PartOwningBanner } from './PartOwningBanner';
import { ContractActions } from './ContractActions';
import { NafathFeedback } from './NafathFeedback';

export function ContractCard({ contract, onNafath, onSaleReceipt, onLegacyReceipt, nafathFeedback, isNafathLoading }) {
    const showPartOwning = contract.type === 'sale' &&
        ['need_to_pay', 'receipt_review', 'accepted'].includes(contract.status);

    return (
        <div className=" dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-mono font-semibold text-gray-600 dark:text-gray-400">
                        #{contract.id}
                    </span>
                    <strong className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {contract.title}
                    </strong>
                </div>
                <span className="w-fit max-w-full flex-shrink-0 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                    {contract.type === 'sale' ? 'عقد مبايعة' : 'عقد استئجار'}
                </span>
            </div>

            {/* Status */}
            <div className="mb-4">
                <StatusBadge status={contract.status} />
            </div>

            {/* Part Owning Banner */}
            {showPartOwning && <PartOwningBanner contract={contract} />}

            {/* Actions */}
            <ContractActions
                contract={contract}
                onNafath={onNafath}
                onSaleReceipt={onSaleReceipt}
                onLegacyReceipt={onLegacyReceipt}
                isNafathLoading={isNafathLoading}
            />

            {/* Nafath Feedback */}
            <NafathFeedback feedback={nafathFeedback} />
        </div>
    );
}