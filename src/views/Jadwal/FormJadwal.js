import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

export class FormJadwal extends Component {

    constructor() {
        super()
        this.ref = firebase.firestore().collection("jadwal")
        this.state = {
            hari: '',
            jam: ''
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { hari, jam } = this.state

        this.ref.add({
            hari,
            jam
        }).then((docRef) => {
            this.setState({
                hari: '',
                jam: ''
            })
            this.props.history.push("/jadwal")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
    }

    render() {
        const { hari, jam } = this.state
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
                                            <Label htmlFor="hf-hari">Hari</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-hari" name="hari" value={hari} placeholder="Masukkan Hari.." autoComplete="hf-hari" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="hf-jam">Jam Ke</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="hf-jam" name="jam" value={jam} placeholder="Masukkan Jam.." autoComplete="hf-jam" onChange={this.onChange} />                                            
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                &nbsp;
                                <Link to={'/jadwal'}>
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

export default FormJadwal
