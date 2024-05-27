/** @type {import('@remix-run/dev').AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    appDirectory: "src",
    tailwind: true,
    postcss: true,
    browserNodeBuiltinsPolyfill: {
        modules: {
            util: true,
            stream: true,
            https: true,
            url: true,
            os: true,
            buffer: true,
            perf_hooks: true,
            path: true,
            crypto: true,
            net: true,
            tls: true,
            fs: "empty",
        }
    }
};
