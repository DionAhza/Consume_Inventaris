import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";  // Pastikan untuk mengimpor useNavigate

export default function TrashInbound() {
    const [inboundTrash, setInboundTrash] = useState([]);
    const navigate = useNavigate();  // Inisialisasi useNavigate

    useEffect(() => {
        axios.get("http://localhost:8000/inbound/trash", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),  // Perhatikan spasi setelah "Bearer"
            }
        })
        .then(res => {
            console.log("Response data:", res.data); // Log response data untuk debugging
            if (res.data && res.data.data) {
                setInboundTrash(res.data.data);
            } else {
                console.error("Response data format is incorrect");
            }
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('anda belum login !!'));
            }
        });
    }, [navigate]);

    const headers = [
        "#",
        "date",
        "stuff_id",
        "total",
        "proff_file"
    ];

    const endpointModal = {
        "restore_inbound": "http://localhost:8000/inbound/restore/{id}",
        "permanentDeleinbound": "http://localhost:8000/inbound/permanent/{id}",
    };


    const title = "Inbound";

    const columnIdentitasDelete = 'name';

    const buttons = [
        "restore_inbound",
        "permanentDeletes_inbound"
    ];

    const tdColumn = {
        "date": null,
        "stuff_id": null,
        "total":null,
        "proff_file":null
    };

    return (
        <Case>
            <Table headers={headers} data={inboundTrash || []} endpoint={endpointModal} titleModal={title}
            identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    );
}
