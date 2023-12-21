import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import AnalystIcon from './analystIcon';

export function ActiveAnalyst() {
    return (
        <>
            <Navbar.Collapse className="justify-content-end align-middle mb-auto p-1">
                <Navbar.Text className="p-1"> Active Analyst: </Navbar.Text>
                <AnalystIcon />
            </Navbar.Collapse>
        </>
    );
}
export default ActiveAnalyst;
