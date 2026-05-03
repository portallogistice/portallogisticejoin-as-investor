export function FieldError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-[9px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] leading-6 text-red-700" role="alert">
      <i className="fas fa-circle-exclamation" aria-hidden="true" />
      {message}
    </div>
  );
}
