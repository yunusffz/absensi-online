import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class Jadwal extends Component {
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('jadwal')
        this.unsubscribe = null;
        this.state = {
            dataJadwal: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const dataJadwal = []
        querySnapshot.forEach((doc) => {
            const { hari, jam } = doc.data()
            dataJadwal.push({
                key: doc.id,
                hari,
                jam
            })
        })
        this.setState({
            dataJadwal
        })
    }

    deleteData(id) {
        this.ref.doc(id).delete();
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Search</strong> Form
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-hari">Hari</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-hari" name="hari" placeholder="Masukkan Hari.." autoComplete="hf-hari" onChange={this.onChangeSearch} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-jam">Jam Ke</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-jam" name="jam" placeholder="Masukkan Jam.." autoComplete="hf-jam" onChange={this.onChangeSearch} />                                            
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.loadData}><i className="fa fa-dot-circle-o"></i> Cari</Button>
                                &nbsp;
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Data Jadwal
                                    <div style={{float:'right'}}>
                                        <Link to={'/jadwal/form'}><Button  color="success"><i className="fa fa-plus"></i> Add</Button></Link>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>HARI</th>
                                            <th>JAM KE</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        
                                        {this.state.dataJadwal.map(dataJadwal => 
                                            <tr key={dataJadwal.key}>
                                                <td>{dataJadwal.hari}</td>
                                                <td>{dataJadwal.jam}</td>
                                                <td><Button color="danger" size="sm" onClick={() => this.deleteData(dataJadwal.key)}><i className="fa fa-ban"></i></Button></td>
                                            </tr>
                                        )}

                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}


export default Jadwal
