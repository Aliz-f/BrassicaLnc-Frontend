/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useParams } from 'react-router';
import Accordion from 'ui-component/Accordion';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const headCells = [
    {
        id: 'geneId',
        numeric: false,
        disablePadding: true,
        label: 'Gene ID'
    },
    {
        id: 'transcriptId',
        numeric: true,
        disablePadding: false,
        label: 'Transcript ID'
    },

    {
        id: 'stringTieId',
        numeric: true,
        disablePadding: false,
        label: 'StringTie ID'
    },
    {
        id: 'chr',
        numeric: true,
        disablePadding: false,
        label: 'Chr'
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Location'
    },
    // {
    //     id: 'locStart',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'locStart'
    // },
    // {
    //     id: 'locEnd',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'locEnd'
    // },
    {
        id: 'length',
        numeric: true,
        disablePadding: false,
        label: 'Length'
    },
    {
        id: 'classification',
        numeric: true,
        disablePadding: false,
        label: 'Classification'
    },
    {
        id: 'exonNumber',
        numeric: true,
        disablePadding: false,
        label: 'Exon Number'
    }
];
function Lnc(props) {
    const transcriptIdFromURL = useParams().transcriptID;
    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((column) => (
                                <TableCell align="center" key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.lncData && (
                            <TableRow key={props.lncData.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{props.lncData.geneId}</TableCell>
                                <TableCell align="center">{props.lncData.transcriptId}</TableCell>
                                <TableCell align="center">{props.lncData.stringTieId}</TableCell>
                                <TableCell align="center">{props.lncData.chr}</TableCell>
                                <TableCell align="center">{props.lncData.location}</TableCell>
                                {/* <TableCell align="center">{props.lncData.locStart}</TableCell>
                                <TableCell align="center">{props.lncData.locEnd}</TableCell> */}
                                <TableCell align="center">{props.lncData.length}</TableCell>
                                <TableCell align="center">{props.lncData.classification}</TableCell>
                                <TableCell align="center">{props.lncData.exonNumber}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Accordion
                accordionData={{
                    title: 'Sequence',
                    details: 'sequence',
                    defaultExpanded: false
                }}
            >
                <h4>{transcriptIdFromURL}</h4>
                <p style={{ overflowWrap: 'break-word' }}>{props.lncData ? props.lncData.sequence : 'loading...'} </p>
            </Accordion>
        </>
    );
}

export default Lnc;
