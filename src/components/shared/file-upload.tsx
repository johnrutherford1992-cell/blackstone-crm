"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  projectId: string;
  category?: string;
  onUploadComplete?: () => void;
  className?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: "uploading" | "complete" | "error";
  error?: string;
}

export function FileUpload({ projectId, category = "MISC", onUploadComplete, className }: FileUploadProps) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setFiles((prev) => [...prev, { file, progress: 0, status: "uploading" }]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId);
      formData.append("category", category);

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      setFiles((prev) =>
        prev.map((f) => (f.file === file ? { ...f, progress: 100, status: "complete" } : f))
      );

      onUploadComplete?.();
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.file === file
            ? { ...f, status: "error", error: error instanceof Error ? error.message : "Upload failed" }
            : f
        )
      );
    }
  }, [projectId, category, onUploadComplete]);

  const handleFiles = useCallback((fileList: FileList) => {
    Array.from(fileList).forEach(uploadFile);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== file));
  };

  return (
    <div className={className}>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-300 hover:border-gray-400"
        )}
      >
        <Upload className="mb-2 h-8 w-8 text-gray-400" />
        <p className="text-sm font-medium text-gray-700">Drop files here or click to browse</p>
        <p className="mt-1 text-xs text-gray-500">Max file size: 50MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border border-gray-200 p-3">
              <FileText className="h-5 w-5 shrink-0 text-gray-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-700">{f.file.name}</p>
                <p className="text-xs text-gray-500">{(f.file.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
              {f.status === "uploading" && (
                <div className="h-1.5 w-24 rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: "50%" }} />
                </div>
              )}
              {f.status === "complete" && <CheckCircle className="h-5 w-5 text-emerald-500" />}
              {f.status === "error" && (
                <span className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="h-4 w-4" /> {f.error}
                </span>
              )}
              <button onClick={() => removeFile(f.file)} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
