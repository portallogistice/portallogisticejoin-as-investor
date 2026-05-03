import React from 'react';

const TYPE_STYLES = {
  sale: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  rental: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 border-violet-200 dark:border-violet-800',
};

export function TypePill({ type }) {
  const style = TYPE_STYLES[type] || TYPE_STYLES.sale;
  const icon = type === 'sale' ? 'fa-file-contract' : 'fa-file';
  const label = type === 'sale' ? 'مبايعة' : 'استئجار';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
      <i className={`fas ${icon}`}></i>
      <span>{label}</span>
    </span>
  );
}