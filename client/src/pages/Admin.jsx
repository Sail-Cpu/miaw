import UserNav, {AdminExtend} from "../components/navigations/UserNav";
import {Link, Outlet} from "react-router-dom";
import allIcons from "../utils/allIcons.js";
import React from "react";
import PropTypes from "prop-types";



const Admin = () => {

    const create = [
        {
            link: "create/software",
            name: "Software"
        },
    ]

    const update = [
        {
            link: "create/software",
            name: "software"
        },
        {
            link: "create/software",
            name: "Software"
        },
    ]

    const tabs = [
        {
            name: "Create",
            icon: allIcons.app,
            extend: <AdminExtend tabs={create}/>
        },
        {
            name: "Update",
            icon: allIcons.keyboard,
            extend: <AdminExtend tabs={create}/>

        },
    ]

    return(
        <div className="admin-page-container">
            <UserNav tabs={tabs} list={create}/>
            <div className="admin-page">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;