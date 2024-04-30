import React, { useState, useEffect }  from 'react'
import BaseURL from 'src/assets/contants/BaseURL';
import { cilMediaSkipForward, cilFilter, cilMagnifyingGlass } from '@coreui/icons';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    // CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
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


const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [filteredgroups, setFilteredgroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow ,setSelectedRow] = useState([]);
  
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = () => {
    axios.get(BaseURL + 'EmailTracking/groupemailtracking')
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

  const handleRowClick = (group) =>{
    setSelectedRow(group);
    console.log(group);
  };


const handleMultipleSelect = (event) => {
  const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
  if (selectedOptions.length > 0) {
    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    let markUntilNext = false;
    for (let i = 0; i < lastSelectedOption.length; i++) {
      if (markUntilNext) {
        lastSelectedOption[i].selected = true;
      }
      if (lastSelectedOption[i].value === lastSelectedOption) {
        markUntilNext = true;
      }
    }
  }

  setSelectedRow(selectedOptions);
  console.log(selectedOptions);
};

  
  const groupsToDisplay = filteredgroups.length > 0 ? filteredgroups : groups || [];

    return (
      <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>USER LIST</strong>
            </CCardHeader>
            <CCardBody>
            <CRow className="mb-3">
                <CFormLabel htmlFor="GroupName" className="col-sm-2 col-form-label">Group Name</CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="text" id="GroupName" name="GroupName" value={selectedRow.user_group} readOnly/>
                </CCol>
            </CRow>
            <CRow className="mb-3">
                <CFormLabel htmlFor="userlist" className="col-sm-2 col-form-label">User List</CFormLabel>
                <CCol sm={10}>
                  <CFormSelect aria-label="Default select example" id="userlist" multiple value={[selectedRow.user_group]}  onChange={handleMultipleSelect}>
                  {groupsToDisplay.map((group, index) => (
                      <option key={index+1} value={selectedRow.user_group}>{group.user_list}</option>
                  ))}
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
            <CCol md={12}>
            <CInputGroup className="flex-nowrap mt-3 col-sg-3">
                <CInputGroupText id="addon-wrapping"><CIcon icon={cilMagnifyingGlass}/></CInputGroupText>
                <CFormInput
                  placeholder="Search by Subject or Message"
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <CButton type="button" color="secondary" onClick={handleSearch} id="button-addon2">
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
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Users</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Count</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {groupsToDisplay.map((group, index) => (
                      <CTableRow key={index} onClick={ () =>handleRowClick(group)}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{group.user_group}</CTableDataCell>
                        <CTableDataCell>{group.user_list}</CTableDataCell>
                        <CTableDataCell>{group.user_list_count}</CTableDataCell>
                        <CTableDataCell>
                          <CButton><CIcon icon={cilMediaSkipForward} /></CButton>
                        </CTableDataCell>
                      </CTableRow>
                  ))}
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
}

export default Groups