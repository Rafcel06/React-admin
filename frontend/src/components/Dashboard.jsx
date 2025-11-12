import React from 'react'
import useModal from '../customHooks/useModal'
import "../css/component.css";


const Dashboard = () => {


  const { RenderModal,  showModalElement, hideModalElement } = useModal()



  return (
     <>
       <h2>Dashboard</h2>
         <div className='table-contain'>
          <table className='table-container'>
            <tr className='table-header'>
                <th>Title 1</th>
                <th>Title 2</th>
                <th>Title 3</th>
                <th>Title 4</th>
                <th>Title 5</th>
            </tr>

            <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
            </tr>

                        <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
            </tr>

                        <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
            </tr>

                        <tr>
                <td>content 1</td>
                <td>content 2</td>
                <td>content 3</td>
                <td>content 4</td>
                <td>content 5</td>
            </tr>

         </table>
         </div>
    </>
  )
}

export default Dashboard