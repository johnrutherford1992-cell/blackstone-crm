"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  companies: { value: string; label: string }[];
}

export function ContactForm({ open, onClose, companies }: ContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: (form.get("email") as string) || undefined,
      mobilePhone: (form.get("mobilePhone") as string) || undefined,
      title: (form.get("title") as string) || undefined,
      companyId: (form.get("companyId") as string) || undefined,
    };

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create contact");
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
    <Modal open={open} onClose={onClose} title="Add Contact">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">First Name *</label>
            <Input name="firstName" required placeholder="First name" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Last Name *</label>
            <Input name="lastName" required placeholder="Last name" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <Input name="email" type="email" placeholder="email@example.com" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile Phone</label>
            <Input name="mobilePhone" placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
            <Input name="title" placeholder="e.g. Project Manager" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
          <Select name="companyId" options={companies} placeholder="Select company" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Add Contact"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
