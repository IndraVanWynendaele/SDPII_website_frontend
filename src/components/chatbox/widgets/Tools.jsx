import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

//defination  of Tools widget
//all the mathod define in actionprovider and all states of widget are passed in props
//you can use all fuunction and state with the help of props
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Tools = (props) => {
  return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        >
        <Item> 
          <Button
          className="my-1"
          variant="outlined"
          color="error"
          onClick={props.actionProvider.ProductInfoHandle}
          >
          Products Information
          </Button>
        </Item>
        <Item> 
          <Button
            className="my-1"
            variant="outlined"
            color="error"
            onClick={props.actionProvider.AboutUsInfoHandle}
          >
          About us
          </Button>
        </Item>
      </Stack>
  );
};
export default Tools;