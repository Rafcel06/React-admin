import React from 'react'
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
const Analytics = () => {


  return (
    <>
    <div className='tab-headers'>
               <h2>Table</h2>
               <button className='table-headers-action'>Add new</button>
             </div>
             <div className='table-contain'>
              <table className='table-container'>
                <thead>
                <tr className='table-header'>
                    <th>Title 1</th>
                    <th>Title 2</th>
                    <th>Title 3</th>
                    <th>Title 4</th>
                    <th>Title 5</th>
                    <th className='table-action'>Action</th>
                </tr>
                </thead>
                <tbody>
    
                <tr>
                    <td>content 1</td>
                    <td>content 2</td>
                    <td>content 3</td>
                    <td>content 4</td>
                    <td>content 5</td>
                    <td className="table-action">
                        <button type="button"className="action-btn" ><EditSquareIcon/></button>
                        <button type="button"className="action-btn" ><DeleteIcon/></button>
                    </td>
                </tr>
    
           
                </tbody>
    
             </table>
             </div>
    </>
  )
}

export default Analytics