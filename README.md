## About

This is the frontend repository of a blockchain lottery. The documentation in progress, but here is a brief:

About the stack:  
- Typescript  
- [Nextjs](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)  
- [Styled Components](https://styled-components.com/)
- [Emotion](https://emotion.sh)  
- [Twin.Macro](https://github.com/ben-rogerson/twin.macro) (combining Styled Components with TailwindCSS)  
- [NextI18Next](https://github.com/i18next/next-i18next) integrated (wrong translationkeys result in compilation errors)  
- [Web3React](https://github.com/Uniswap/web3-react)  
- [Ethers](https://docs.ethers.io/v5/)  
- [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Observables](https://redux-observable.js.org/) (with hydration example)  
- [Ramda](https://ramdajs.com/)
among others

## Problems - Solutions
I have been working at Blockchain companies, for some time now, and I have tried to solve most problems I have encountered in this repository.
Some of these problems and solutions are:
- Tailwind is awesome, but lot of noise with the classes -> Use styled components & twin.macro to separate presentational things.
- Keep ABI's on the frontend & keep them up to date :( -> Create an installable npm package from the hardhat typechain output (`@nsorcell/protocol`).
- Async logic is also very noisy in useEffects -> Use redux observables, to decouple asynchronous logic.
- Translation keys are arbitrary, easy typos -> Leverage typescript, so wrong translation keys are compilation errors.

## Getting Started

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


