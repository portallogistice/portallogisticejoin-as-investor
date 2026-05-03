import { InvoiceRow } from './InvoiceRow';

const HEADERS = ['المستثمر', 'العقد', 'السنة', 'المبلغ', 'الاستحقاق', 'الحالة', 'الإيصال', 'إجراء'];

export function InvoicesTable({ invoices, onApprove, onReject, approving }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm" dir="rtl">
        <thead>
          <tr className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800">
            {HEADERS.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-right text-xs font-bold text-white whitespace-nowrap tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              onApprove={onApprove}
              onReject={onReject}
              approving={approving}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
