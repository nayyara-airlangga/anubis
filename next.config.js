const withReactSvg = require("next-react-svg")
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = withReactSvg({
  reactStrictMode: true,
  include: path.resolve(__dirname, "public/assets"),
  webpack(config) {
    return config
  },
})

module.exports = nextConfig
