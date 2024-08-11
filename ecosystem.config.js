module.exports = {
    apps: [
      {
        name: 'backend',
        script: './server/start/start.js',
        watch: true,
        ignore_watch: ['node_modules', 'client'],
        env: {
          NODE_ENV: 'development',
        },
      },
      {
        name: 'frontend',
        cwd: './client',
        script: 'npm',
        args: 'start',  // React 앱을 빌드
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  };