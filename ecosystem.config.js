module.exports = {
  apps: [
    {
      name: "tabata",
      cwd: "/var/www/tabata",
      script: "node",
      args: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ],
}
