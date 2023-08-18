import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

 

function createData(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  return { name, email, subject, message};
}

const rows = [
  createData("Fernando", "fernando@gmail.com", "Factaory manager", "Home"),
  createData("Dineth", "dineth@gmail.com", "HR", "Visting"),
  createData("Nimal", "nimal@gmail.com", "spply", "Mobile"),
];

export default function BasicTable() {
  return (
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
<TableHead>
<TableRow>
<TableCell>Dessert (100g serving)</TableCell>
<TableCell align="right">Calories</TableCell>
<TableCell align="right">Fat&nbsp;(g)</TableCell>
<TableCell align="right">Carbs&nbsp;(g)</TableCell>
<TableCell align="right">Protein&nbsp;(g)</TableCell>
</TableRow>
</TableHead>
<TableBody>
          {rows.map((row) => (
<TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
<TableCell component="th" scope="row">
                {row.name}
</TableCell>
<TableCell align="right">{row.name}</TableCell>
<TableCell align="right">{row.email}</TableCell>
<TableCell align="right">{row.subject}</TableCell>
<TableCell align="right">{row.message}</TableCell>
</TableRow>
          ))}
</TableBody>
</Table>
</TableContainer>
  );
}