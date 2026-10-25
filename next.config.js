const isStandaloneBuild = process.env.BUILD_STANDALONE === "true";
const isDevelopment = process.env.NODE_ENV === "development";

// Portal BPS (Next.js terpisah, basePath "/bps") disajikan di bem-fteic.com/bps lewat multi-zone.
const bpsZoneUrl =
  process.env.BPS_ZONE_URL ||
  (isDevelopment
    ? "http://localhost:3300"
    : "https://project-lens-keor.vercel.app");

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStandaloneBuild ? { output: "standalone" } : {}),
  poweredByHeader: false,
  async headers() {
    return [
      {
        // /bps dilayani Portal BPS dengan header keamanannya sendiri.
        source: "/((?!bps(?:/|$)).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "form-action 'self'",
              `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.bem-fteic.com${isDevelopment ? " http://localhost:8080" : ""}`,
              ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
            ].join("; "),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/bps", destination: `${bpsZoneUrl}/bps` },
      { source: "/bps/:path+", destination: `${bpsZoneUrl}/bps/:path+` },
    ];
  },
};

module.exports = nextConfig;
