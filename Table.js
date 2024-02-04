import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import AndroidIcon from '@mui/icons-material/Android';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const Results = ({ character }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getSpeciesIcon = (species) => {
    if (typeof species === 'string') {
      const lowerCaseSpecies = species.toLowerCase();

      if (lowerCaseSpecies === 'droid') {
        return <AndroidIcon />;
      } else if (lowerCaseSpecies === 'human') {
        return <PersonIcon />;
      } else {
        return <HelpOutlineIcon />;
      }
    }

    // Handle other cases or return a default icon
    return <HelpOutlineIcon />;
  };

  const sortedData = () => {
    return character.slice().sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'Height', 'Mass', 'HairColor', 'SkinColor', 'eye_Color', 'birthyear', 'Gender', 'Species'].map((header) => (
              <TableCell key={header}>
                <TableSortLabel
                  active={orderBy === header.toLowerCase()}
                  direction={orderBy === header.toLowerCase() ? order : 'asc'}
                  onClick={() => handleRequestSort(header.toLowerCase())}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData().map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell>{row.mass}</TableCell>
              <TableCell>{row.hair_color}</TableCell>
              <TableCell>{row.skin_color}</TableCell>
              <TableCell>{row.eye_color}</TableCell>
              <TableCell>{row.birth_year}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>
                {getSpeciesIcon(row.species)}
                {row.species}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
