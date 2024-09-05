module.exports = {
  apps: [
    {
      name: 'backend',
      script: './server/start/start.js',
      watch: ['./server'],
      ignore_watch: ['node_modules', ".git"],
      env: {
        NODE_ENV: 'development',
      },
    }
  ],
};