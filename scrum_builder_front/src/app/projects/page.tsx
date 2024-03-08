'use client'

import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import {useGetAllProjects} from "../../hooks/projects";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from '../../components/NavBar'
import { PageHeader } from "../../components/PageHeader";


const cols:ColumnsType<AnyObject> = [
    {title: 'Project name', dataIndex:'project_name', 
      sorter: (a, b) => a.project_name.length - b.project_name.length,
      filterSearch: true, onFilter: (value:string, record:{[key:string]:string})=>record.name.indexOf(value) === 0,
      render: (text:string, record:{[key:string]:string})=>{
			  return <Link href={`projects/${record.id.toString()}/` }>{text}</Link>}
    }, 
    {title: 'Project Type', dataIndex:'project_type_id', render:(record:{[key:string]:string})=>{
      return record.project_type_id==='1' ? <td>New Implementation</td> : record.project_type_id === '2' ? <td>Upgrade</td> : <td>J2C</td>
    }}, 
    {title: 'Platform', dataIndex:'platform_id', render:(record:{[key:string]:any})=>{
      return record.platform_id === 1 ? <td>PC</td> : <td>AZ</td>
    }}, 
    {title:'Created by', dataIndex:'created_by'}, 
    {title: 'Created on', dataIndex:'created_on'},
    {title:'Updated By', dataIndex:'updated_by'}, 
    {title: 'Updated on', dataIndex:'updated_on'},
    {title:'Completed', dataIndex: 'completed', render:(record:{[key:string]:string})=>{
      return record.completed ? <td>Yes</td> : <td>No</td>
    }},
    ]



function Page(){
  const {projects, error: {isError, errorMessage}, loading} = useGetAllProjects();
  const [page, setPage] = useState(1);
  console.log(isError);
  console.log(loading)
  return (
    <AuthProvider>
      <NavBar isLoggedIn={undefined}/>
      <div className="px-2">
      <PageHeader title={"Projects"} goBack={true} 
        actionButton={true} hasCrumbs={false}
        toActionButton="projects/create-project/" textActionButton="Create New Project"/>
       {loading? <h1 font-semibold>Loading...</h1> :
        isError? <h1 font-semibold>{errorMessage}</h1> :
        <Table columns={cols} dataSource={projects}
          pagination={{
            current: page,
            pageSize: 10, 
            onChange: (page: React.SetStateAction<number>)=>{
              setPage(page);
            }
          }}
          scroll={{ y: 400 }}
        />
      } 
      </div>
    </AuthProvider>
  );
};

export default Page;
