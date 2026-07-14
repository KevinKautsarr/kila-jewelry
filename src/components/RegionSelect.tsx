"use client";

import { useEffect, useState } from "react";
import { fetchProvinces, fetchRegencies, type Province, type Regency } from "@/src/lib/region";

interface RegionSelectProps {
  provinsi: string;
  kota: string;
  onProvinsiChange: (value: string) => void;
  onKotaChange: (value: string) => void;
}

export default function RegionSelect({
  provinsi,
  kota,
  onProvinsiChange,
  onKotaChange,
}: RegionSelectProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [provincesStatus, setProvincesStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const [regenciesStatus, setRegenciesStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProvincesStatus("loading");
    fetchProvinces()
      .then((data) => {
        if (cancelled) return;
        setProvinces(data);
        setProvincesStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setProvincesStatus("error");
        setManualMode(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!provinsi || manualMode) {
      setRegencies([]);
      setRegenciesStatus("idle");
      return;
    }

    const selected = provinces.find((province) => province.name === provinsi);
    if (!selected) {
      setRegencies([]);
      setRegenciesStatus("idle");
      return;
    }

    let cancelled = false;
    setRegenciesStatus("loading");
    fetchRegencies(selected.id)
      .then((data) => {
        if (cancelled) return;
        setRegencies(data);
        setRegenciesStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setRegenciesStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinsi, provinces, manualMode]);

  const handleProvinsiSelect = (value: string) => {
    onProvinsiChange(value);
    onKotaChange("");
  };

  if (manualMode) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="provinsi"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Provinsi
          </label>
          <input
            id="provinsi"
            type="text"
            required
            value={provinsi}
            onChange={(event) => onProvinsiChange(event.target.value)}
            placeholder="Ketik nama provinsi"
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>
        <div>
          <label
            htmlFor="kota"
            className="text-xs uppercase tracking-widest text-muted"
          >
            Kota/Kabupaten
          </label>
          <input
            id="kota"
            type="text"
            required
            value={kota}
            onChange={(event) => onKotaChange(event.target.value)}
            placeholder="Ketik nama kota/kabupaten"
            className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40"
          />
        </div>
        {provincesStatus === "error" && (
          <p className="text-xs text-muted sm:col-span-2">
            Data wilayah otomatis sedang tidak tersedia — silakan isi manual.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label
          htmlFor="provinsi"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Provinsi
        </label>
        <select
          id="provinsi"
          required
          value={provinsi}
          onChange={(event) => handleProvinsiSelect(event.target.value)}
          disabled={provincesStatus === "loading"}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40 disabled:opacity-50"
        >
          <option value="" className="bg-background">
            {provincesStatus === "loading" ? "Memuat provinsi..." : "Pilih provinsi"}
          </option>
          {provinces.map((province) => (
            <option key={province.id} value={province.name} className="bg-background">
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="kota"
          className="text-xs uppercase tracking-widest text-muted"
        >
          Kota/Kabupaten
        </label>
        <select
          id="kota"
          required
          value={kota}
          onChange={(event) => onKotaChange(event.target.value)}
          disabled={!provinsi || regenciesStatus === "loading"}
          className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-white/40 disabled:opacity-50"
        >
          <option value="" className="bg-background">
            {regenciesStatus === "loading" ? "Memuat kota..." : "Pilih kota/kabupaten"}
          </option>
          {regencies.map((regency) => (
            <option key={regency.id} value={regency.name} className="bg-background">
              {regency.name}
            </option>
          ))}
        </select>
        {regenciesStatus === "error" && (
          <p className="mt-2 text-xs text-muted">
            Gagal memuat daftar kota.{" "}
            <button
              type="button"
              onClick={() => setManualMode(true)}
              className="underline hover:text-foreground"
            >
              Isi manual saja
            </button>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setManualMode(true)}
        className="text-left text-xs text-muted underline hover:text-foreground sm:col-span-2"
      >
        Provinsi/kota tidak ditemukan? Isi manual
      </button>
    </div>
  );
}
