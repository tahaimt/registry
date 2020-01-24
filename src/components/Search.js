import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Topbar from './Topbar';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, deepPurple, green } from '@material-ui/core/colors';

const customTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
    error: deepPurple
  }
});


const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 50
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  tableWrapper: {
    overflow: 'auto',
    marginTop: 20
  },
  button: {
    margin: theme.spacing(0.5)
  }
});

const monthRange = Months;

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, format: value => value.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) },
  { id: 'dob', label: 'DOB', minWidth: 100, align: 'right' },
  { id: 'address', label: 'Address', minWidth: 170, format: value => value.replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) },
  { id: 'phone', label: 'Phone', minWidth: 70 },
  { id: 'registered', label: 'Registered as Donor?', minWidth: 30 },
];
let i = 0;
function createData(name, dob, address, phone, buttonHandler) {

  return { id: i++, name, dob, address, phone, registered: Math.random() >= 0.5 ? 
    ( 
      <>
        <IconButton disabled>
          <CloseIcon />
        </IconButton>
        <Button variant="contained" onClick={buttonHandler} color="secondary" size="small">
          Register
        </Button>
      </>
    ): 
    (
      <>
        <IconButton disabled>
          <CheckIcon />
        </IconButton>
        <Button variant="contained" onClick={buttonHandler} color="primary" size="small">
          Edit
        </Button>
      </>
    ) };
}


class Search extends Component {

