import UserNav, {AdminExtend} from "../../components/navigations/UserNav.jsx";
import {Link, Outlet, useNavigate} from "react-router-dom";
import allIcons from "../../utils/allIcons.js";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../redux/auth/selector.js";
import {Toaster} from "sonner";

const create = [
    {
        link: "create/software",
        name: "Software"
    },
]

const update = [
    {
        link: "update/software",
        name: "Software"
    },
]


const Admin = () => {

    const {role} = useSelector(currentUserSelector)
    const navigate = useNavigate();
    useEffect(() => {
        role !== "admin" && navigate("/")
    }, [])

    const tabs = [
        {
            name: "Create",
            icon: allIcons.app,
            extend: <AdminExtend list={create} />
        },
        {
            name: "Update",
            icon: allIcons.keyboard,
            extend: <AdminExtend list={update} />
        },
    ]

    return(
        <div className="admin-page-container">
            <Toaster position="top-right" richColors closeButton />
            <UserNav tabs={tabs} />
            <div className="admin-page">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;