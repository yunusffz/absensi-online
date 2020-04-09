import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class FormKelas extends Component {

    constructor() {
        super()
        this.ref = firebase.firestore().collection("kelas")
        this.state = {
            namaKelas: '',
            angkatan: ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { namaKelas, angkatan } = this.state

        this.ref.add({
            namaKelas,
            angkatan
        }).then((docRef) => {
            this.setState({
                namaKelas: '',
                angkatan: ''
            })
            this.props.history.push("/kelas")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }

    render() {
        const { namaKelas, angkatan } = this.state
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Input</strong> Kelas
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-namaKelas">Nama Kelas</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-namaKelas" name="namaKelas" value={namaKelas} placeholder="Masukkan Nama Kelas.." autoComplete="hf-namaKelas" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-angkatan">Angkatan</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-angkatan" name="angkatan" value={angkatan} placeholder="Masukkan angkatan.." autoComplete="hf-angkatan" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                &nbsp;
                                <Link to={'/kelas'}>
                                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Back</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FormKelas
