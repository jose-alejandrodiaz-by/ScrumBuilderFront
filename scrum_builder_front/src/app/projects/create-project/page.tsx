'use client'

import React from "react";
import { PageHeader } from "../../../components/PageHeader";
import { AuthProvider } from "../../../context/AuthContext";

import ProjectForm from "../../../components/ProjectForm"
import NavBar from "../../../components/NavBar";

export default function Page(){
    return (
    <AuthProvider>
        <div className="flex-row">
        <NavBar />
        <PageHeader title={"Create Project"} goBack={true} actionButton={false} hasCrumbs={false}/> 
        <div className="">
        <ProjectForm/>
        </div>
        </div>
    </AuthProvider>
    )
}