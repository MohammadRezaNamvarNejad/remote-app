// next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');
module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remoteApp',
        remotes: {// this will contain remote route
          host: `host@http://localhost:3000/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './RemoteComponent': './src/components/RemoteComponent.js',
          './checkout': './pages/checkout',
        },
        shared: {
          react: {
            singleton: true, // this will make sure it will be loaded 
                             // only once during runtime
            eager: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          // files or dependencies we want to share
        },
      }),
    );

    return config;
  },
};