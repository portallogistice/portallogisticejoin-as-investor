import React from 'react';

const inputBase = 'w-full px-3 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500';
const labelBase = 'block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide';

export function PaymentFilters({ filters, onChange, users, usersLoading, userSearch, onUserSearch, onReset }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
                <label className={labelBase} htmlFor="user-search">بحث عن المستثمر</label>
                <input id="user-search" type="text" placeholder="ابحث بالاسم أو الهوية" value={userSearch} onChange={(e) => onUserSearch(e.target.value)} className={inputBase} autoComplete="off" />
            </div>

            <div className="flex-1 min-w-[200px]">
                <label className={labelBase} htmlFor="user-id">المستثمر</label>
                <select id="user-id" value={filters.user_id} onChange={(e) => onChange('user_id', e.target.value)} className={inputBase}>
                    <option value="">{usersLoading ? 'جاري التحميل...' : 'جميع المستثمرين'}</option>
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>{u.name || `#${u.id}`} — {u.national_id || 'بدون هوية'}</option>
                    ))}
                </select>
            </div>

            <div className="min-w-[140px]">
                <label className={labelBase}>الحالة</label>
                <select value={filters.status} onChange={(e) => onChange('status', e.target.value)} className={inputBase}>
                    <option value="">جميع الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="sent">مُرسل</option>
                    <option value="received">مستلم</option>
                    <option value="reported_missing">مُبلَّغ عن غيابه</option>
                </select>
            </div>

            <div className="min-w-[130px]">
                <label className={labelBase}>الاستحقاق من</label>
                <input type="date" value={filters.due_from} onChange={(e) => onChange('due_from', e.target.value)} className={inputBase} />
            </div>

            <div className="min-w-[130px]">
                <label className={labelBase}>إلى</label>
                <input type="date" value={filters.due_to} onChange={(e) => onChange('due_to', e.target.value)} className={inputBase} />
            </div>

            <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors self-end">
                <i className="fas fa-rotate-right" aria-hidden="true" /> إعادة تعيين
            </button>
        </div>
    );
}