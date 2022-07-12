import { css } from "styled-components"

const font = css`
  font-family: "Inter", "sans-serif";
`

const h1 = css`
  ${font};
  font-size: 45px;
  font-weight: 800;
  line-height: 54px;
`

const h2 = css`
  ${font};
  font-style: normal;
  font-weight: 300;
  font-size: 60px;
  line-height: 72.54px;
`

const h3 = css`
  ${font};
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 48.84px;
`

const h4 = css`
  ${font};
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
`

const h5 = css`
  ${font};
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`

const h6 = css`
  ${font};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 35.41px;
  letter-spacing: 19.54px;
`

const subtitle1 = css`
  ${font};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`

const subtitle2 = css`
  ${font};
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17.09px;
`

const body1 = css`
  ${font};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`

const body2 = css`
  ${font};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`

const body3 = css`
  ${font};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`

const label = css`
  ${font};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`

export const styles = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  subtitle1,
  subtitle2,
  body1,
  body2,
  body3,
  label,
}

export type Variant = keyof typeof styles
export const variants = Object.keys(styles) as Variant[]
