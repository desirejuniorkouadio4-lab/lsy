import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { AdminDeleteButton } from "./AdminDeleteButton";

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
  editBasePath?: string;
  deleteApiPath?: string;
}

export function AdminTable({
  title,
  columns,
  rows,
  createHref,
  createLabel,
  editBasePath,
  deleteApiPath,
}: Props) {
  const hasActions = !!(editBasePath || deleteApiPath);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          <p className="mt-0.5 text-xs text-white/40">
            {rows.length} entrée{rows.length !== 1 ? "s" : ""}
          </p>
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
              {hasActions && (
                <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-widest text-white/30">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-10 text-center text-white/30"
                >
                  Aucune entrée
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  {row.cells.map((cell, j) => (
                    <td
                      key={j}
                      className="max-w-[16rem] truncate px-4 py-3 text-white/70"
                    >
                      {cell}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editBasePath && (
                          <Link
                            href={`${editBasePath}/${row.id}`}
                            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white/50 transition-colors hover:bg-white/8 hover:text-white"
                          >
                            Modifier
                          </Link>
                        )}
                        {deleteApiPath && (
                          <AdminDeleteButton
                            id={row.id}
                            apiPath={deleteApiPath}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
