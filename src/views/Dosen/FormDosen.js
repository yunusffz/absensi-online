import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class FormDosen extends Component {
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('dosen');
        this.state = {
          nip: '',
          nama: ''
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

    onSubmit = (e) => {
        e.preventDefault();
    
        const { nip, nama } = this.state;
    
        this.ref.add({
          nip,
          nama
        }).then((docRef) => {
          this.setState({
            nip: '',
            nama: ''
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
  render() {
    const { nip, nama } = this.state;
    return (
      <div>
        <Row>
            <Col xs="12" md="12">
                <Card>
                    <CardHeader>
                    <strong>Input</strong> Dosen
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" className="form-horizontal" >
                            <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-nis">NIP</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="hf-nis" name="nip" value={nip} placeholder="Masukkan Nip..." autoComplete="nis"
                                onChange={this.onChange} 
                                />
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Col md="3"> 
                                <Label htmlFor="hf-nama">Nama</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="hf-nama" name="nama" value={nama} placeholder="Masukkan Nama..." autoComplete="current-nama"
                                onChange={this.onChange}
                                />
                            </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button size="sm" color="success" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        &nbsp;
                        <Link to={'/dosen'}>
                            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Back</Button>
                        </Link>
                    </CardFooter>
                </Card>
          </Col>
        </Row>
        </div>

    );
  }
}

export default FormDosen;
