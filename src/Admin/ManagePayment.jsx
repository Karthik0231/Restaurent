import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function ManagePayment() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>$100</TableCell>
            <TableCell>2022-01-01</TableCell>
            {/* Add more table data cells with actual payment details */}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
