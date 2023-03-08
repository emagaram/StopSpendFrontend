// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

module.exports = (phase, { defaultConfig }) => ({
  /**
   * @type {import('next').NextConfig}
   */
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  async rewrites() {
    const landingRoutes = [
      "/home",
      "/product",
      "/pricing",
      "/privacy",
      "/terms-and-conditions",
    ];
    return {
      beforeFiles: [
        {
          source: "/private/:path*",
          destination: `/404`,
        },
      ].concat(
        landingRoutes.map((route) => {
          return {
            source: route,
            destination: `/private${route}`,
            has: [
              {
                type: "cookie",
                key: "isLoggedIn",
                value: "true",
              },
            ],
          };
        })
      ),
    };
  },
  async redirects() {
    const publicOnlyRoutes = ["/", "/login", "/signup", "/forgot-password"];
    const privateOnlyRoutes = ["/my-setup", "/my-account", "/recent-activity"];
    return []
      .concat(
        publicOnlyRoutes.map((route) => {
          return {
            source: route,
            destination: `/my-setup`,
            permanent: false,
            has: [
              {
                type: "cookie",
                key: "isLoggedIn",
                value: "true",
              },
            ],
          };
        })
      )
      .concat(
        privateOnlyRoutes.map((route) => {
          return {
            source: route,
            destination: `/login`,
            permanent: false,
            has: [
              {
                type: "cookie",
                key: "isLoggedIn",
                value: "false",
              },
            ],
          };
        })
      );
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
    ];
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
});
