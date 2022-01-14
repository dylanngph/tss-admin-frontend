import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    Divider,
    FormControl,
    TextareaAutosize,
    OutlinedInput,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import uuid from "uuid";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    width: "100%",
    maxWidth: "1080px",
    boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    border: "1px solid #ffffff",
};

const label = {
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#11142D",
    padding: "24px",
};

const addMember = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#446DFF",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    cursor: "pointer",
};

const chose = {
    color: "#A6B0C3",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "19px",
    padding: "16px",
    background: "#EFF2F5",
    borderRadius: "8px",
};

function renderItem({ item, index, handleInputCateChange, handleRemoveCate, view }) {
    const numberStyle = {
        color: "#11142D",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
    };

    const deleteButton = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
    };

    const handleInputChange = (e) => {
        if (!e.target) return;
        const { name, value } = e.target;
        handleInputCateChange(index, name, value);
    };

    return (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <Typography sx={numberStyle}>{index + 1}</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
                <FormControl className="form-control">
                    <OutlinedInput
                        disabled={view}
                        id="allocationName"
                        name="allocationName"
                        type="text"
                        placeholder="Tên hạng mục"
                        value={item.allocationName}
                        onChange={handleInputChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl className="form-control">
                    <OutlinedInput
                        disabled={view}
                        id="rate"
                        name="rate"
                        type="text"
                        placeholder="100%"
                        inputProps={{ maxLength: 3 }}
                        value={item.rate}
                        onChange={handleInputChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl className="form-control">
                    <OutlinedInput
                        disabled={view}
                        id="price"
                        name="price"
                        type="text"
                        placeholder="$10.000"
                        value={item.price}
                        onChange={handleInputChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl className="form-control">
                    <OutlinedInput
                        disabled={view}
                        id="amount"
                        name="amount"
                        type="text"
                        placeholder="56.160.000"
                        value={item.amount}
                        onChange={handleInputChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl className="form-control">
                    <TextareaAutosize
                        disabled={view}
                        minRows={4}
                        maxRows={4}
                        placeholder="5% unlock at TGE, 90-days cliff, 6% monthly"
                        style={{ width: "auto" }}
                        value={item.vesting}
                        name="vesting"
                        onChange={handleInputChange}
                    />
                </FormControl>
            </TableCell>
            <TableCell sx={{ position: "relative" }} align="right">
                <Box hidden={view} sx={deleteButton} onClick={() => handleRemoveCate(item.id)}>
                    <img src="/assets/icons/close-circle.svg" alt="close-circle" />
                </Box>
            </TableCell>
        </TableRow>
    );
}

const TokenAllocationRate = ({ defaultValues, setFormValuesProject, view }) => {
    const [items, setItems] = useState(defaultValues?.tokenAllocations);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddCate = () => {
        const nextHiddenItem = {
            id: uuid(),
            allocationName: "",
            rate: null,
            price: null,
            amount: null,
            vesting: "",
        };
        if (nextHiddenItem) {
            setItems((items) => [...items, nextHiddenItem]);
        }
    };

    const handleRemoveCate = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const handleInputCateChange = (index, name, data) => {
        let newItem = items;
        newItem[index][name] = data;
        setTokenAllocations(newItem);
    };

    const setTokenAllocations = (arrData) => {
        setItems(arrData);
        setFormValuesProject("tokenAllocations", arrData);
    };

    const addCateButton = (
        <Box sx={addMember} variant="contained" onClick={handleAddCate}>
            <img src="/assets/icons/add-circle.svg" alt="add-circle" />
            Thêm hạng mục
        </Box>
    );

    const styleHead = {
        background: "#EFF2F5",

        th: {
            color: "#11142D",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px",
        },
    };

    const fontStyle = {
        color: "#11142D",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "22px",
    };

    return (
        <div>
            <Box sx={chose} onClick={handleOpen}>
                Phân bổ token
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography sx={label}>Phân bổ token</Typography>
                    <Divider />
                    <TableContainer
                        component={Paper}
                        sx={{ padding: "15px 35px", width: "auto", maxHeight: "70vh" }}>
                        <Table
                            sx={{ borderRadius: "10px", overflow: "hidden" }}
                            aria-label="simple table">
                            <TableHead sx={styleHead}>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Hạng mục</TableCell>
                                    <TableCell align="right">Tỉ lệ</TableCell>
                                    <TableCell align="right">Giá bán</TableCell>
                                    <TableCell align="right">Số lượng</TableCell>
                                    <TableCell>Vesting</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items?.map((item, index) =>
                                    renderItem({
                                        item,
                                        handleInputCateChange,
                                        handleRemoveCate,
                                        index,
                                        view
                                    })
                                )}
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography sx={fontStyle}>Tổng cộng</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={fontStyle}>100%</Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow sx={styleHead}>
                                    <TableCell component="th" scope="row" colSpan={3}>
                                        { view ? null : addCateButton }
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        sx={{
                            padding: "12px 24px",
                            textAlign: "right",
                            background: "#F6F8FA",
                            borderBottomLeftRadius: "12px",
                            borderBottomRightRadius: "12px",
                        }}>
                        <Button
                            sx={{ maxWidth: "118px" }}
                            className="button"
                            onClick={handleClose}>
                            Xong
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default TokenAllocationRate;
