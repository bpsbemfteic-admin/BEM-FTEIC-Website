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
  // Hanya di mode pratinjau (proxy API aktif): jangan buang garis miring agar /api-bem/events/ tetap utuh.
  ...(process.env.API_PROXY_TARGET ? { skipTrailingSlashRedirect: true } : {}),
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
  async redirects() {
    // Alamat pendek untuk dibagikan, menuju halaman milik Portal BPS (/bps).
    return [
      { source: "/jadwal", destination: "/bps/jadwal", permanent: false },
      { source: "/kinerja", destination: "/bps", permanent: false },
      {
        source: "/keor/:path*",
        destination: "/bps/keor/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/bps", destination: `${bpsZoneUrl}/bps` },
      { source: "/bps/:path+", destination: `${bpsZoneUrl}/bps/:path+` },
      // Opsional: bila web ini dipasang di domain lain (mis. pratinjau di Vercel), API pusat yang hanya
      // menerima origin bem-fteic.com diakses lewat server ini. Set API_PROXY_TARGET=https://api.bem-fteic.com
      // dan NEXT_PUBLIC_API_URL_PROD=/api-bem. Tidak aktif di VPS selama env itu tidak diisi.
      ...(process.env.API_PROXY_TARGET
        ? [
            // API pusat mewajibkan garis miring di akhir (/events/).
            {
              source: "/api-bem/:path*/",
              destination: `${process.env.API_PROXY_TARGET}/:path*/`,
            },
            {
              source: "/api-bem/:path*",
              destination: `${process.env.API_PROXY_TARGET}/:path*`,
            },
          ]
        : []),
    ];
  },
};

module.exports = nextConfig;
