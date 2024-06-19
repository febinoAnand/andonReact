import React from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import BaseURL from 'src/assets/contants/BaseURL';

class SendReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            token: localStorage.getItem('token') || '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { token } = this.state;
        axios.get(BaseURL + "pushnotification/sendreport/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({ rowData: response.data.reverse() });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleDelete = (id) => {
        const { token } = this.state;
        axios.delete(`${BaseURL}pushnotification/sendreport/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                this.fetchData();
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    }

  
 render(){ 
  const { rowData } = this.state;
  return (
    <>
     <CRow>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>SEND REPORT</strong>
          </CCardHeader>
          <CCardBody>
            
            
            
              <CTable striped hover>
                <CTableHead>
                  <CTableRow color="dark">
                    <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User Group</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Delivery Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rowData.length > 0 ? (
                    rowData.map((row, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{row.date}</CTableDataCell>
                        <CTableDataCell>{row.time}</CTableDataCell>
                        <CTableDataCell>{row.title}</CTableDataCell>
                        <CTableDataCell>{row.message}</CTableDataCell>
                        <CTableDataCell>{row.send_to_user}</CTableDataCell>
                        <CTableDataCell>{row.users_group}</CTableDataCell>
                        <CTableDataCell>{row.delivery_status}</CTableDataCell>
                        <CTableDataCell>
                          <CButton onClick={() => this.handleDelete(row.id)}><CIcon icon={cilTrash} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
                   ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="9" className="text-center">
                        No data available
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  </CTableBody>
              </CTable>
            
          </CCardBody>
        </CCard>
      </CCol>
      
      </CRow>

     </>
  )
            }
}

export default SendReport