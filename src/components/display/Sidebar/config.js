import {ReactComponent as AppCubeIcon} from 'icon/3dcube.svg'
import {ReactComponent as Judgeicon} from 'icon/judge.svg'
import {ReactComponent as MouseSquareIcon} from 'icon/mouse-square.svg'
import {ReactComponent as RuleIcon} from 'icon/rule.svg'
import {ReactComponent as UserCircleIcon} from 'icon/user-cirlce-add.svg'
import {ReactComponent as UserOctagonIcon} from 'icon/user-octagon.svg'
import {ReactComponent as ThemeIcon} from 'icon/theme.svg'
import {ReactComponent as FilterListIcon} from 'icon/user-filter-list.svg'


export const projectNav = [
    {
        label: 'Dự án đợi duyệt',
        href: '/',
        icon: AppCubeIcon
    },
    {
        label: 'Quản lý dự án',
        href: '/projects',
        icon: MouseSquareIcon
    },
    {
        label: 'Con dấu NFT',
        href: '/nfts',
        icon: Judgeicon
    },
    {
        label: 'Người dùng',
        href: '/users',
        icon: UserOctagonIcon
    }
]

export const ruleNav = [
    {
        label : 'Nhóm quyền',
        href: '/rules',
        icon: RuleIcon
    },
    {
        label: 'Nhân viên',
        href: '/staff',
        icon: UserCircleIcon
    }
]

export const themeNav = [
    {
        label : 'Giao diện',
        href: '/themes',
        icon: ThemeIcon
    },
    {
        label: 'Danh sách dự án',
        href: '/list-projects',
        icon: FilterListIcon
    }
]