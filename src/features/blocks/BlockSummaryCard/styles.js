const styles = theme => ({
  card: {
    width: '100%',
    padding: '0 1rem'
  },
  grow: {
    flexGrow: 1
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '500',
    padding: '1.5rem 0 .4rem'
  },
  tableContainer: {
    maxWidth: 400,
    flexGrow: 1,
    paddingRight: '1rem !important',
    '& tr:nth-of-type(odd)': {
      backgroundColor: '#fcfcfc'
    }
  },
  hashesContainer: {
    width: '100%',
    maxWidth: 500
  },
  blockHash: {
    '& a': {
      textDecoration: 'none'
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})
export default styles
