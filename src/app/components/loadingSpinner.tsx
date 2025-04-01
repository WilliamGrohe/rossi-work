export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
      <div className="spinner"></div>
    </div>
  );
}
