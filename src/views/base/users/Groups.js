<<<<<<< HEAD
import React from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilTrash, cilFilter, cilMagnifyingGlass } from '@coreui/icons';
=======
import React, { useState, useEffect }  from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilFilter, cilMagnifyingGlass } from '@coreui/icons';
>>>>>>> current_merge_branch

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
<<<<<<< HEAD
    CForm,
    // CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
=======
    // CFormCheck,
    CFormInput,
>>>>>>> current_merge_branch
    CRow,
    CInputGroup,
    CInputGroupText,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';


<<<<<<< HEAD

class Groups extends React.Component{

  render(){
=======
const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredgroups, setFilteredgroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    axios.get(BaseURL + 'Userauth/setting/')
      .then(response => {
        console.log(response.data);
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };
  const handleSearch = () => {
    const filteredgroups = groups.filter(group =>
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredgroups(filteredgroups);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const groupsToDisplay = filteredgroups.length > 0 ? filteredgroups : groups || [];

>>>>>>> current_merge_branch
    return (
      <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>USER LIST</strong>
            </CCardHeader>
            <CCardBody>
<<<<<<< HEAD
            <CRow className="mb-3">
                <CFormLabel htmlFor="GroupName" className="col-sm-2 col-form-label">Group Name</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="GroupName" name="GroupName"/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="userlist" className="col-sm-2 col-form-label">User List</CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="userlist" multiple value={[]}>
                      {/*<option>Users 2</option>
                      <option>Users 3</option> */}
                    </CFormSelect> 
                </CCol> 
            </CRow>
            <CRow className="justify-content-center">
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton color="primary" type="submit">Add</CButton>
                  </div>
                </CCol>
                <CCol xs={1}>
                  <div className='d-grid gap-2'>
                    <CButton  color="primary" type="submit">Update</CButton>
                  </div>
                </CCol>
            </CRow>
            </CCardBody>
            <CCardBody>
=======
>>>>>>> current_merge_branch
            <CCol md={12}>
            <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass}/></CInputGroupText>
                <CFormInput
<<<<<<< HEAD
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
                <CButton type="button" color="secondary"  id="button-addon2">
=======
                  placeholder="Search by Subject or Message"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
>>>>>>> current_merge_branch
                  Search
                </CButton>
                <CButton color="primary">
                    <CIcon icon={cilFilter} />
                </CButton>
              </CInputGroup>
            </CCol>
            <CCol className='mb-3'>
            </CCol>
                <CTable striped hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Si.No</CTableHeaderCell>
<<<<<<< HEAD
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Users</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>Operators</CTableDataCell>
                        <CTableDataCell>ram,ravi,raja,...</CTableDataCell>
                        <CTableDataCell>5</CTableDataCell>
                        <CTableDataCell>
                          <CButton><CIcon icon={cilTrash} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
=======
                      <CTableHeaderCell scope="col">Expiry Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Resend Interval</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Valid Time</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Call Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Wrong Count</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {groupsToDisplay.map((group, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{group.all_user_expiry_time}</CTableDataCell>
                        <CTableDataCell>{group.OTP_resend_interval}</CTableDataCell>
                        <CTableDataCell>{group.OTP_valid_time}</CTableDataCell>
                        <CTableDataCell>{group.OTP_call_count}</CTableDataCell>
                        <CTableDataCell>{group.OTP_wrong_count}</CTableDataCell>
                      </CTableRow>
                  ))}
>>>>>>> current_merge_branch
                  </CTableBody>
                </CTable>
                <CRow className="justify-content-center">
                  <CCol md="auto">
                    <CButton color="primary">Download</CButton>
                  </CCol>
                </CRow>
              </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      </>
    )
<<<<<<< HEAD
  }
=======
>>>>>>> current_merge_branch
}

export default Groups