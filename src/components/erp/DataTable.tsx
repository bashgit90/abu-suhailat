import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  rowKey,
  onDelete,
  empty = "No records yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (r: T) => string;
  onDelete?: (r: T) => void;
  empty?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[640px]">
        <thead className="bg-muted/40">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 md:px-6 py-3 text-[10px] font-mono uppercase text-foreground/40 whitespace-nowrap">
                {c.header}
              </th>
            ))}
            {onDelete && <th className="px-4 md:px-6 py-3 w-12" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (onDelete ? 1 : 0)} className="px-6 py-10 text-center text-xs text-muted-foreground">
                {empty}
              </td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={rowKey(r)} className="hover:bg-muted/30 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={`px-4 md:px-6 py-3 text-sm ${c.className ?? ""}`}>
                  {c.render ? c.render(r) : (r as any)[c.key]}
                </td>
              ))}
              {onDelete && (
                <td className="px-4 md:px-6 py-3 text-right">
                  <button
                    onClick={() => onDelete(r)}
                    className="p-1.5 rounded-sm text-foreground/40 hover:text-destructive hover:bg-destructive/10 transition"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
