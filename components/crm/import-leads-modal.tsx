"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  X,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type ParsedRow = Record<string, any>;

type ImportLead = {
  company_name: string;
  company_number: string;
  website: string;
  status: "pending" | "success" | "failed";
  note: string;
  source: string;
};

type ValidationError = {
  row: number;
  message: string;
};

const REQUIRED_HEADERS = ["company_name", "company_number"];
const OPTIONAL_HEADERS = ["website", "status", "note", "source"];

function normalizeHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

function normalizeStatus(value: unknown): "pending" | "success" | "failed" {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (["success", "won", "converted", "closed"].includes(normalized)) {
    return "success";
  }

  if (["failed", "lost", "dead"].includes(normalized)) {
    return "failed";
  }

  return "pending";
}

function toCleanString(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeWebsite(value: unknown) {
  const cleaned = toCleanString(value);

  if (!cleaned || cleaned.toLowerCase() === "no website") {
    return "No website";
  }

  return cleaned;
}

function isClickableUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

function parseCsvFile(file: File): Promise<ParsedRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: normalizeHeader,
      complete: (results) => {
        resolve((results.data as ParsedRow[]) || []);
      },
      error: (error) => reject(error),
    });
  });
}

function parseExcelFile(file: File): Promise<ParsedRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
        }) as ParsedRow[];

        const normalizedRows = rows.map((row) => {
          const normalized: ParsedRow = {};
          Object.entries(row).forEach(([key, value]) => {
            normalized[normalizeHeader(key)] = value;
          });
          return normalized;
        });

        resolve(normalizedRows);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read Excel file."));
    reader.readAsArrayBuffer(file);
  });
}

function validateAndTransformRows(rows: ParsedRow[]) {
  const errors: ValidationError[] = [];
  const validRows: ImportLead[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    const company_name = toCleanString(row.company_name);
    const company_number = toCleanString(row.company_number);
    const website = normalizeWebsite(row.website);
    const note = toCleanString(row.note);
    const source = toCleanString(row.source) || "import";
    const status = normalizeStatus(row.status);

    if (!company_name) {
      errors.push({
        row: rowNumber,
        message: "Missing company_name",
      });
      return;
    }

    if (!company_number) {
      errors.push({
        row: rowNumber,
        message: "Missing company_number",
      });
      return;
    }

    validRows.push({
      company_name,
      company_number,
      website,
      note,
      source,
      status,
    });
  });

  return { validRows, errors };
}

