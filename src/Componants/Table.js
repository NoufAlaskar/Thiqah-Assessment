import DataTable from "react-data-table-component";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs"
import { useState } from "react";
import { data } from "./Data";
import './Table.css'
import Redis from '../Redis.png'

function Table(){

const  [subscriptions, setSubscriptions] = useState(data)
  const columns = [
    {
      name: 'Image',
      cell: (row) => <img src={row.image} alt={row.name} style={{ width: '50px' }} />,
    },
    {
      name:'Name',
      selector: row => row.name,
      sortable: true,
      cell: (row) =>
          row.isEditing ? (
            <input
              type="text"
              name="name"
              value={row.name}
              onChange={(event) => handleSelectChange(event, row.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSaveRow(row.id);
                }
              }}
            />
          ) : (
            row.name
          )
      },
    {
      name:'Response',
      selector: row => row.response,
      sortable: true,
      cell: (row) => (
        <div><button className="con-button">View Connection</button></div>
        )
      },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: (row) => <span className={`Status ${row.status === 'New' ? 'status-new' : row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
    {row.status}</span>
     
    },
    {
      name: 'SaaS Service',
      selector: row => row.saasService,
      sortable: true,
      cell: (row) =>
          row.isEditing ? (
            <select className="dropdown-select"
              name="saasService"
              value={row.saasService}
              onChange={(event) => handleSelectChange(event, row.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSaveRow(row.id);
                }
              }}
            >
              <option value="Redis Cluster">Redis Cluster</option>
              <option value="Redis Sentinal">Redis Sentinal</option>
              <option value="Postgres">Postgres</option>
            </select>
          ) : (
            row.saasService
          )
      },
    {
      name:'Enviromnt',
      selector: row => row.env,
      sortable: true,
      cell: (row) =>
          row.isEditing ? (
            <select className="dropdown-select"
              name="env"
              value={row.env}
              onChange={(event) => handleSelectChange(event, row.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSaveRow(row.id);
                }
              }}
            >
              <option value="Development">Development</option>
              <option value="Test">Test</option>
              <option value="Preprod">Pre-Prod</option>
              <option value="prod">Production</option>
            </select>
          ) : (
            row.env  
          )     
      },
      {
        name:'Actions',
        cell: (row) => (
          <div >
            <button onClick={() => handleDelete(row.id)} className="icon-btn">
                <BsFillTrashFill className="trash-icon" /></button>
            <button onClick={() => handleEditRow(row.id)} className="icon-btn"> 
                <BsFillPencilFill /></button>
          </div>
          ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true 
        }
    ]; 


    const addNewRow = () => {
      const newRow = { 
        id: subscriptions.length + 1,
        image: `${Redis}`,
        name: 'New Subscription',
        response: 'show connection',
        status: 'New',
        saasService: 'SaaS Service ',
        env: 'Development'
      } 
      setSubscriptions([...subscriptions, newRow]);
    }

    
   const handleDelete = (id) => {
    const updatedSubscriptions = subscriptions.filter((item) => item.id !== id);
    setSubscriptions(updatedSubscriptions);
  };

   const handleEditRow = (rowId) => {
    const updatedSubscriptions = subscriptions.map((row) => {
      if (row.id === rowId) {
        return { ...row, isEditing: true };
      }
      return row;
    });
    setSubscriptions(updatedSubscriptions);
  };

   const handleSelectChange = (event, rowId) => {
    const { name, value } = event.target;
    const updatedSubscriptions = subscriptions.map((row) => {
      if (row.id === rowId) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setSubscriptions(updatedSubscriptions);
  };

   const handleSaveRow = (rowId) => {
    const updatedSubscriptions = subscriptions.map((row) => {
      if (row.id === rowId) {
        return { ...row, isEditing: false };
      }
      return row;
    });
    setSubscriptions(updatedSubscriptions);
  };

  
  const handleFilterByStatus = (event) => {
    const status = event.target.value;
    const filteredData = subscriptions.filter((row) => row.status === status);
    setSubscriptions(filteredData);
  };

  const handleFilterBySaasService = (event) => {
    const saasService = event.target.value;
    const filteredData = subscriptions.filter((row) => row.saasService === saasService);
    setSubscriptions(filteredData);
  };

  const handleFilterByEnv = (event) => {
    const env = event.target.value;
    const filteredData = subscriptions.filter((row) => row.env === env);
    setSubscriptions(filteredData);
  };
 

    return(
      <div>
        <div>
          <div className="block-content">
             <h1>Saas Subscriptions</h1>
             <button className="button" onClick={addNewRow}>+ New Subscriptions</button>
         </div>
         </div>
         <div className="block">
          <div className="block-content">
            <h3>Filter By</h3>
           <select className="dropdown-select" value="" onChange={handleFilterByStatus}>
             <option value="">Status</option>
             <option value="Active">Active</option>
             <option value="Inactive">Inactive</option>
             <option value="Inactive">new</option>
          </select>

          <select  className="dropdown-select" value="" onChange={handleFilterBySaasService}>
             <option value="">SaaS Service</option>
             <option value="Redis Cluster">Redis Cluster</option>
             <option value="Redis Sentinal">Redis Sentinal</option>
             <option value="Postgres">Postgres</option>
          </select>

         <select  className="dropdown-select" value="" onChange={handleFilterByEnv}>
           <option value="">Enviromint</option>
           <option value="Development">Development</option>
           <option value="Test">Test</option>
           <option value="PreProd">PreProd</option>
           <option value="prod">Production</option>
        </select>
   </div>
   </div>
   
             <DataTable columns={columns} data= {subscriptions} pagination highlightOnHover> </DataTable>
        
        </div> 

    )
}

export default Table;
