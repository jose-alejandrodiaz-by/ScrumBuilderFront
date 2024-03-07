'use client'

import React from "react";
import { PageHeader } from "../../../components/PageHeader";
import { AuthProvider } from "../../../context/AuthContext";
import NavBar from "../../../components/NavBar";

export default function Page(){
    return (
    <AuthProvider>
        <NavBar isLoggedIn={undefined} />
        <PageHeader title={"Create Project"} goBack={true} actionButton={false} hasCrumbs={false}/> 
    </AuthProvider>
    )
}