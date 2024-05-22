
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SearchBar = () => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
      >
        <TextField id="standard-basic" label="Search" variant="standard"/>
      </Box>
    </div>
  )
}

export default SearchBar