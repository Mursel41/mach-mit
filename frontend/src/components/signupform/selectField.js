import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      width: "100%"
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const activitiesList = [
    'Football',
    'Chess',
    'Tennis',
    'Basketball',
    'Cricket1',
    'Cricket3',
    'Cricket2',
    'Books'
  ];
  
  function getStyles(name, activities, theme) {
    return {
      fontWeight:
      activities.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
export default function MultipleSelect() {
    const classes = useStyles();
    const theme = useTheme();
    const [activities, setActivity] = React.useState([]);
  
    const handleChange = (event) => {
      setActivity(event.target.value);
    };
  
return (
<div>
<FormControl className={classes.formControl}>
<InputLabel color="secondary" id="multiple-chip-label">Select your interests</InputLabel>
<Select
  labelId="multiple-chip-label"
  color="secondary"
  fullWidth
  id="multiple-chip"
  multiple
  value={activities}
  onChange={handleChange}
  input={<Input id="select-multiple-chip" />}
  renderValue={(selected) => (
    <div className={classes.chips}>
      {selected.map((value) => (
        <Chip key={value} label={value} className={classes.chip} />
      ))}
    </div>
  )}
  MenuProps={MenuProps}
>
  {activitiesList.map((name) => (
    <MenuItem key={name} value={name} style={getStyles(name, activities, theme)}>
      {name}
    </MenuItem>
  ))}
</Select>
</FormControl>
</div>
);
}