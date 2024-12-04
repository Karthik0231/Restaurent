import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function ViewDish() {
  const dishes = [
    // Dish data
  ];

  return (
    <div>
      <Table>
        <TableHead>
          {/* Table headers */}
        </TableHead>
        <TableBody>
          {dishes.map((dish, index) => (
            <TableRow key={index}>
              {/* Table cells with dish data */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}