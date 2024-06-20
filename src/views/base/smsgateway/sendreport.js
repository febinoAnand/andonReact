import React from 'react';
import axios from 'axios';
import {
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
import BaseURL from 'src/assets/contants/BaseURL';

class SendReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            token: localStorage.getItem('token') || '',
        };
    }

    componentDidMount() {
        this.fetchReports();
    }

    fetchReports = () => {
        const { token } = this.state;
        axios.get(BaseURL + 'smsgateway/sendreport/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            this.setState({ reports: response.data.reverse() });
        })
        .catch(error => {
            console.error('Error fetching reports:', error);
        });
    }

    render() {
        const { reports } = this.state;

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
                                            <CTableHeaderCell scope="col">To Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">From Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Delivery Status</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {reports.length > 0 ? (
                                        reports.map((report, index) => (
                                            <CTableRow key={index}>
                                                <CTableDataCell>{index + 1}</CTableDataCell>
                                                <CTableDataCell>{report.date}</CTableDataCell>
                                                <CTableDataCell>{report.time}</CTableDataCell>
                                                <CTableDataCell>{report.to_number}</CTableDataCell>
                                                <CTableDataCell>{report.from_number}</CTableDataCell>
                                                <CTableDataCell>{report.message}</CTableDataCell>
                                                <CTableDataCell>
                                                    <span style={{ fontWeight: report.delivery_status ? 'bold' : 'bold', color: report.delivery_status ? 'green' : 'red' }}>
                                                        {report.delivery_status ? 'True' : 'False'}
                                                    </span>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                      <CTableRow>
                                        <CTableDataCell colSpan="7" className="text-center">
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
        );
    }
}

export default SendReport;