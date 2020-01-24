import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import makeStyles from '@material-ui/styles/makeStyles';
import { withRouter } from 'react-router-dom';
import Back from './common/Back';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';

const qs = require('query-string');
const backgroundShape = require('../images/shape.svg');

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  smallContainer: {
    width: '60%'
  },
  bigContainer: {
    width: '80%'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  borderColumn: {
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    paddingBottom: 24,
    marginBottom: 24
  },
  flexBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  }
})

const getSteps = () => {
  return [
    'Information',
    'Deceased Donation',
    'Confirm',
    'Done'
  ];
}

const getStepIcons = (label) => {
  const stepIcons = {
    'Information': <HowToRegIcon />,
    'Deceased Donation': <KeyboardIcon />,
    'Confirm': <CheckCircleIcon />,
    'Done': <HowToRegIcon />
  };
  debugger
  return stepIcons[label];
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      { getStepIcons(props.icon) }
    </div>
  );
}
class Wizard extends Component {

  state = {
    activeStep: 0,
    receivingAccount: 'Home Account',
    repaimentAccount: 'Saving Account',
    termsChecked: false,
    labelWidth: 0,
    confirmed: '',
    donateOrgans: [
      { key: 'bone', description: "Bone", checked: false },
      { key: 'cornea', description: "Cornea", checked: false },
      { key: 'heart', description: "Heart and heart valves", checked: false },
      { key: 'lungs', description: "Lungs", checked: false },
      { key: 'liver', description: "Liver", checked: false },
      { key: 'kidneys', description: "Kidneys", checked: false },
      { key: 'pancreas', description: "Pancreas", checked: false },
      { key: 'skin', description: "Skin", checked: false },
      { key: 'tendons', description: "Tendons and ligaments", checked: false }
    ]
  }

  componentDidMount() {

  }

  handleNext = () => {
    let currentStep = this.state.activeStep;
    let nextStep = currentStep + 1;
    if (currentStep === 0) {
      nextStep = this.state.confirmed === 'yes' ? 1: 2;
    }
    this.setState(state => ({
      activeStep: nextStep,
    }));
    window.scrollTo(0, 0);
  };

  handleBack = () => {
    let currentStep = this.state.activeStep;
    let nextStep = currentStep - 1;
    if (currentStep === 2) {
      nextStep = this.state.confirmed === 'yes' ? 1: 0;
    }
    this.setState(state => ({
      activeStep: nextStep,
    }));
    window.scrollTo(0, 0);
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  stepActions() {
    if(this.state.activeStep === 2) {
      return 'Confirm';
    }
    if(this.state.activeStep === 3) {
      return 'Done';
    }
    return 'Next';
  }

  goToDashboard = event => {
    const queryString = this.props.location.search

    this.props.history.push({
      pathname: '/search',
      search: queryString
    })
  }

  handleOrganInputChange = event => {
    for (let organ of this.state.donateOrgans) {
      if (organ.key == event.target.value) {
        organ.checked = event.target.checked;
      }
    }
    this.setState({ donateOrgans: this.state.donateOrgans});
  }

  handleSelectAllOrgans = event => {
    for (let organ of this.state.donateOrgans) {
      organ.checked = event.target.checked;
    }
    this.setState({ donateOrgans: this.state.donateOrgans});
  }

  areAllSelected = () => {
    let allSelected = true;
    for (let organ of this.state.donateOrgans) {
      allSelected = allSelected && organ.selected
    }
    return allSelected;
  }

  render() {

    const { classes } = this.props;
    const queryString = this.props.location.search
    const parsed = queryString ? qs.parse(queryString) : {}
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Back />
                <div className={classes.stepContainer}>
                  <div className={classes.bigContainer}>
                    <Stepper classes={{root: classes.stepper}} activeStep={activeStep} alternativeLabel>
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel icon={label}  StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  { activeStep === 0 && (
                  <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <div className={classes.topInfo}>
                        <div>
                          <Typography variant="subtitle1" gutterBottom>
                            Does the client want to be an Organ Donor?
                          </Typography>
                        </div>
                        <div>
                          <RadioGroup aria-label="position" name="position" value={this.state.confirmed} onChange={event => this.setState({confirmed: event.target.value})} row>
                            <FormControlLabel
                              value="yes"
                              control={<Radio color="primary" />}
                              label="Yes"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="no"
                              control={<Radio color="primary" />}
                              label="No"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                        Client Information
                      </Typography>
                      <Grid item container xs={12}>
                        <Grid item xs={3}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Name
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            Brose, Perry
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Address
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            53 BISCAYNE DRIVE, BISMARCK. ND
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Phone
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            (284) 938-1849
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom align="right">
                            PHN
                          </Typography>
                          <Typography variant="h6" gutterBottom align="right">
                            58383939
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 1 && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <div>
                        <div style={{marginBottom: 32}}>
                          <Typography variant="subtitle1" gutterBottom>
                            Deceased donation becomes possible when someone is at the end-of-life and death is imminent. Only a small portion of individuals die in such a way that makes organ donation possible – approximately 5% of all deaths.
                          </Typography>
                        </div>
                        <div>
                          <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                            Donate Organs
                          </Typography>
                          
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={this.handleSelectAllOrgans} 
                                  checked={this.areAllSelected()}
                                />
                              }
                              label="All"
                            />
                            {
                              this.state.donateOrgans.map((organ) => 
                                <FormControlLabel
                                  key={organ.key}
                                  control={
                                  <Checkbox
                                    value={organ.key}
                                    onChange={this.handleOrganInputChange} 
                                    checked={organ.checked}
                                  />
                                }
                                label={organ.description}
                              />
                              )
                            }
                          </FormGroup>
                        </div>
                      </div>
                    </Paper>
                    </div>
                  )}
                  { activeStep === 2 && (
                  <div className={classes.bigContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12} md={12} sm={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" style={{fontWeight: 'bold'}} gutterBottom>
                            Confirm
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Please verify your inputs
                          </Typography>
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Grid item container xs={12}>
                        <Grid item xs={3}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Name
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            Brose, Perry
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Address
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            53 BISCAYNE DRIVE, BISMARCK. ND
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                            Phone
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            (284) 938-1849
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom align="right">
                            PHN
                          </Typography>
                          <Typography variant="h6" gutterBottom align="right">
                            58383939
                          </Typography>
                        </Grid>
                      </Grid>
                      <br />
                      
                      <Typography style={{textTransform: 'uppercase', marginBottom: 20}} color='secondary' gutterBottom>
                        Selected Donate Organs
                      </Typography>
                      
                      <FormGroup>
                        {
                          this.state.donateOrgans.map((organ) => 
                            <FormControlLabel
                              key={organ.key}
                              control={
                              <Checkbox
                                value={organ.key}
                                onChange={this.handleOrganInputChange} 
                                checked={organ.checked}
                                disabled
                              />
                            }
                            label={organ.description}
                          />
                          )
                        }
                      </FormGroup>
                    </Paper>
                    </div>
                  )}
                  { (activeStep === 3) && (
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid item container xs={12}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            The registration has been completed.
                          </Typography>
                          <Button fullWidth variant='outlined'>
                            Download Receipt
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                    </div>
                  )}
                  <div className={classes.flexBar}>
                    { activeStep !== 3 && (
                      <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.backButton}
                      size='large'
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep !== 3 ? this.handleNext : this.goToDashboard}
                      size='large'
                      disabled={activeStep === 0 && !this.state.confirmed}
                    >
                      {this.stepActions()}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Wizard));
