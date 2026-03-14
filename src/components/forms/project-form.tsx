"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  stages: { value: string; label: string }[];
  divisions: { value: string; label: string }[];
}

export function ProjectForm({ open, onClose, stages, divisions }: ProjectFormProps) {
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
      contractValue: form.get("contractValue") ? Number(form.get("contractValue")) : undefined,
      stageId: (form.get("stageId") as string) || undefined,
      divisionId: (form.get("divisionId") as string) || undefined,
      address: (form.get("address") as string) || undefined,
      city: (form.get("city") as string) || undefined,
      state: (form.get("state") as string) || undefined,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
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
    <Modal open={open} onClose={onClose} title="Create Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Project Name *</label>
          <Input name="name" required placeholder="e.g. Austin Office Tower" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Contract Value</label>
            <Input name="contractValue" type="number" min="0" step="1" placeholder="0" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Stage</label>
            <Select name="stageId" options={stages} placeholder="Select stage" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Division</label>
          <Select name="divisionId" options={divisions} placeholder="Select division" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <Input name="address" placeholder="Street address" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
            <Input name="city" placeholder="City" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">State</label>
            <Input name="state" placeholder="TX" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
