import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class Kelas extends Component {
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('kelas')
        this.unsubscribe = null;
        this.state = {
            dataKelas: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const dataKelas = []
        querySnapshot.forEach((doc) => {
            const { namaKelas, angkatan } = doc.data()
            dataKelas.push({
                key: doc.id,
                namaKelas,
                angkatan
            })
        })
        this.setState({
            dataKelas
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
                                            <Label htmlFor="hf-namaKelas">Nama Kelas</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-namaKelas" name="namaKelas" placeholder="Masukkan Nama Kelas.." autoComplete="hf-namaKelas" onChange={this.onChangeSearch} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-angkatan">Angkatan</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-angkatan" name="angkatan" placeholder="Masukkan Angkatan.." autoComplete="hf-angkatan" onChange={this.onChangeSearch} />                                            
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
                                    <i className="fa fa-align-justify"></i> Data Kelas
                                    <div style={{float:'right'}}>
                                        <Link to={'/kelas/form'}><Button  color="success"><i className="fa fa-plus"></i> Add</Button></Link>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>NAMA KELAS</th>
                                            <th>ANGKATAN</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        
                                        {this.state.dataKelas.map(dataKelas => 
                                            <tr key={dataKelas.key}>
                                                <td>{dataKelas.namaKelas}</td>
                                                <td>{dataKelas.angkatan}</td>
                                                <td><Button color="danger" size="sm" onClick={() => this.deleteData(dataKelas.key)}><i className="fa fa-ban"></i></Button></td>
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


export default Kelas
