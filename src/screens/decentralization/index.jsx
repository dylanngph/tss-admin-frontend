import React from 'react'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import PageTitle from 'components/PageTitle/PageTitle'
import TableSection from './components/Table/TableSection';
import CreateDecentralizationModal from '../../components/Modals/DecentralizationModal/Create'
import EditDecentralizationScreen from './Edit/Edit'

const decentralizationItem = {
    id: 1,
    name: 'Root Admin',
    quantity: 1,
    phone: '(907) 555-0101',
}


function Decentralization(props) {
    const match = useRouteMatch();
    //@ true to edit
    const [edit, setEdit] = React.useState(false);
    const [editData, setEditData] = React.useState(decentralizationItem);

    return (
        <Box>
            { !edit &&
                <>
                    <PageTitle text={'Nhóm quyền'} />
                    <Box sx={{ position: "absolute", top: "11px", zIndex: "1100", right: "80px", }}>
                        <CreateDecentralizationModal />
                    </Box>
                    <Col>
                        <TableSection />
                    </Col>
                </>
            }
            { edit &&
                <>
                    <PageTitle text={decentralizationItem.name} />
                    <EditDecentralizationScreen item={editData}/>
                </>

            }

        </Box>
    );
}
const Col = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    margin-left: 24px;
    margin-right: 24px;
`

export default Decentralization;