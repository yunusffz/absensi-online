import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class FormMatkul extends Component {

    constructor() {
        super()
        this.ref = firebase.firestore().collection("matkul")
        this.state = {
            namaMatkul: '',
            sks: ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { namaMatkul, sks } = this.state

        this.ref.add({
            namaMatkul,
            sks
        }).then((docRef) => {
            this.setState({
                namaMatkul: '',
                sks: ''
            })
            this.props.history.push("/matkul")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }

    render() {
        const { namaMatkul, sks } = this.state
        return (
            <div>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Input</strong> Mata Kuliah
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-namaMatkul">Nama Mata Kuliah</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-namaMatkul" name="namaMatkul" value={namaMatkul} placeholder="Masukkan Nama Mata Kuliah.." autoComplete="hf-namaMatkul" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-sks">SKS</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-sks" name="sks" value={sks} placeholder="Masukkan SKS.." autoComplete="hf-sks" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                &nbsp;
                                <Link to={'/matkul'}>
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

export default FormMatkul
