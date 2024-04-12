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
import {appSelector, appShortcutsSelector} from "../redux/app/selector.js";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {getApp} from "../redux/app/action.js";
import {Keys} from "./Shortcut.jsx";
import {currentUserSelector} from "../redux/auth/selector.js";
import {addToFav} from "../redux/auth/action.js";

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

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, idx) => (
                    <TableCell
                        key={headCell.id}
                        align={idx === headCells.length-1 ? "right" : "left"}
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

    const { app_id } = useSelector(appSelector);
    const { shortcuts } = useSelector(appShortcutsSelector(props.step));
    const { user_id, shortcuts: userShortcuts } = useSelector(currentUserSelector);

    const {appId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(app_id !== appId){
            const fetchData = async () => {
                await dispatch(getApp(appId));
            }
            fetchData();
        }
    }, [dispatch, appId])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shortcuts.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(shortcuts).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, shortcuts],
    );

    const favorite = async (shortcutId) => {
        await dispatch(addToFav({userId: user_id, shortcutId}));
    }

    return (
        <Box sx={{ width: '100%', marginTop: "20px" }}>
            <Paper sx={{ width: '850px', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"

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
                                        >
                                            {row.shortcut_name}
                                        </TableCell>
                                        <TableCell  align="left">{row.shortcut_desc}</TableCell>
                                        <TableCell align="left">
                                            <div className="all-keys-container">
                                                {Keys(row.shortcut_keys)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="all-keys-container">
                                                {Keys(row.shortcut_mac_keys)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <span
                                                style={{color: "#2563EB", cursor: "pointer"}}
                                                onClick={() => favorite(row.shortcut_id)}>
                                                Favorite
                                            </span>
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
                    count={shortcuts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

EnhancedTable.propTypes = {
    step: PropTypes.number
}