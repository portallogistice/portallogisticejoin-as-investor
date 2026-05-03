import React, { useState } from 'react';

export function CreateContractForm({ users, usersLoading, onSubmit, submitting }) {
  const [form, setForm] = useState({ user_id: '', type: 'sale', title: '', file: null });
  const [userSearch, setUserSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, () => setForm({ user_id: '', type: 'sale', title: '', file: null }));
  };

  const inputBase = 'w-full px-3 py-2 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20';
  const inputNormal = `${inputBase} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500`;
  const labelBase = 'block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">
        <i className="fas fa-file-signature text-indigo-500 dark:text-indigo-400"></i>
        إنشاء عقد جديد
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 lg:col-span-1">
          <label className={labelBase}>بحث عن المستخدم</label>
          <input
            type="text"
            placeholder="ابحث بالاسم أو الهوية"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className={inputNormal}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <label className={labelBase}>المستخدم *</label>
          <select
            value={form.user_id}
            onChange={(e) => setForm((p) => ({ ...p, user_id: e.target.value }))}
            required
            className={inputNormal}
          >
            <option value="">{usersLoading ? 'جاري التحميل...' : 'اختر المستخدم'}</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || `User #${u.id}`} — {u.national_id || 'بدون هوية'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelBase}>نوع العقد</label>
          <select
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
            className={inputNormal}
          >
            <option value="sale">عقد مبايعة (sale)</option>
            <option value="rental">عقد استئجار (rental)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelBase}>عنوان العقد *</label>
          <input
            type="text"
            placeholder="مثال: عقد مبايعة دراجة نارية"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
            className={inputNormal}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelBase}>ملف PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0] || null }))}
            className={`${inputNormal} file:mr-2 file:px-3 file:py-1 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/40 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/60`}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-plus'}`}></i>
            {submitting ? 'جاري الإنشاء...' : 'إنشاء العقد'}
          </button>
        </div>
      </form>
    </div>
  );
}