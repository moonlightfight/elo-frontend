module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
  i18n: {
    locales: ['en', 'ja', 'ko', 'zh', 'it', 'pt', 'es'],
    defaultLocale: 'en'
  }
};
