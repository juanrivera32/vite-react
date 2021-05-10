import { style } from '@vanilla-extract/css'

export const h2Titles = style({
  color: 'black'
})

export const catList = style({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '0 1em',
  justifyContent: 'center',
  '@media': {
    'screen and (min-width: 1800px)': {
      flexWrap: 'nowrap'
    }
  }
})

export const catItemContainer = style({
  borderRadius: '0.5em',
  listStyleType: 'none',
  marginInline: 'auto',
  marginBlock: '2%',
  '@media': {
    'screen and (min-width: 768px)': {
      marginInline: '1%',
      width: '46%',
    },
    'screen and (min-width: 1200px)': {
      marginInline: '1%',
      width: '25%',
    },
  }
})

export const catArticle = style({
  borderRadius: '0.5em',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  display: 'inline-block',
  overflow: 'hidden',
})

export const catImage = style({
  height: '15em',
  width: '100%',
  objectFit: 'cover',
})

export const categories = style({
  color: 'chocolate',
  fontSize: '1.5em',
  fontFamily: 'Fira Sans, sans-serif',
  marginBottom: 0,
  marginTop: '-5px',
  paddingBlock: '10px',
  paddingInline: '5px',
  backgroundColor: 'lightyellow',
})