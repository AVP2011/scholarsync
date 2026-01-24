const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/* ---------------- OPPORTUNITIES ---------------- */

export async function fetchOpportunities(
  trust?: string,
  page: number = 1,
  limit: number = 10
) {
  const params = new URLSearchParams();
  if (trust) params.append("trust", trust);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(
    `${API_BASE}/opportunities?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  return res.json();
}

export async function fetchStats() {
  const res = await fetch(
    `${API_BASE}/opportunities/stats`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return res.json();
}

/* ---------------- AUTH ---------------- */

/** LOGIN */
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Login failed");
  }

  return res.json(); // { access_token, token_type }
}

/** REGISTER */
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Registration failed");
  }

  return res.json();
}
export async function analyzeTrust(url: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/trust/analyze`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }
  );

  if (!res.ok) throw new Error("Trust analysis failed");
  return res.json();
}