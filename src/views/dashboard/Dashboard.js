import React, { useState, useEffect } from 'react';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,

} from '@coreui/react'
import {
  CChartBar,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
} from '@coreui/icons'
import BaseURL from 'src/assets/contants/BaseURL';
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [newUsersTodayCount, setNewUsersTodayCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [inactiveUsersCount, setInactiveUsersCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
  
    fetch(BaseURL + 'Userauth/userdetail/')
      .then(response => response.json())
      .then(data => {
        setTableData(data);
  
        const newUsersToday = data.filter(item => item.date_joined?.split('T')[0] === today).length;
        const activeUsers = data.filter(item => item.userActive === true).length;
        const inactiveUsers = data.filter(item => item.userActive === false).length;
        const totalUsers = data.length;

        setNewUsersTodayCount(newUsersToday);
        setActiveUsersCount(activeUsers);
        setInactiveUsersCount(inactiveUsers);
        setTotalUsersCount(totalUsers);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  return (
    <>
      <WidgetsDropdown />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Data {' & '} Logs</CCardHeader>
            <CCardBody>


              <CRow>
              <CCol xs={12} md={12} xl={12}>
                <CRow>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New User</div>
                        <div className="fs-5 fw-semibold">{newUsersTodayCount}</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Total Users</div>
                        <div className="fs-5 fw-semibold">{totalUsersCount}</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Active Users</div>
                        <div className="fs-5 fw-semibold">{activeUsersCount}</div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Inactive Users</div>
                        <div className="fs-5 fw-semibold">{inactiveUsersCount}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} md={6} xl={6}>
            <CCard className="mb-4">
             
              <CCardBody>
                <CChartBar
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
                    datasets: [
                      {
                        label: 'Run Time',
                        backgroundColor: '#f87979',
                        data: [50, 30, 22, 49, 20, 30, 19, 50, 40],
                      },
                      {
                        label: 'Error Time',
                        backgroundColor: '#ff0000',
                        data: [40, 20, 12, 29, 10, 40, 39, 40, 35],
                      },
                      {
                        label: 'Efficiency',
                        backgroundColor: '#00ff00',
                        data: [10, 20, 10, 10, 10, 10, 29, 10, 20],
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCardBody>
            </CCard>
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.value1} />
                        <CProgress thin color="warning" value={item.value2} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}

                  
                </CCol>
              </CRow>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                    <CTableHeaderCell>Designation</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Device ID</CTableHeaderCell>
                    <CTableHeaderCell>Mobile No</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={cilUser} title={item.country?.name || ''} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.usermod?.username}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.userActive ? 'Active' : 'Inactive'}</span> | Registered: {item.usermod?.first_name} {item.usermod?.last_name}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span>{item.usermod?.email}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span>{item.designation}</span>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span>{item.device_id}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.mobile_no}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
