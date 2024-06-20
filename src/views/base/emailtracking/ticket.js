import React, { Component } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CButton,
  CFormInput,
  CInputGroup,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BaseURL from 'src/assets/contants/BaseURL';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      ticketData: [],
      searchQuery: '',
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const responseFields = await axios.get(BaseURL + "emailtracking/parameter/", axiosConfig);
      this.setState({ fields: responseFields.data });
      const responseTickets = await axios.get(BaseURL + "emailtracking/ticket/", axiosConfig);
      this.setState({ ticketData: responseTickets.data.reverse() });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  getFilteredData = () => {
    const { ticketData, searchQuery } = this.state;
    return ticketData.filter(ticket =>
      ticket.ticketname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.time.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  handleDownloadPDF = () => {
    const { fields } = this.state;
    const filteredData = this.getFilteredData();
    const doc = new jsPDF();

    const tableColumn = ["Sl.No", "Date-Time", "Ticket Name", ...fields.map(field => field.field)];
    const tableRows = [];

    filteredData.forEach((ticket, index) => {
      const ticketData = [
        index + 1,
        `${ticket.date} ${ticket.time}`,
        ticket.ticketname,
        ...fields.map(field => ticket.required_json[field.field] || '')
      ];
      tableRows.push(ticketData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("tickets.pdf");
  };

  handleDownloadCSV = () => {
    const { fields } = this.state;
    const filteredData = this.getFilteredData();
    const headers = ["Sl.No", "Date-Time", "Ticket Name", ...fields.map(field => field.field)];

    const csvRows = [];
    csvRows.push(headers.join(','));

    filteredData.forEach((ticket, index) => {
      const ticketData = [
        index + 1,
        `${ticket.date} ${ticket.time}`,
        ticket.ticketname,
        ...fields.map(field => ticket.required_json[field.field] || '')
      ];
      csvRows.push(ticketData.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tickets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const { fields, searchQuery } = this.state;
    const filteredData = this.getFilteredData();

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>TICKETS</strong>
              </CCardHeader>
              <CCardBody>
                <CCol md={4}>
                  <CInputGroup className="flex-nowrap mt-3 mb-4">
                    <CFormInput
                      placeholder="Search by Ticket Name"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      value={searchQuery}
                      onChange={this.handleSearchChange}
                    />
                    <CButton type="button" color="secondary" id="button-addon2">
                      Search
                    </CButton>
                  </CInputGroup>
                </CCol>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CTable striped hover>
                    <CTableHead color='dark'>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Sl.No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-Time</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ticket Name</CTableHeaderCell>
                        {fields.map(field => (
                          <CTableHeaderCell scope="col" key={field.field}>
                            {field.field}
                          </CTableHeaderCell>
                        ))}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {filteredData.length === 0 ? (
                        <CTableRow>
                          <CTableHeaderCell colSpan={fields.length + 3} className="text-center">
                            No data available
                          </CTableHeaderCell>
                        </CTableRow>
                      ) : (
                        filteredData.map((ticket, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{ticket.date}  {ticket.time}</CTableDataCell>
                            <CTableDataCell>{ticket.ticketname}</CTableDataCell>
                            {fields.map((field, i) => (
                              <CTableDataCell key={i}>{ticket.required_json[field.field]}</CTableDataCell>
                            ))}
                          </CTableRow>
                        ))
                      )}
                    </CTableBody>
                  </CTable>
                </div>
                <CRow className="justify-content-center mt-4">
                  <CCol xs={12}>
                    <div className='d-flex justify-content-center gap-2'>
                      <CButton color="primary" type="button" onClick={this.handleDownloadPDF}>
                        Download as PDF
                      </CButton>
                      <CButton color="primary" type="button" onClick={this.handleDownloadCSV}>
                        Download as CSV
                      </CButton>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default Ticket;