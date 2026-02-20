type Props = {
  selected: (string | number)[];
  actions: {
    label: string;
    action: (ids: (string | number)[]) => void;
  }[];
};

export default function TableBulkActions({ selected, actions }: Props) {
  if (selected.length === 0) return null;

  return (
    <div className="flex gap-3 mb-3 bg-gray-100 p-3 rounded">
      <span className="text-sm text-gray-600">
        {selected.length} مورد انتخاب شده
      </span>

      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => a.action(selected)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}