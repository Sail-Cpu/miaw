import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {useContext, useMemo, useState} from "react";
import {Keys} from "./Shortcut.jsx";
import {currentUserSelector} from "../redux/auth/selector.js";
import {favAction} from "../redux/auth/action.js";
import {ThemeContext} from "../context/ThemeContext.jsx";

function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'desc',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'shortcuts',
        numeric: false,
        disablePadding: false,
        label: 'Shortcuts',
    },
    {
        id: 'shortcuts(mac)',
        numeric: false,
        disablePadding: false,
        label: 'Shortcuts (mac)',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];

function EnhancedTableHead() {

    const {theme, colors} = useContext(ThemeContext)

    return (
        <TableHead style={{backgroundColor: colors[theme].secondary}}>
            <TableRow>
                {headCells.map((headCell, idx) => (
                    <TableCell
                        key={headCell.id}
                        align={idx === headCells.length-1 ? "right" : "left"}
                        style={{color: colors[theme].text}}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const {theme, colors} = useContext(ThemeContext)

    const { user_id, shortcuts: userShortcuts } = useSelector(currentUserSelector);

    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(props.data).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, props.data],
    );

    const favorite = async (shortcutId, add) => {
        await dispatch(favAction({userId: user_id, shortcutId, add}));
    }

    const alreadyAdded = (shortcut) => {
        let res = false;
        userShortcuts.map(row => {
            if(row.shortcut_id === shortcut.shortcut_id){
                res = true;
            }
        })
        return res;
    }

    return (
        <Box sx={{ width: '100%', marginTop: "20px", boxShadow: "0px 0px 15px 4px rgba(0, 0, 0, 0.2)" }}>
            <Paper sx={{ width: '850px', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        style={{backgroundColor: colors[theme].secondary}}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        key={row.shortcut_id}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                            style={{color: colors[theme].text}}
                                        >
                                            {row.shortcut_name}
                                        </TableCell>
                                        <TableCell  align="left" style={{color: colors[theme].text}}>{row.shortcut_desc}</TableCell>
                                        <TableCell align="left" style={{color: colors[theme].text}}>
                                            <div className="all-keys-container">
                                                {Keys(row.shortcut_keys)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{color: colors[theme].text}}>
                                            <div className="all-keys-container">
                                                {Keys(row.shortcut_mac_keys)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {alreadyAdded(row) ?
                                                <span
                                                    style={{color: colors[theme].error, cursor: "pointer"}}
                                                    onClick={() => favorite(row.shortcut_id, "false")}>
                                                    Delete
                                                </span>
                                            :
                                                <span
                                                    style={{color: colors[theme].primary, cursor: "pointer"}}
                                                    onClick={() => favorite(row.shortcut_id, "true")}>
                                                    Favorite
                                                </span>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{backgroundColor: colors[theme].secondary, color: colors[theme].text}}
                />
            </Paper>
        </Box>
    );
}

EnhancedTable.propTypes = {
    data: PropTypes.array.isRequired
}