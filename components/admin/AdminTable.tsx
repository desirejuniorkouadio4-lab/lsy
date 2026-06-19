import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface Row {
  id: string;
  cells: string[];
}

interface Props {
  title: string;
  columns: string[];
  rows: Row[];
  createHref?: string;
  createLabel?: string;
}

export function AdminTable({ title, columns, rows, createHref, createLabel }: Props) {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="mt-0.5 text-xs text-white/40">{rows.length} entrée{rows.length !== 1 ? "s" : ""}</p>
        </div>
        {createHref && (
          <Link
            href={createHref}
            className="inline-flex items-center gap-1.5 rounded-lg bg-lsy-gold-500 px-3 py-1.5 text-xs font-bold text-lsy-blue-950 transition-opacity hover:opacity-90"
          >
            <PlusCircle className="size-3.5" aria-hidden />
            {createLabel ?? "Nouveau"}
          </Link>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/5">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-widest text-white/30"
                >
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-widest text-white/30">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-white/30"
                >
                  Aucune entrée
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/3"
                >
                  {row.cells.map((cell, j) => (
                    <td key={j} className="max-w-xs truncate px-4 py-3 text-white/70">
                      {cell}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-white/25">—</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
