type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function TableSearch({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="جستجو..."
      className="border p-2 mb-3 w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}