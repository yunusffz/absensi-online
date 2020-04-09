import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class Matkul extends Component {
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('matkul')
        this.unsubscribe = null;
        this.state = {
            dataMatkul: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const dataMatkul = []
        querySnapshot.forEach((doc) => {
            const { namaMatkul, sks } = doc.data()
            dataMatkul.push({
                key: doc.id,
                doc,
                namaMatkul,
                sks
            })
        })
        this.setState({
            dataMatkul
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
                                            <Label htmlFor="hf-namaMatkul">Nama Mata Kuliah</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-namaMatkul" name="namaMatkul" placeholder="Masukkan Nama Mata Kuliah.." autoComplete="hf-namaMatkul" onChange={this.onChangeSearch} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-sks">SKS</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-sks" name="sks" placeholder="Masukkan SKS.." autoComplete="hf-sks" onChange={this.onChangeSearch} />                                            
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
                                    <i className="fa fa-align-justify"></i> Data Mata Kuliah
                                    <div style={{float:'right'}}>
                                        <Link to={'/matkul/form'}><Button  color="success"><i className="fa fa-plus"></i> Add</Button></Link>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped>
                                        <thead>
                                        <tr>
                                            <th>NAMA MATA KULIAH</th>
                                            <th>SKS</th>
                                            <th>AKSI</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        
                                        {this.state.dataMatkul.map(dataMatkul => 
                                            <tr key={dataMatkul.key}>
                                                <td>{dataMatkul.namaMatkul}</td>
                                                <td>{dataMatkul.sks}</td>
                                                <td><Button color="danger" size="sm" onClick={() => this.deleteData(dataMatkul.key)}><i className="fa fa-ban"></i></Button></td>
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


export default Matkul
