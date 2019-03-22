const tableHeight = 240

const styles = theme => ({
  card: {
    height: 370,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1
  },
  title: {
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  error: {
    fontSize: 14,
    color: '#333',
    width: '75%'
  },
  loadingContainer: {
    height: tableHeight,
    flexGrow: 1
  },
  table: {
    height: tableHeight,
    maxWidth: 400,
    flexGrow: 1,
    '& tr:nth-of-type(odd)': {
      backgroundColor: '#fcfcfc'
    }
  }
})
export default styles
