import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

export default function IndexInbound() {
    const [inbound, setInbound] = useState([]);
    // const [stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/inbound", {
            headers: {  
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        })
        .then(res => {
            setInbound(res.data.data);
            // setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
            }
        })
    }, []);

    const headers = [
        "#",
        "date",
        "stuff_id",
        "total",
        "proff_file"
    ];
    
    const endpointModal = {
        "createInbound": "http://localhost:5173/inbound/create",
        "inbound_delete":"http://localhost:8000/inbound/delete/{id}",
        "InboundDetail":"http://localhost:8000/inbound/{id}",
    };

  
    const title = "Inbound";

    const columnIdentitasDelete = 'stuff_id'; // Adjust according to your data

    const buttons = [
        "createInbound",
        "inbound_delete",
        "InboundDetail",
        "trash_inbound"
    ];

    const tdColumn = {
        "date": null,
        "stuff_id": null,
        "total": null,
        "proff_file": null
    };

    const UrlImage = "http://localhost:8000/upload-images"

    return (
        <Case>
            <Table headers={headers} data={inbound} endpoint={endpointModal}  titleModal={title}
                identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}>
            </Table>
            
        </Case>
        
    );
}
