import React,{useState,useEffect} from "react";
import axios from 'axios';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import InboundDelete from "../pages/Inbound/InboundDelete";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Table({headers,data,endpoint,inputData,titleModal,identitasColumn,opsiButton, columnForTd}){
    const [isModalDeleteOpen,setIsModalDeleteOpen]= useState(false);
    const [endpointToSend,setEndpointToSend]=useState([]);
    const [isModalEditOpen,setIsModalEditOpen]=useState(false);
    const [isModalAddOpen,setIsModalAddOpen]=useState(false);
    const [dataDetail, setDataDetail]= useState({});
    const [isInboundDeleteOpen,setIsInboundDeleteOpen]= useState(false);

    useEffect(()=> {
        axios.get(endpoint['data_detail,InboundDetail'],{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setDataDetail(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('anda belum login'));
            }
        })
    },[]);
    function handleModalDelete(id){
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete =  endpointDelete.replace("{id}",id);
        const replaceUrlDetail = endpointDetail.replace("{id}",id);

        const endpointReplaced = {
            "data_detail":replaceUrlDetail,
          "delete": replaceUrlDelete, 
        }
        setEndpointToSend(endpointReplaced);
        setIsModalDeleteOpen(true)
    }
    function handleInboundDelete(id){
        const endpointDelete = endpoint['inbound_delete'];
        const endpointDetail = endpoint['InboundDetail'];
        const replaceUrlDelete =  endpointDelete.replace("{id}",id);
        const replaceUrlDetail = endpointDetail.replace("{id}",id);

        const endpointReplaced = {
            "InboundDetail":replaceUrlDetail,
          "inbound_delete": replaceUrlDelete, 
        }
        setEndpointToSend(endpointReplaced);
        setIsInboundDeleteOpen(true)
    }

    function handleModalEdit(id){
        const endpointUpdate =  endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}",id);
        const replaceUrlDetail = endpointDetail.replace("{id}",id);
        const endpointReplaced ={
            "data_detail" :replaceUrlDetail,
            "update": replaceUrlUpdate,
        } 
        setEndpointToSend(endpointReplaced);
        setIsModalEditOpen(true)    
    }

    function handleModalAdd(){   
        const endpointToSend ={
            "store":endpoint['store'],
        }
        setEndpointToSend(endpointToSend);
        setIsModalAddOpen(true)
    }

    function handleRestore(id){
        const endpointRestore = endpoint['restore'].replace("{id}",id);
        axios.put(endpointRestore,{
            headers:{
                "Authorization": "Bearer" + localStorage.getItem("access_token"),
            }
        })
        .then(res=>{
            window.location.reload();
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status==401){
                navigate('/login?message=') + encodeURIComponent('anda belum login!')
            }
        })
    }
    function handleRestoreInbound(id){
        const endpointRestore = endpoint['restore_inbound'].replace("{id}",id);
        axios.get(endpointRestore,{
            headers:{
                "Authorization": "Bearer" + localStorage.getItem("access_token"),
            }
        })
        .then(res=>{
            window.location.reload();
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status==401){
                navigate('/login?message=') + encodeURIComponent('anda belum login!')
            }
        })
    }

    function handlePermanentDelete(id){
        const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}",id);
        axios.delete(endpointPermanentDelete,{
            headers:{
                "Authorization": "Bearer" + localStorage.getItem("access_token")
            }
        })
        .then(res=>{
            window.location.reload();
        })   
        .catch(err=>{
            console.log(err)
            if(err.response.status==401){
                navigate('/login?message=') + encodeURIComponent('anda belum login !')
            }
        }) 
    }
    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
            <div className="flex justify-end">
                {
                    opsiButton.includes("create")?(
            <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm
             font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
              focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    ) :''
                }
                {
                    opsiButton.includes("trash") ? (
              <Link to={'/stuff/trash'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium
               text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none 
               focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800
                mb-5">Trash</Link>
                    ) : ''
}
                {
                    opsiButton.includes("trash_inbound") ? (
              <Link to={'/inbound/trash'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium
               text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none 
               focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800
                mb-5">Trash</Link>
                    ) : ''
}
{
      opsiButton.includes("createInbound") ? (
        <Link to={'/inbound/create'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium
         text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
         focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
          mb-5">Create</Link>
              ) : ''
}
                </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                    {headers.map((header,index) => (
                      <th scope="col" class="px-6 py-3" key={index}>{header}</th>
                    ))}

                    <th scope="col" class="px-6 py-3"></th>
                </tr>
                
            </thead>
           <tbody>
                {
                    Object.entries(data).map(([index,item])=>(
                        <>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index) + 1}.</td>
                            {
                            Object.entries(columnForTd).map(([key,value])=>(
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {!value ? item[key]: item[key.replace(/[!&*;:]/g,'')]? item[key.replace(/[!&*;:]/g,'')][value]:'0'}
                                </td>
                            ))
                            }   
                            {/*aksi */}
                            <td class="px-6 py-4 text-right">
                                {
                                    opsiButton.includes("edit") ?(
                                <button type="button" onClick={()=>handleModalEdit(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Edit</button>
                                    ) : ''
                                }
                                {
                                    opsiButton.includes("delete") ? (
                                <button  type="button" onClick={()=>handleModalDelete(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3">Delete</button>
                                    ):''
                                }
                                {
                                    opsiButton.includes('inbound_delete')?(
                                        <button  type="button" onClick={()=>handleInboundDelete(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3">Delete</button>
                                    ):''
                                }
                                {
                                    opsiButton.includes("restore")?(
                                        <button onClick={()=> handleRestore(item.id)} type="button" class="font-medium text-blue-600 dark:text-red-500 hover:underline mr-3">Restore </button>
                                    ):''
                                }
                                {
                                    opsiButton.includes("permanentDeletes")?(
                                        <button onClick={()=> handlePermanentDelete(item.id)} type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"> Permanent Delete</button>
                                    ):''
                                }
                                {
                                    opsiButton.includes("restore_inbound")?(
                                        <button onClick={()=> handleRestoreInbound(item.id)} type="button" class="font-medium text-blue-600 dark:text-red-500 hover:underline mr-3">Restore</button>
                                    ):''
                                }
                                {
                                    opsiButton.includes("permanentDeletes_inbound")?(
                                        <button onClick={()=> handlePermanentDelete_inbound(item.id)} type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"> Permanent Delete</button>
                                    ):''
                                }
                                
                            </td>
                        </tr>
                    
                    <ModalDelete isOpen={isModalDeleteOpen} dataDetail={dataDetail} onClose={()=> setIsModalDeleteOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal} identitasColumn={identitasColumn}></ModalDelete>
                    <ModalEdit isOpen={isModalEditOpen} onClose={()=> setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalEdit>
                    <ModalAdd isOpen={isModalAddOpen} onClose={()=> setIsModalAddOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalAdd>
                    <InboundDelete isOpen={isInboundDeleteOpen} onClose={()=> setIsInboundDeleteOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></InboundDelete>
                        </>

                    ))
                }
            </tbody>
            </table>
        </div>
    )
            }