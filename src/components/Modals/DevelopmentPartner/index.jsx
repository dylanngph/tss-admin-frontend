import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, List, ListItem, Grid, Collapse, Typography, Divider, IconButton, FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ImageUploading from 'react-images-uploading';
import uuid from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: "100%",
    maxWidth: "846px",
    boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    border: "1px solid #ffffff",
};

const imgPartner = {
    background: "#EFF2F5",
    borderRadius: "8px",
    width: "73px",
    height: "73px",
    padding: 0,
}

const label = {
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#11142D",
    padding: "24px",
}

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
}

const chose = {
    color: "#A6B0C3",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "19px",
    padding: "16px",
    background: "#EFF2F5",
    borderRadius: "8px",
}

const wrapItem = {
    maxHeight: "380px",
    overflow: "auto",
}

function renderItem({ item, index, handleImgPartnerUpload, handleInputPartnerChange, handleRemovePartner, view }) {
    
    const gridStyle = {
        width: "100%",
        margin: 0,
        borderBottom: "1px solid #EFF2F5",
    }

    const deleteButton = {
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "pointer",
    }

    const BoxImageUpload = styled('div')({
        position: "relative",
        paddingTop: "8px",
        "& .image-item": {
            position: "absolute",
            top: "8px",
            left: 0,
            width: "73px",
            height: "73px",
        },
        "& .image-item img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
        }
    })

    const onChangeImageUpload = (imageList) => {
        handleImgPartnerUpload(index, imageList);
    };

    const handleInputChange = (e) => {
        if (!e.target) return;
        const { name, value } = e.target;
        handleInputPartnerChange(index, name, value);
    };

    return (
        <ListItem>
            <Grid sx={gridStyle} container spacing={2}>
                <Grid item xs={1.5}>
                    <ImageUploading
                        value={item.image}
                        onChange={onChangeImageUpload}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            dragProps
                        }) => (
                            <BoxImageUpload>
                                <div
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <IconButton sx={imgPartner} aria-label="upload picture" component="span">
                                        <img src="/assets/icons/people.svg" alt="people" />
                                    </IconButton>
                                </div>
                                {
                                    typeof imageList === 'string' 
                                    ?
                                    <div key={index} className="image-item" onClick={() => onImageUpdate(index)}>
                                            <img src={imageList} alt="" width="100" />
                                    </div>
                                    :
                                    imageList?.map((image, index) => (
                                        <div key={index} className="image-item" onClick={() => onImageUpdate(index)}>
                                            <img src={image['data_url']} alt="" width="100" />
                                        </div>
                                    ))
                                }
                            </BoxImageUpload>
                        )}
                    </ImageUploading>
                </Grid>
                <Grid item xs={4.5}>
                    <FormControl className="form-control mb-16">
                        <FormLabel>Tên đối tác</FormLabel>
                        <OutlinedInput
                            disabled={view}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Tên đối tác"
                            value={item.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4.5}>
                    <FormControl className="form-control mb-16">
                        <FormLabel>Website</FormLabel>
                        <OutlinedInput
                            disabled={view}
                            id="website"
                            name="website"
                            type="text"
                            placeholder="http://"
                            value={item.website}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid sx={{position: "relative"}} item xs={1.5}>
                    <Box hidden={view} sx={deleteButton} onClick={() => handleRemovePartner(item.id)}>
                        <img src="/assets/icons/close-circle.svg" alt="close-circle" />
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
    );
}

const DevelopmentPartner = ({ defaultValues, setFormValuesProject, view }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const [partner, setPartner] = useState(defaultValues?.developmentPartner);

    const handleAddPartner = () => {
        const nextItem = {
            id: uuid(),
            image: [],
            name: "",
            website: "",
        }
        if (nextItem) {
            let arrNewPartner = partner;
            arrNewPartner.push(nextItem);
            setPartnerForm(arrNewPartner);
        }
    };

    const handleRemovePartner = (id) => {
        let arrNewPartner = partner;
        arrNewPartner = arrNewPartner.filter((item) => item.id !== id);
        setPartnerForm(arrNewPartner);
    };

    const handleImgPartnerUpload = (index, data) => {
        let arrNewPartner = partner;
        arrNewPartner[index].image = data;
        setPartnerForm(arrNewPartner);
    };

    const handleInputPartnerChange = (index, name, data) => {
        let arrNewPartner = partner;
        arrNewPartner[index][name] = data;
        setPartnerForm(arrNewPartner);
    };

    const setPartnerForm = (arrData) => {
        setPartner(arrData);
        setFormValuesProject('developmentPartner', arrData);
    };

    const addPartnerButton = (
        <Box
            sx={addMember}
            variant="contained"
            onClick={handleAddPartner}
        >
            <img src="/assets/icons/add-circle.svg" alt="add-circle" />
            Thêm  đối tác
        </Box>
    );

    return (
        <div>
            <Box sx={chose} onClick={handleOpen}>Đối tác phát triển</Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={label}>Đối tác phát triển</Typography>
                    <Divider />
                    <List sx={wrapItem}>
                        <TransitionGroup>
                            {partner?.map((item, index) => (
                                <Collapse key={index}>
                                    {renderItem({ item, index, handleImgPartnerUpload, handleInputPartnerChange, handleRemovePartner, view })}
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                    <Box hidden={view} sx={{padding: "10px 26px"}}>
                        {addPartnerButton}
                    </Box>
                    <Box sx={{padding: "12px 24px", textAlign: "right", background: "#F6F8FA", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px"}}>
                        <Button sx={{maxWidth: "118px"}} className="button" onClick={handleClose}>Xong</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default DevelopmentPartner;