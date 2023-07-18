module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    process.env.NODE_ENV === 'production'
    ? [
        '@fullhuman/postcss-purgecss',
        {
            content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}',
                './lib/hf-react/build/index.js'
            ],
            whitelist: [

            ],
            defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
        },
    ]
    : undefined,
  ],
}