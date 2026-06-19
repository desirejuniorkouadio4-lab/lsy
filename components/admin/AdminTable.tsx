"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Trash2, CheckSquare } from "lucide-react";

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
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0;
  const hasActions = !!(editBasePath || deleteApiPath);

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(rows.map((r) => r.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function deleteSingle(id: string) {
    if (!deleteApiPath) return;
    if (!window.confirm("Confirmer la suppression ? Cette action est irréversible.")) return;
    const res = await fetch(`${deleteApiPath}/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Erreur lors de la suppression.");
  }

  async function deleteBulk() {
    if (!deleteApiPath || selected.size === 0) return;
    if (!window.confirm(`Supprimer ${selected.size} élément(s) ? Cette action est irréversible.`)) return;
    setDeleting(true);
    try {
      await Promise.all(
        [...selected].map((id) =>
          fetch(`${deleteApiPath}/${id}`, { method: "DELETE" })
        )
      );
      setSelected(new Set());
      router.refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* En-tête */}
      <div className="mb-4 flex items-center justify-between gap-4">
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

      {/* Barre d'actions groupées */}
      {deleteApiPath && someSelected && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
          <CheckSquare className="size-4 shrink-0 text-lsy-gold-400" aria-hidden />
          <span className="flex-1 text-xs font-semibold text-white/70">
            {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
          </span>
          <button
            onClick={deleteBulk}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/25 disabled:opacity-50"
          >
            <Trash2 className="size-3.5" aria-hidden />
            {deleting ? "Suppression…" : "Supprimer la sélection"}
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Annuler
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/5">
              {deleteApiPath && (
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="size-3.5 accent-lsy-gold-500 cursor-pointer"
                    aria-label="Tout sélectionner"
                  />
                </th>
              )}
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
                  colSpan={columns.length + (deleteApiPath ? 1 : 0) + (hasActions ? 1 : 0)}
                  className="px-4 py-10 text-center text-white/30"
                >
                  Aucune entrée
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isSelected = selected.has(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-white/5 transition-colors ${isSelected ? "bg-lsy-gold-500/5" : "hover:bg-white/[0.03]"}`}
                  >
                    {deleteApiPath && (
                      <td className="w-10 px-3 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(row.id)}
                          className="size-3.5 accent-lsy-gold-500 cursor-pointer"
                        />
                      </td>
                    )}
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
                            <button
                              onClick={() => deleteSingle(row.id)}
                              className="rounded-lg px-2 py-1 text-xs font-semibold text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="size-3.5" aria-hidden />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
