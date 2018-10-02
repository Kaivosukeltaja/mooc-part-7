module.exports = {
  launch: {
    args: ['--no-sandbox']
  },
  server: {
    command: 'cross-env NODE_ENV=test TEST_PORT=3003 node index.js',
    port: 3003,
  },
}
