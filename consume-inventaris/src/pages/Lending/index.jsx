    import React, { useEffect, useState } from "react";
    import Case from "../../components/Case";
    import axios from "axios";
    import Table from "../../components/Table";
    import { useNavigate } from "react-router-dom";

    export default function Lending() {
        const [lending, setLending] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            axios.get("http://localhost:8000/lendings", {
                headers: {  
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                }
            })
            .then(res => {
                setLending(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    navigate('../user/login?message=' + encodeURIComponent('anda belum login !!'));
                }
            })
        }, []);

        const headers = [
            "#",
            "stuff_id",
            "date_time",
            "name",
            "total_stuff"
        ];
        
        const endpointModal = {
            "createLending": "http://localhost:5173/lendings/create",
        };

        const title = "Lending";

        const columnIdentitasDelete = 'name'; // Adjust according to your data

        const buttons = [
            "createLending",
        ];

        const tdColumn = {
            "stuff_id": null,
            "date_time": null,
            "name": null,
            "total_stuff": null,
        };

        const UrlImage = "http://localhost:8000/upload-images"

        return (
            <Case>
                <Table headers={headers} data={lending} endpoint={endpointModal} titleModal={title}
                    identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}>
                </Table>
            </Case>
        );
    }
