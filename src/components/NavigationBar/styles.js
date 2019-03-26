export const navbarHeight = 48
export const navbarTransitionMs = 300

const styles = theme => ({
  root: {
    width: '100%',
    '& a': {
      color: 'white'
    }
  },
  container: {
    overflowY: 'hidden',
    flexWrap: 'wrap',
    height: navbarHeight,
    minHeight: navbarHeight,
    transition: `height ${navbarTransitionMs / 1000}s ease-out`
  },
  containerExpanded: {
    padding: '0 1rem 1rem',
    height: navbarHeight * 2,
    [theme.breakpoints.up('sm')]: {
      padding: '0 1rem',
      height: navbarHeight
    }
  },
  logo: {
    color: 'white'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  githubButton: {
    paddingRight: '1rem',
    '& svg': {
      fill: 'white'
    },
    '&[x-placement*="bottom"] $arrow': {
      marginTop: '-4rem'
    }
  },
  mobileSearchButton: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    '& svg': {
      fill: 'white'
    }
  },
  search: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '300px'
    },
    '& button': {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
    }
  }
})
export default styles
