"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  companies: { value: string; label: string }[];
  divisions: { value: string; label: string }[];
}

export function LeadForm({ open, onClose, companies, divisions }: LeadFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      value: form.get("value") ? Number(form.get("value")) : undefined,
      companyId: (form.get("companyId") as string) || undefined,
      divisionId: (form.get("divisionId") as string) || undefined,
      source: (form.get("source") as string) || undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create lead");
      }

      onClose();
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="New Lead">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Lead Name *</label>
          <Input name="name" required placeholder="e.g. New Office Building" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Estimated Value</label>
            <Input name="value" type="number" min="0" step="1" placeholder="0" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Source</label>
            <Input name="source" placeholder="e.g. Referral" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
            <Select name="companyId" options={companies} placeholder="Select company" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Division</label>
            <Select name="divisionId" options={divisions} placeholder="Select division" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
