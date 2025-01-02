module.exports = {
  apps: [
    {
      name: "loja",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
