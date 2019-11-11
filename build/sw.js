const workboxBuild = require('workbox-build')

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw.js',
      swDest: 'dist/sw.js',
      globDirectory: 'dist',
      globPatterns: ['**/*.{js,css,html,png,webmanifest}']
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn)
      console.log(`${count} files will be precached, totaling ${size} bytes.`)
    })
}

buildSW()
