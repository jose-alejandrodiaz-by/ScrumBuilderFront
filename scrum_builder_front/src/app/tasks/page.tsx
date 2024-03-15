'use client'

import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
//import {useGetAllProjects} from "../../hooks/projects";
import {useGetAllTasks} from "../../hooks/tasks";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from '../../components/NavBar'
import { PageHeader } from "../../components/PageHeader";

const cols:ColumnsType<AnyObject> = [
    {title: 'Summary', dataIndex:'summary', 
    sorter: (a, b) => a.summary.length - b.summary.length,
    filterSearch: true, onFilter: (value:string, record:{[key:string]:string})=>record.name.indexOf(value) === 0},
    {title: 'Description', dataIndex:'description', 
      sorter: (a, b) => a.sumary.length - b.summary.length,
      filterSearch: true, onFilter: (value:string, record:{[key:string]:string})=>record.name.indexOf(value) === 0,
      render: (text:string, record:{[key:string]:string})=>{
			  return <Link href={`tasks/${record.id.toString()}/` }>{text}</Link>}
    }, 
    {title: 'Issue Type', dataIndex:'issue_type_id', render:(record:{[key:string]:string})=>{
      return record.issue_type_id==='3' ? <td>Task</td> : record.issue_type_id === '6' ? <td>Epic</td> : <td>Story</td>
    }}, 
    {title: 'Module', dataIndex:'module_id'}, 
    {title: 'Environment', dataIndex:'environment_id'}, 
    {title: 'Platform', dataIndex:'platform_id'}, 
    {title: 'Project Type', dataIndex:'project_type_id'},
    {title: 'Version', dataIndex:'version'}, 
    {title:'Created by', dataIndex:'created_by'}, 
    {title: 'Created on', dataIndex:'created_on'},
    {title:'Updated By', dataIndex:'updated_by'}, 
    {title: 'Updated on', dataIndex:'updated_on'},
    ]

function page(){
const{tasks, error:{isError, errorMessage},loading} = useGetAllTasks();
const [page, setPage] = useState(1);
const data = tasks;
data.map((val:{[key:string]:any})=>{
    val.created_on = val.created_on.split('T')[0];
    val.updated_on = val.updated_on ? val.updated_on.split('T')[0] : "";
  })

  return (
    <AuthProvider>
      <NavBar isLoggedIn={undefined}/>
      <div className="px-2">
      <h1>Tasks</h1>
       {loading? <h1 font-semibold>Loading...</h1> :
        isError? <h1 font-semibold>{errorMessage}</h1> :
        <Table columns={cols} dataSource={data}
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

export default page
