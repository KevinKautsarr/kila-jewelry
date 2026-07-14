export interface Province {
  id: string;
  name: string;
}

export interface Regency {
  id: string;
  province_id: string;
  name: string;
}

const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";
const FETCH_TIMEOUT_MS = 6000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request gagal dengan status ${response.status}`);
    }
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchProvinces(): Promise<Province[]> {
  const response = await fetchWithTimeout(`${BASE_URL}/provinces.json`);
  return response.json();
}

export async function fetchRegencies(provinceId: string): Promise<Regency[]> {
  const response = await fetchWithTimeout(
    `${BASE_URL}/regencies/${provinceId}.json`
  );
  return response.json();
}
