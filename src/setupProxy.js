const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
    app.use(
        createProxyMiddleware(["/api"], {
            // 애니메이션 생성용 proxy 서버
            // target: "http://192.168.155.106:8080/",
            target: "http://localhost:8080/",
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware(["/local"], {
            // 기타 생성용 proxy 서버
            target: "http://192.168.155.106:8080/",
            //target: "http://localhost:8080/",
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware(["/v1"], {
            target: "https://hyperbrain.ai/",
            changeOrigin: true,
        })
    );
};
