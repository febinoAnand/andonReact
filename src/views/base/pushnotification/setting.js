import React from 'react';
import axios from 'axios';

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormLabel,
    CFormInput,
    CRow,
} from '@coreui/react';
import BaseURL from 'src/assets/contants/BaseURL';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application_id: '',
            id: '',
            application_name: '',
            token: localStorage.getItem('token') || '',
        };
    }

    componentDidMount() {
        this.fetchSetting();
    }

    fetchSetting = () => {
        const { token } = this.state;
        axios.get(BaseURL + "pushnotification/setting/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    const { id, application_id, application_name } = response.data[0];
                    this.setState({ id, application_id, application_name });
                } else {
                    console.error('Empty response data');
                }
            })
            .catch(error => {
                console.error('Error fetching application ID:', error);
            });
    }

    handleInputChange = (e) => {
        this.setState({ application_id: e.target.value });
    }

    handleUpdateClick = () => {
        const { id, application_id, application_name, token } = this.state;
        const data = {
            application_name: application_name,
            application_id: application_id
        };

        axios.put(BaseURL + "pushnotification/setting/" + id + "/", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Update successful');
            })
            .catch(error => {
                console.error('Error updating application ID:', error);
            });
    }

    render() {
        const { application_id } = this.state;

        return (
            <>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>SETTING</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="mb-3">
                                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Application ID</CFormLabel>
                                    <CCol md={6}>
                                        <CFormInput type="text" id="name" name="name" value={application_id} onChange={this.handleInputChange} />
                                    </CCol>
                                </CRow>
                                <CRow className="justify-content-center">
                                    <CCol xs={1}>
                                        <div className='d-grid gap-2'>
                                            <CButton color="primary" type="button" onClick={this.handleUpdateClick}>Update</CButton>
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

export default Setting;