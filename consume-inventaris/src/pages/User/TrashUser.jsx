import React,{ useEffect,useState} from "react";
import Case from "../../components/Case";
import axios from "axios";
import Table from "../../components/Table";

export default function TrashUser(){
    const   [UserTrash,setUserTrash]= useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/user/trash",{
            headers:{
                "Authorization": "Bearer" + localStorage.getItem("access_token"),
            }
        })
        .then(res => {
            setUserTrash(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                Navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
            }
        })
    },[])

    const headers = [
        "#",
        "name",
        "category",
    ]
    
    const endpointModal = {
        "restore": "http://localhost:8000/User/restore/{id}",
        "delete_permanent": "http://localhost:8000/User/permanent/{id}",

    }
    const inputData ={
        "name":{
            "tag":"input",
            "type":"text",
            "option":null
        },
        "category":{
            "tag":"select",
            "type":"select",
            "option":["KLN","HTL","Teknisi/Sarpras"]
        }
    }

    const title = "User"

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes"
    ]

    const tdColumn = {
        "name":null,
        "category":null
    }
    return (
        <Case>
            <Table headers={headers} data={UserTrash} endpoint={endpointModal} inputData={inputData} titleModal={title}
            identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
        
        )
    
}