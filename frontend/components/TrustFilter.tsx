export default function TrustFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded"
    >
      <option value="">All Trust Levels</option>
      <option value="high">High Trust</option>
      <option value="medium">Medium Trust</option>
      <option value="low">Low Trust</option>
    </select>
  );
}