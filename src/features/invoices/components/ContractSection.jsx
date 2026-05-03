// src/features/invoices/components/ContractSection.jsx
import { useState } from 'react';
import { InvoiceCard } from './InvoiceCard';

export function ContractSection({ group, onUpload }) {
    const [open, setOpen] = useState(true);
    const { is_activated, activation_date, invoices, contract_title, contract_type } = group;

    const approvedCount = invoices.filter((i) => i.status === 'approved').length;
    const pendingCount = invoices.filter((i) => i.status === 'pending').length;

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200  dark:border-slate-700 dark:bg-slate-900">
            {/* Header */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="flex w-full flex-wrap items-center justify-between gap-3 bg-transparent p-4 text-right transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/60 sm:p-5"
                aria-expanded={open}
            >
                <div className="flex items-start gap-3">
                    <i className={`fas fa-chevron-${open ? 'down' : 'left'} text-gray-400 transition-transform`} aria-hidden="true" />
                    <div className="text-right">
                        <h2 className="text-base font-bold text-gray-900 dark:text-slate-100">{contract_title}</h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                ${contract_type === 'rental'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'}`}
                            >
                                {contract_type === 'rental' ? 'عقد استئجار' : 'عقد مبايعة'}
                            </span>
                            {is_activated ? (
                                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <i className="fas fa-circle-check" aria-hidden="true" />
                                    مُفعَّل
                                </span>
                            ) : (
                                <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <i className="fas fa-clock" aria-hidden="true" />
                                    في انتظار التفعيل — {new Date(activation_date).toLocaleDateString('ar-SA')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 font-medium">
                        {approvedCount} مقبول
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 font-medium">
                        {pendingCount} معلق
                    </span>
                </div>
            </button>

            {/* Invoices */}
            {open && (
                <div className="grid grid-cols-1 gap-3 p-4 pt-0 sm:grid-cols-2 sm:gap-4 sm:p-5 sm:pt-0">
                    {invoices.map((inv) => (
                        <InvoiceCard
                            key={inv.id}
                            invoice={inv}
                            contractActivated={is_activated}
                            onUpload={onUpload}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}