  state = {
    loading: true,
    amount: 15000,
    period: 3,
    start: 0,
    monthlyInterest: 0,
    totalInterest: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    data: [],
    name: '',
    page: 0,
    rowsPerPage: 10,
    redirect: null,
    rows: [
      createData("BROSE, PERRY", "22/09/43", "5520 BUCHANAN ST., APACHE JUNCTION. ND", "8251275588", () => this.props.history.push('/wizard')),
      createData("BROSE, PERRY", "22/01/98", "5520 BUCHANAN ST., APACHE JUNCTION. ND", "8251275588", () => this.props.history.push('/wizard')),
      createData("BURCH-PERRY, JEREMIAH", "19500316", "1649 PLEASANT RIDGE COURT, DICKINSON. ND", "8255328179", () => this.props.history.push('/wizard')),
      createData("COATS-BARR, OSCAR", "20070626", "221 BROADALE ROAD, NEW ENGLAND. ND", "8259343869", () => this.props.history.push('/wizard')),
      createData("SCHUMACHER, PERRY", "19490414", "7 STEINSBURG ROAD, TIOGA. ND", "8253017307", () => this.props.history.push('/wizard')),
      createData("PERRY, JAMES", "20121119", "13 FOX MILL BOULEVARD, BISMARCK. ND", "8259784749", () => this.props.history.push('/wizard')),
      createData("SOUDER-PERRY, BRUCE", "19440914", "5 WHITE OAK STREET, DICKINSON. ND", "8252101620", () => this.props.history.push('/wizard')),
      createData("BERKOWITZ, PERRY", "19700518", "110 BUCKLEY COURT, MUNICH. ND", "8257277703", () => this.props.history.push('/wizard')),
      createData("PRICE-BAUER, HELEN", "19810126", "15 OVERLOOK TRAIL, BISMARCK. ND", "8258972348", () => this.props.history.push('/wizard')),
      createData("PRICE-BAUER, BILLY", "19890221", "15 OVERLOOK TRAIL, BISMARCK. ND", "8258972348", () => this.props.history.push('/wizard')),
      createData("PRICE-BAUER, ELIZABETH", "20150828", "15 OVERLOOK TRAIL, BISMARCK. ND", "8258972348", () => this.props.history.push('/wizard')),
      createData("PRICE-BAUER, CORA", "20180122", "15 OVERLOOK TRAIL, BISMARCK. ND", "8258972348", () => this.props.history.push('/wizard')),
      createData("PEREZ-BOYER, FRANCISCA", "19680504", "1 WILDWING ROAD, MANDAN. ND", "8258390927", () => this.props.history.push('/wizard')),
      createData("BURROW-PEREZ, ANDREW", "19410730", "43 MARTHA STREET, BISMARCK. ND", "8255470568", () => this.props.history.push('/wizard')),
      createData("BEYER, PORSCHE", "20021109", "53 BISCAYNE DRIVE, BISMARCK. ND", "8257107905", () => this.props.history.push('/wizard')),
      createData("BARR-PEARCE, EMMA", "19510602", "59 MONARDA TRAIL, MINOT. ND", "8257144076", () => this.props.history.push('/wizard')),
      createData("PIERCE, BRYCE", "20180220", "6547 BROUGHTON LANE EAST, HANKINSON. ND", "8254611566", () => this.props.history.push('/wizard')),
      createData("BURSE, PATRICIA", "19570411", "1433 LONGWOOD DRIVE, WILLISTON. ND", "8257274245", () => this.props.history.push('/wizard')),
      createData("BARE-HARDY, PEARL", "20040826", "674 EDMUNDS PLACE, MINOT. ND", "8252739453", () => this.props.history.push('/wizard'))
    ]
  };

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
    //  setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: +event.target.value});
    // setRowsPerPage(+event.target.value);
    this.setState({page: 0});
    // setPage(0);
  };

  updateValues() {
    const { amount, period, start } = this.state;
    const monthlyInterest = (amount)*(Math.pow(0.01*(1.01), period))/(Math.pow(0.01, period - 1))
    const totalInterest = monthlyInterest * (period + start);
    const totalPayment = amount + totalInterest;
    const monthlyPayment = period > start ? totalPayment/(period - start) : totalPayment/(period)

    const data = Array.from({length: period + start}, (value, i) => {
      const delayed = i < start;
      return {
        name: monthRange[i],
        'Type': delayed ? 0 : Math.ceil(monthlyPayment).toFixed(0),
        'OtherType': Math.ceil(monthlyInterest).toFixed(0)
      }
    })

    this.setState({monthlyInterest, totalInterest, totalPayment, monthlyPayment, data})
  }

  componentDidMount() {
    this.updateValues();
  }

  handleChangeAmount = (event, value) => {
    this.setState({amount: value, loading: false});
    this.updateValues();
  }

  handleChangePeriod = (event, value) => {
    this.setState({period: value, loading: false});
    this.updateValues();
  }

  handleChangeStart = (event, value) => {
    this.setState({start: value, loading: false});
    this.updateValues();
  }

  handleChange = (name) => (event) => {
    this.setState({name: event.target.value})
    // setValues({ ...values, [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        
        <MuiThemeProvider theme={customTheme}>
          <div className={classes.root}>
            <Grid container justify="center" >
              <Grid alignItems="center" justify="center" container className={classes.grid}>
                <Grid item xs={12}>
                  <div className={classes.topBar}>
                    <div className={classes.block}>
                      <Typography variant="h6" gutterBottom>Search for Clients</Typography>
                      <Typography variant="body1">
                        {/* Adjust and play with our sliders. */}
                      </Typography>
                    </div>
                    <div>
                      <Button variant="outlined" className={classes.outlinedButtom} color="error">
                        Get help
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.blockCenter}>               
                        <TextField
                          id="standard-name"
                          label="First Name"
                          className={classes.textField}
                          value={this.state.name}
                          onChange={this.handleChange('name')}
                          margin="normal"
                        />
                        <TextField
                          id="standard-uncontrolled"
                          label="Last Name"
                          defaultValue=""
                          className={classes.textField}
                          margin="normal"
                        />
                        <TextField
                          required
                          id="standard-required"
                          label="Zip Code"
                          defaultValue=""
                          className={classes.textField}
                          margin="normal"
                        />
                        <TextField
                          required
                          id="standard-required"
                          label="Date Of Birth"
                          defaultValue=""
                          className={classes.textField}
                          margin="normal"
                        />
                        <TextField
                          required
                          id="standard-required"
                          label="PHN"
                          defaultValue=""
                          className={classes.textField}
                          margin="normal"
                        />
                      </div>
                    </div>
                    
                    <div style={{ textAlign: "right"}}>
                      <Button variant="contained" color="default" className={classes.button}>Clear</Button>
                      <Button variant="contained" color="action" className={classes.button} style={{backgroundColor: 'blue', color: 'white'}}>Search</Button>
                    </div>
                    <div className={classes.tableWrapper}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map(column => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map(column => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format ? column.format(value) : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={this.state.rows.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      backIconButtonProps={{
                        'aria-label': 'previous page',
                      }}
                      nextIconButtonProps={{
                        'aria-label': 'next page',
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Search));
