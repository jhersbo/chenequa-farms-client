import { Tooltip } from "@mui/material"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const adminIconSXProps = {
    fontSize: "28px"
}

interface AdminBtnProps{
    setSiteState: React.Dispatch<React.SetStateAction<string>>
}

const AdminBtn = ({ setSiteState }: AdminBtnProps)=>{
    return (
        <Tooltip title="Switch to admin" placement="bottom" arrow>
            <button 
                id="admin-btn"
                aria-label="admin mode"
                onClick={()=>{setSiteState("admin")}}
            >
                <AdminPanelSettingsIcon sx={adminIconSXProps}/>
                &nbsp; Admin Mode
            </button>
        </Tooltip>
    )
}

export default AdminBtn