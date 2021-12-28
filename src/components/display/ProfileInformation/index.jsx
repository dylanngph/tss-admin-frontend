import React from 'react';
import Information from '../../custom/Information';
import { Box, Typography, Tabs, Tab } from '@mui/material';

function ProfileInformation(props) {
    const { children, value, index, ...other } = props;
    const incorporation = {
        title: "Tổ chức",
        data: [
            {
                title: "Tên tổ chức",
                value: "JadeLabs",
            },
            {
                title: "Tên giao dịch",
                value: "138 Robinson Road #02-50 Singapore",
            },
            {
                title: "Trụ sở",
                value: "138 Robinson Road #02-50 Singapore",
            },
            {
                title: "Lĩnh vực kinh doanh",
                value: "Information Technology",
            },
            {
                title: "Mã số doanh nghiệp / số giấy phép thành lập",
                value: "jadelab-biz-reg.pdf",
            },
            {
                title: "Ngày cấp",
                value: "22/12/2022",
            },
            {
                title: "Tải lên giấy phép đăng ký kinh doanh",
                value: "TEXCODE123456",
            },
        ]
    }

    const project = {
        title: "Dự án",
        data: [
            {
                title: "Tên dự án",
                value: "JadeLabs",
            },
            {
                title: "Logo",
                value: "prj-logo.png",
            },
            {
                title: "Mô tả , giới thiệu dự án",
                value: "Jade Labs is a blockchain research & development company focused on creating the most...",
            },
            {
                title: "Whitepaper",
                value: "Jade-white-paper.pdf",
            },
            {
                title: "Đội ngũ phát triển",
                value: "Click to see more",
            },
            {
                title: "Đối tác phát triển",
                value: "Click to see more",
            },
            {
                title: "Facebook",
                value: "https://twitter.com/jadelabs",
            },
            {
                title: "Twitter",
                value: "https://twitter.com/jadelabs",
            },
            {
                title: "Telegram",
                value: "https://t.me/jadelabs",
            },
            {
                title: "Medium",
                value: "https://medium.com/jadelabs",
            },
        ]
    }

    const tokenomics = {
        title: "Tokenomics",
        data: [
            {
                title: "Tên gọi Token",
                value: "0",
            },
            {
                title: "Ký hiệu",
                value: "0",
            },
            {
                title: "Nền tảng",
                value: "0",
            },
            {
                title: "Tiêu chuẩn",
                value: "ERC20, 0",
            },
            {
                title: "Địa chỉ Smart Contract",
                value: "0xE1D7C7a4596B...647271C53208",
            },
            {
                title: "Token Type",
                value: "Token Type",
            },
            {
                title: "Tỉ lệ phân bổ",
                value: "Click to see more",
            },
        ]
    }

    const legalRepresentative = {
        title: "Đại diện pháp lý",
        data: [
            {
                title: "Họ và Tên",
                value: "Bessie Cooper",
            },
            {
                title: "Ngày sinh",
                value: "20/11/1990",
            },
            {
                title: "Chức danh",
                value: "CEO",
            },
            {
                title: "Giấy tờ tùy thân",
                value: "0678****",
            },
            {
                title: "Địa chỉ liên lạc",
                value: "138 Robinson Road #02-50 Singapore",
            },
            {
                title: "Điện thoại",
                value: "+84 219 249 244",
            },
            {
                title: "Email",
                value: "Bessie.cooper@jadelabs.com",
            },
        ]
    }

    return (
        <Box role="tabpanel" className="application"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Information tilte={incorporation.title} data={incorporation.data} />
            <Information tilte={project.title} data={project.data} />
            <Information tilte={tokenomics.title} data={tokenomics.data} />
            <Information tilte={legalRepresentative.title} data={legalRepresentative.data} />
        </Box>
    );
}

export default ProfileInformation;