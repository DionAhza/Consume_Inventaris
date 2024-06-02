import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import Table from "../../components/Table";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getStuffs();
    }, []);

    function getStuffs() {
        axios.get("http://localhost:8000/stuff", {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('anda belum login!!'));
            }
        });
    }

    const headers = [
        "#",
        "name",
        "category",
        "Total available",
        "total defec"  // Make sure this matches your data fields
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/update/{id}",
        "store": "http://localhost:8000/stuff/store",
    }
    const columnIdentitasDelete = 'name';

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

    const title = 'Stuff'

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "name":null,
        "category":null,
        "stuff_stock":"total_available",
        "stuff_stock*":"total_defec"
    }
    return (
        <Case>
            <Table headers={headers} data={stuffs} endpoint={endpointModal} inputData={inputData}
            identitasColumn={columnIdentitasDelete} titleModal={title} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    );
}
