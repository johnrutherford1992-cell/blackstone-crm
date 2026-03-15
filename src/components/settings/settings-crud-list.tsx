"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface FieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  sortable?: boolean;
  render?: (val: any) => React.ReactNode;
}

interface SettingsCrudListProps {
  apiType: string;
  fields: FieldConfig[];
  addButtonLabel: string;
}

export function SettingsCrudList({ apiType, fields, addButtonLabel }: SettingsCrudListProps) {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(`/api/settings?type=${apiType}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      // silent
    }
  }, [apiType]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    fields.forEach((f) => {
      const val = form.get(f.key) as string;
      if (val) body[f.key] = val;
    });

    try {
      const url = editItem
        ? `/api/settings/${editItem.id}?type=${apiType}`
        : `/api/settings?type=${apiType}`;
      const res = await fetch(url, {
        method: editItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
      setShowForm(false);
      setEditItem(null);
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      await fetch(`/api/settings/${id}?type=${apiType}`, { method: "DELETE" });
      fetchItems();
    } catch {
      // silent
    }
  }

  function openEdit(item: any) {
    setEditItem(item);
    setShowForm(true);
  }

  function openCreate() {
    setEditItem(null);
    setShowForm(true);
  }

  const columns = [
    ...fields.map((f) => ({
      key: f.key,
      label: f.label,
      sortable: f.sortable ?? false,
      render: f.render,
    })),
    {
      key: "id",
      label: "Actions",
      render: (val: string, row: any) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="p-1 text-gray-400 hover:text-gray-600">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(val)} className="p-1 text-gray-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <Button onClick={openCreate}>
          <Plus className="mr-1.5 h-4 w-4" /> {addButtonLabel}
        </Button>
      </div>

      <DataTable data={items} columns={columns} totalCount={items.length} />

      <Modal
        open={showForm}
        onClose={() => { setShowForm(false); setEditItem(null); }}
        title={editItem ? `Edit ${addButtonLabel.replace("Add ", "")}` : addButtonLabel}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {f.label} {f.required && "*"}
              </label>
              <Input
                name={f.key}
                required={f.required}
                placeholder={f.placeholder || f.label}
                defaultValue={editItem?.[f.key] || ""}
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditItem(null); }}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editItem ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
