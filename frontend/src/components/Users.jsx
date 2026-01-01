import React, { useEffect } from 'react'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import useModal from '../customHooks/useModal';
import { Form, useForm } from 'react-hook-form';
import useBackDrop from '../customHooks/useBackDrop';
import "../css/formStyle.css";
import { useState } from 'react';
import useFetch from '../customHooks/useFetch';
import MessageAlert from './messageComponents/MessageAlert'
import useLocalStorage from '../customHooks/useLocalStorage';
import useSnackBar from '../customHooks/useSnackBar';
import { useRef } from 'react';


const Analytics = () => {

   const  {RenderModal, showModalElement, hideModalElement} = useModal()
   const { fetchState, setFetchState, getData, postData, updateData, deleteData} = useFetch('users')
   const {getSecureStorage}  = useLocalStorage()
   const [tableData, setTableData] = useState()
   const { handleSubmit, reset,register ,formState} = useForm()
   const { errors } = formState;
   const formUserRef = useRef(null)
   const [fileState, setFileState] = useState(false)
   const {BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle} = useBackDrop()
   const [submitState, setSubmitState] = useState({ post : true, edit : false, delete : false })
   const {showAlert, hideAlert, RenderSnackBarSuccess, RenderSnackBarFailed} = useSnackBar()
   const [deleteId,setDeleteId] = useState(null)
   const [editId,setEditId] = useState(null)
   const [editState,setEditState] = useState(false)
   const [offset,setOffset] = useState(0)
   const [limit,setLimit] = useState(5)
   const [firstName,setFirstName] = useState('')


    const addUser = () => {
       setEditState(false)
       resetFormField()
       setSubmitState({post:true,edit:false,delete:false}) 
       showModalElement()
     
    }

    const editUser = (editData) => {
     
        showModalElement()
        setEditState(true)
        setEditId(editData.id)
        reset({
           first_name:editData.first_name,
           last_name : editData.last_name,
           phone : editData.phone,
           email : editData.email
          })
        setSubmitState({post:false,edit:true,delete:false})
      
    }

    const deleteUser = (data) => {
         showModalElement()
         setSubmitState({post:false,edit:false,delete:true}) 
         setDeleteId(data.id)
         setFetchState((prevState) => !prevState)
    }


    const resetFormField = () => {
      reset({
        first_name :'', 
        last_name : '',
        phone : '',
        email : '',
        image : null
        })
        setFileState(false)
        return
    }

    const handleClickSubmitForm = () => {
        formUserRef.current.requestSubmit()
    } 


    const submit = (data) => {

      
      const formData = new FormData()


          formData.append('first_name', data.first_name)
          formData.append('last_name', data.last_name)
          formData.append('email', data.email)
          formData.append('phone', data.phone)
          formData.append('image', data.image[0])
          formData.append('password', data.password)
      

      if(submitState.post === true && submitState.edit === false && submitState.delete === false) {

          showBackDrop()
      
          postData(`admin/register`,formData)
          .then((response) => { 
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            resetFormField()
            
          })
          .catch((err) => {
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
          })
          setFetchState(false)
          return
      }

      if(submitState.post === false && submitState.edit === true && submitState.delete === false) {
      
          showBackDrop()



          updateData(`update-profile/${editId}`,formData)
          .then((response) => { 
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            setEditId(null)
            setEditState(false)
            resetFormField()
            
          })
          .catch((err) => {
            setFetchState(true)
            hideModalElement()
            hideBackDrop()
            setEditId(null)
            setEditState(false)
      
          })
          setFetchState(false)
 
          return

 
        
      }

      showBackDrop()
    }

      const deleteRecordUser = () => {
          let id = deleteId
          deleteData(`delete-profile/${id}`)
          .then((response) => { 
             setFetchState()
             setDeleteId(null)
             hideBackDrop()
             hideModalElement()
             setSubmitState({post:true,edit:false,delete:false}) 
          })
          .catch((err) => {
            
            setDeleteId(null)
            hideBackDrop()
            hideModalElement()
            setSubmitState({post:true,edit:false,delete:false}) 
          })
    }   

    const renderImageFile = (e) => {
          let file = e.target.files[0]
          setFileState(file.name)
          let reader = new FileReader(file)
          reader.onload = function(e) {
              //  console.log(e.target.result)
          }

          reader.readAsDataURL(file)
  }


  const handleCancelSubmit = () => {
      hideModalElement()  
      reset()
      setFileState(false)
  }


  const handlePagination = (e) => {
      setLimit(e.target.value)
      setOffset(0)
  }




  useEffect(() => {

       getData(`users/${limit}/${offset}`)
       .then((response) => {
        setTableData(response.data)

        console.log(response)
       })
       .catch((err) => console.log(err))

  },[fetchState,limit,offset])



  return (
    <>
    <div className='tab-headers'>
               <h2>Users</h2>
               <button className='table-headers-action' onClick={addUser}>Add new</button>
             </div>
             <div className='table-contain'>
              <table className='table-container'>
                <thead> 
                <tr className='table-header'>
                    <th>id</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Middle name</th>
                    <th>Phone</th>
                    <th className='table-action'>Action</th>
                </tr>

                </thead>
                <tbody>
                  { tableData?.data.length === 0  || !tableData ? <tr className='table-no-content'><td colSpan={7} className='row-no-content'>No records found</td></tr> : null  }

                    {
                      tableData?.data.map((mapped) => {
                        return  tableData?.data?.length ? <tr key={mapped?.id}>
                          <td>{mapped?.id}</td>
                          <td>{mapped?.email}</td>
                          <td>{mapped?.first_name}</td>
                          <td>{mapped?.last_name}</td>
                          <td>{mapped?.middle_name}</td>
                          
                            <td>{mapped?.phone}</td>
                                <td className="table-action"> 
                        <button type="button"className="action-btn" onClick={() => editUser(mapped)} ><EditSquareIcon/></button>
                        <button type="button"className="action-btn" onClick={() => deleteUser(mapped)}><DeleteIcon/></button>
                    </td>
                </tr>
 
                :  null
                 
                      })
                    }
                
               
          
           
                </tbody>

             </table>

                {
                  !tableData? null : <div className='table-footer'>
                   <div className='pagination-container'>
                    <p>Row per page</p>
                    <select className="form-select" onChange={handlePagination}>
                           <option value="5" className="select-value">5</option>
                           <option value="10" className="select-value">10</option>
                           <option value="100" className="select-value">100</option>
                    </select>
                    <p>1 - {limit} of 100</p>
                   </div>
                </div>
                }
                
       
                <RenderModal element={ submitState.delete ? <MessageAlert method={{cancel:hideModalElement,confirm: deleteRecordUser}}/> :
                  <>

              <h2 className='form-title'>{submitState.post ? 'Add user' : 'Edit user'}</h2>
               
              <form className="form"  ref={formUserRef} onSubmit={handleSubmit(submit)}>

                  <div className="input-contain input-contain-margin-bottom">
                      <label htmlFor="profile" className='input-label'>Profile</label>
                     <label className="custum-file-upload" htmlFor="file">
                       <div className="icon"> 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                       </div>
                       <div className="text">
                      <span>{ fileState ? fileState : 'Click to upload image'}</span>
                      </div>
                      <input type="file" id="file"  {...register('image', {
                         onChange: (e) => renderImageFile(e),
                      })
                      }/>
                    </label>
                    
                </div>
         
                  <div className="input-flex-contain">
                      
                       <div className="input-contain">
                         <label htmlFor="first_name" className='input-label'>First Name</label>
                         <input type="text" className="input-text" placeholder="First name" {...register('first_name', {
                            required : {
                            value : editState ? false : true,
                            message : '*First name is required',
                            },
                          })}/>
                                 <p className="form-errors">{errors.first_name?.message}</p>
                      </div>

                      <div className="input-contain">
                        <label htmlFor="last_name" className='input-label'>Last Name</label>
                        <input type="text" className="input-text" placeholder="Last name" {...register('last_name', {
                           required : {
                           value : editState ? false : true,
                           message : '*Last name is required',
                           },
                         })}/>
                                <p className="form-errors">{errors.last_name?.message}</p>
                     </div>

                </div>

                  <div className="input-contain">
                  <label htmlFor="Phone" className='input-label'>Phone</label>
                   <input type="number" className="input-text" placeholder="Phone" {...register('phone', {
                      required : {
                      value : editState ? false : true
                     },
       
                     })}/>
                            <p className="form-errors">{errors.phone?.message}</p>
                </div>

                 <div className="input-contain">
                  <label htmlFor="email" className='input-label'>Email</label>
                   <input type="email" className="input-text" placeholder="Email" {...register('email', {
                      required : {
                      value : editState ? false : true,
                      message : '*Email is required',
                     },
                     pattern : '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
                     })}/>
                            <p className="form-errors">{errors.email?.message}</p>
                </div>
            
                 <div className="input-contain">
                  <label htmlFor="password" className='input-label'>Password</label>
                   <input type="password" className="input-text" placeholder="Password" {...register('password', {
                      required : {
                      value : editState ? false : true,
                      message : '*Password is required',
                     },
                     })}/>
                     
              <p className="form-errors">{errors.password?.message}</p>
                </div>


              
            
             
            </form>

             <div className='form-btn-contain'>
                  <button type="button" className="form-btn" style={btnStyle} disabled={backDropState} onClick={handleClickSubmitForm}>{ backDropState ? <BackDropModal/> : 'Submit'}</button>
                  <button type="button" className="form-btn" onClick={() => handleCancelSubmit()}>Cancel</button>
               </div>

                    </>
                   } />
  
             </div>
    </>
  )
}

export default Analytics