export default function ImportLeadsModal() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewRows, setPreviewRows] = useState<ImportLead[]>([]);
  const [validRows, setValidRows] = useState<ImportLead[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [generalError, setGeneralError] = useState("");

  const canImport = validRows.length > 0 && !loading;

  const summary = useMemo(
    () => ({
      total: validRows.length + errors.length,
      valid: validRows.length,
      invalid: errors.length,
    }),
    [validRows, errors],
  );

  const resetState = () => {
    setFileName("");
    setPreviewRows([]);
    setValidRows([]);
    setErrors([]);
    setGeneralError("");
    setImportedCount(0);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setGeneralError("");
    setImportedCount(0);
    setLoading(true);
    setFileName(file.name);

    try {
      const lower = file.name.toLowerCase();
      let rows: ParsedRow[] = [];

      if (lower.endsWith(".csv")) {
        rows = await parseCsvFile(file);
      } else if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
        rows = await parseExcelFile(file);
      } else {
        throw new Error("Unsupported file type. Use CSV, XLSX, or XLS.");
      }

      const { validRows, errors } = validateAndTransformRows(rows);

      setValidRows(validRows);
      setPreviewRows(validRows.slice(0, 8));
      setErrors(errors);
    } catch (error: any) {
      setGeneralError(error.message || "Failed to parse file.");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setLoading(true);
      setGeneralError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in.");
      }

      const rowsToInsert = validRows.map((row) => ({
        ...row,
        owner_id: user.id,
      }));

      const batchSize = 100;

      for (let i = 0; i < rowsToInsert.length; i += batchSize) {
        const batch = rowsToInsert.slice(i, i + batchSize);

        const { error } = await supabase.from("leads").insert(batch);

        if (error) {
          throw new Error(error.message);
        }
      }

      setImportedCount(rowsToInsert.length);
      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error: any) {
      setGeneralError(error.message || "Import failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <Upload className="h-4 w-4" />
        Import CSV / Excel
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900">
                  Import leads
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Upload a CSV or Excel file with these columns:
                  <span className="font-semibold text-gray-700">
                    {" "}
                    company_name, company_number, website, status, note, source
                  </span>
                </p>
              </div>

              <button
                onClick={handleClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 rounded-[24px] border border-dashed border-gray-300 bg-gray-50/80 p-6">
              <label className="flex cursor-pointer flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>

                <div>
                  <div className="font-semibold text-gray-900">
                    Choose CSV or Excel file
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Accepted: .csv, .xlsx, .xls
                  </div>
                </div>

                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>

            {fileName ? (
              <div className="mt-4 text-sm text-gray-600">
                Selected file: <span className="font-semibold">{fileName}</span>
              </div>
            ) : null}

            {generalError ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {generalError}
              </div>
            ) : null}

            {importedCount > 0 ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Imported {importedCount} lead{importedCount === 1 ? "" : "s"}{" "}
                successfully.
              </div>
            ) : null}

            {(summary.total > 0 || loading) && (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="text-sm font-medium text-gray-500">
                    Total rows
                  </div>
                  <div className="mt-2 text-2xl font-black text-gray-900">
                    {summary.total}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <div className="text-sm font-medium text-emerald-700">
                    Valid rows
                  </div>
                  <div className="mt-2 text-2xl font-black text-emerald-800">
                    {summary.valid}
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                  <div className="text-sm font-medium text-rose-700">
                    Invalid rows
                  </div>
                  <div className="mt-2 text-2xl font-black text-rose-800">
                    {summary.invalid}
                  </div>
                </div>
              </div>
            )}

            {errors.length > 0 ? (
              <div className="mt-6 rounded-[24px] border border-rose-100 bg-rose-50/60 p-5">
                <div className="flex items-center gap-2 text-rose-700">
                  <AlertCircle className="h-4 w-4" />
                  <h4 className="font-bold">Validation issues</h4>
                </div>

                <div className="mt-3 space-y-2 text-sm text-rose-700">
                  {errors.slice(0, 8).map((error, index) => (
                    <div key={`${error.row}-${index}`}>
                      Row {error.row}: {error.message}
                    </div>
                  ))}
                  {errors.length > 8 ? (
                    <div>And {errors.length - 8} more issue(s)...</div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {previewRows.length > 0 ? (
              <div className="mt-6">
                <div className="mb-3">
                  <h4 className="font-bold text-gray-900">Preview</h4>
                  <p className="text-sm text-gray-500">
                    First {previewRows.length} valid row
                    {previewRows.length === 1 ? "" : "s"} ready to import
                  </p>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50/80">
                        <tr className="text-left">
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Company
                          </th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Number
                          </th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Website
                          </th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Status
                          </th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Source
                          </th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                            Note
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100 bg-white">
                        {previewRows.map((row, index) => (
                          <tr key={`${row.company_number}-${index}`}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {row.company_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.company_number}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {isClickableUrl(row.website) ? (
                                <a
                                  href={row.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 font-medium text-violet-600 hover:text-violet-700 hover:underline"
                                >
                                  Visit site
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              ) : (
                                <span className="text-gray-400">
                                  No website
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.status}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.source}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {row.note || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleImport}
                disabled={!canImport}
                className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.20)] transition-all hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : `Import ${validRows.length} lead${validRows.length === 1 ? "" : "s"}`}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
