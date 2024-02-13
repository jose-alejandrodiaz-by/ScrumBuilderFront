'use client'

import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React from "react";
import {useGetAllProjects} from "../../hooks/projects";


const cols:ColumnsType<AnyObject> = [
    {title: 'id', dataIndex: 'id',render: (text:string, record:{[key:string]:string})=>{
			return <Link href={`/${record.id.toString()}/` }>{text}</Link>},}, 
    {title: 'Project name', dataIndex:'project_name'}, 
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
  return (
    <>
      <h1>Projects</h1>
      {loading? <h1>Loading...</h1> :
        isError? <h1>{errorMessage}</h1> :
        <Table columns={cols} dataSource={projects} />
      } 
    </>
        

  );
};

export default Page;
