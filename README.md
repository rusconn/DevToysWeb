# DevToysWeb

A web clone of [DevToys](https://github.com/veler/DevToys)

## Setup

To reproduce environment, use [VOLTA](https://volta.sh/)

## Known issues

- [App directory root not-found.tsx not compiled to 404.html when using static export](https://github.com/vercel/next.js/issues/48227)
- Tool search does not set query parameters
  - [(Shallow routing) updating search params causes server code to rerun.](https://github.com/vercel/next.js/issues/49668)
- [Editor may not resize to fit container size](https://github.com/suren-atoyan/monaco-react/issues/346)
- CSS outlines messed up

## Todo

- [x] Add site layout
- [x] Add all tools page mock
- [ ] Implement tools
  - [x] Converters
  - [x] Encoders / Decoders
  - [x] Formatters
  - [x] Generators
  - [ ] Text
  - [ ] Graphic
- [ ] Settings
  - [x] Settings menu item
  - [x] Support dark mode
  - [ ] Support i18n
