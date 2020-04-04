import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class FormMahasiswa extends Component {
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('mahasiswa');
        this.state = {
          nim: '',
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
    
        const { nim, nama } = this.state;
    
        this.ref.add({
          nim,
          nama
        }).then((docRef) => {
          this.setState({
            nim: '',
            nama: ''
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
  render() {
    const { nim, nama } = this.state;
    return (
      <div>
        <Row>
            <Col xs="12" md="12">
                <Card>
                    <CardHeader>
                    <strong>Input</strong> Siswa
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" className="form-horizontal" >
                            <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="hf-nis">NIM</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="hf-nis" name="nim" value={nim} placeholder="Masukkan Nim..." autoComplete="nis"
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
                        <Link to={'/mahasiswa'}>
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

export default FormMahasiswa;
