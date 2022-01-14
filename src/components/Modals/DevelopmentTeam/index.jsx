import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, Modal, List, ListItem, Grid, Collapse, Typography, Divider, IconButton, OutlinedInput } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import ImageUploading from 'react-images-uploading';
import uuid from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: "100%",
    maxWidth: "846px",
    boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    border: "1px solid #ffffff",
};

const avatar = {
    background: "#EFF2F5",
    borderRadius: "36.5px",
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
    "&.valid": {
        border: "2px solid #58667E"
    }
}

const wrapItem = {
    maxHeight: "380px",
    overflow: "auto",
}

function renderItem({ item, index, validator, handleImgTeamUpload, handleInputTeamChange, handleInputTeamBlur, handleRemoveMember, view }) {

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
            borderRadius: "50%",
            objectFit: "contain",
        }
    })

    const onChangeImageUpload = (imageList) => {
        handleImgTeamUpload(index, imageList);
    };

    const handleInputChange = (e) => {
        if (!e.target) return;
        const { name, value } = e.target;
        handleInputTeamChange(index, name, value);
    };

    const handleInputBlur = (e) => {
        if (!e.target) return;
        const { name } = e.target;
        handleInputTeamBlur(index, name);
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
                                    <IconButton sx={avatar} aria-label="upload picture" component="span">
                                        <img src="/assets/icons/user-cirlce-add.png" alt="user-cirlce-add" />
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
                    <Box className="form-control mb-16">
                        <label>Tên thành viên</label>
                        <OutlinedInput
                            disabled={view}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Tên thành viên"
                            value={item.name}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            error={validator[`${item.id}-name`]}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4.5}>
                    <Box className="form-control mb-16">
                        <label>Chức danh</label>
                        <OutlinedInput
                            disabled={view}
                            id="position"
                            name="position"
                            type="text"
                            placeholder="Chức danh"
                            value={item.position}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            error={validator[`${item.id}-position`]}
                        />
                    </Box>
                </Grid>
                <Grid sx={{ position: "relative" }} item xs={1.5}>
                    <Box hidden={view} sx={deleteButton} onClick={() => handleRemoveMember(item.id)}>
                        <img src="/assets/icons/close-circle.svg" alt="close-circle" />
                    </Box>
                </Grid>
            </Grid>
        </ListItem>
    );
}

const DevelopmentTeam = ({ defaultValues, setFormValuesProject, view }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const [developmentTeam, setDevelopmentTeam] = useState(defaultValues?.developmentTeam);
    const [validator, setValidator] = useState({});
    const [validatorTeam, setValidatorTeam] = useState(false);

    console.log('developmentTeam==>', developmentTeam);

    const handleAddMember = () => {
        const nextItem = {
            id: uuid(),
            image: [],
            name: "",
            postion: "",
        }
        if (nextItem) {
            let arrNewTeam = developmentTeam;
            arrNewTeam.push(nextItem);
            setDevelopmentTeamForm(arrNewTeam);
        }
    };

    const handleImgTeamUpload = (index, data) => {
        let arrNewTeam = developmentTeam;
        arrNewTeam[index].image = data;
        setDevelopmentTeamForm(arrNewTeam);
    };

    const handleInputTeamChange = (index, name, data) => {
        let arrNewTeam = developmentTeam;
        arrNewTeam[index][name] = data;
        setDevelopmentTeamForm(arrNewTeam);
    };

    const handleInputTeamBlur = (index, name) => {
        const memberItem = developmentTeam[index][name];
        setValidator({
            ...validator,
            [`${developmentTeam[index].id}-${name}`]: !memberItem ? true : false,
        })
    };

    const handleRemoveMember = (id) => {
        let arrNewTeam = developmentTeam;
        arrNewTeam = arrNewTeam.filter((item) => item.id !== id);
        setDevelopmentTeamForm(arrNewTeam);
        if (!arrNewTeam.length) setValidatorTeam(false);
    };

    const setDevelopmentTeamForm = (arrData) => {
        setDevelopmentTeam(arrData);
        setFormValuesProject('developmentTeam', arrData);
        if (!developmentTeam.length) setValidatorTeam(false);
        const validatorDevTeam = developmentTeam.filter((member) => {
            return member.image.length && member.name && member.position;
        });
        if (validatorDevTeam.length) setValidatorTeam(true);
        else setValidatorTeam(false);
    };

    const addMemberButton = (
        <Box
            sx={addMember}
            variant="contained"
            onClick={handleAddMember}
        >
            <img src="/assets/icons/add-circle.svg" alt="add-circle" />
            Thêm  thành viên
        </Box>
    );

    return (
        <div>
            <Box sx={chose} onClick={handleOpen} className={validatorTeam ? 'valid': ''}>Đội ngũ phát triển</Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={label}>Đội ngũ phát triển</Typography>
                    <Divider />
                    <List sx={wrapItem}>
                        <TransitionGroup>
                            {developmentTeam?.map((item, index) => (
                                <Collapse key={index}>
                                    {renderItem({ item, index, validator, handleImgTeamUpload, handleInputTeamChange, handleInputTeamBlur, handleRemoveMember, view })}
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                    <Box hidden={view} sx={{ padding: "10px 26px" }}>
                        {addMemberButton}
                    </Box>
                    <Box sx={{ padding: "12px 24px", textAlign: "right", background: "#F6F8FA", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}>
                        <Button sx={{ maxWidth: "118px" }} className="button" onClick={handleClose}>Xong</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default DevelopmentTeam;