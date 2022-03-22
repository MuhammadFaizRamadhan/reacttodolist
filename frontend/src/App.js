import React from "react";
import './styles/App.css';
import { AiFillPlusCircle, AiFillEdit,AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";

export default class App extends React.Component {
constructor() {
  super()
    this.state = {
      list: [],
      jumlah_list: 0,
      isModalOpen: false,
      id_list: '',
      catatan: '',
      status: '',
      SelectedItem: '', 
      action: '',
      keyword :''
    }
}
//menambahkan data
handleAdd = () => {
  // console.log('tambah data')
  this.setState ({
      isModalOpen: true,
      catatan: '',
      status: this.state.status,
      action: 'insert'
  })
}
// menutup modal
handleClose = () => {
  this.setState({
      isModalOpen: false
  })
}
// change
handleChange = (e) => {
  this.setState({
      [e.target.name] : e.target.value
  })
}
//Menyimpan data
handleSave = (e) => {
  e.preventDefault()
  let data = {
      id_list: this.state.id_list,
      catatan: this.state.catatan,
      status: this.state.status
  }
  // sett url
  let url = ''
  if (this.state.action === "insert") {
      url = "http://localhost:5000/list/savelist"
  } else if(this.state.action ==="update") {
      url ="http://localhost:5000/list/update"
  }  
    
  //panggil api backend
  axios.post(url, data)
  .then(res => {
      console.log(res.data.message)
      this.getlist()
      this.handleClose()
  })
  .catch(err => {
      console.log(err.message)
  })
}
//mengupdate data
handleEdit = (selectedItem) => {
  // console.log('edit')
  // console.log(selectedItem)
  this.setState ({
      isModalOpen: true,
      id_list: selectedItem.id_list,
      catatan: selectedItem.catatan,
      status: selectedItem.status,
      action: 'update'
  })
}
//menghapus data
handleDelete = (id_list) => {
  // console.log("delete")
  let url="http://localhost:5000/list/" + id_list
  if (window.confirm("apakah anda yakin ?")) {
      axios.delete(url)
      .then(res => {
          console.log(res.message)
          this.getlist()
      })
      .catch(err => {
          console.log(err.message)
      })
  }
}
// untuk search
handleSearch = (e) => {
  let url = "http://localhost:5000/list"
  if (e.keyCode === 13) {
      let data ={
          keyword: this.state.keyword
      }
      axios.post(url, data)
      .then(res => {
          this.setState({
              list: res.data.list
          })
      })
      .catch(err => {
          console.log(err.message)
      })
  }
}
//update status
handlecheckbox = (selectedItem) => {
  this.setState({
    isModalStatusOpen: true,
    status: this.state.status.completed
  })
}
handleSaveCheckbox = (e) => {
  e.preventDefault()
  let data = {
      id_list: this.state.id_list,
      catatan: this.state.catatan,
      status: this.state.status.completed
  }
  // sett url
  let url = 'http://localhost:5000/list/update' 
    
  //panggil api backend
  axios.post(url, data)
  .then(res => {
      console.log(res.data.message)
      this.getlist()
      this.handleClose()
  })
  .catch(err => {
      console.log(err.message)
  })
}
  // this.setState ({
  //     isModalOpen: true,
  //     id_list: selectedItem.id_list,
  //     catatan: selectedItem.catatan,
  //     status: this.state.status.completed,
  //     checkbox: true,
  //     action: 'update'
  // })

// handlecheckbox = (selectedItem) => {
//   // console.log('edit')
//   // console.log(selectedItem)
//   let url ='http://localhost:5000/list/update'
//   let data ={
//     id_list: selectedItem.id_list,
//     catatan: selectedItem.catatan,
//     status: "completed",
//     checkbox: true
//   }
//   axios.post(url, data)
//   .then(res => {
//     console.log(res.data.message)
//     this.getlist()
//     })
//   .catch(err => {
//       console.log(err.message)
//   })
// }
// mendapatkan data
getlist = () => {
  let url = 'http://localhost:5000/list'
  axios.get(url)
  .then(res => {

      this.setState({
          jumlah_list : res.data.list,
          list : res.data.list,
      })
  })
}
getlistcomplete = () => {
  let url = 'http://localhost:5000/list/completed'
  
  axios.get(url)
  .then(res => {
      this.setState({
          jumlah_list : res.data.list,
          list : res.data.list
      })
  })
}
getlistuncomplete = () => {
  let url = 'http://localhost:5000/list/uncompleted'
  
  axios.get(url)
  .then(res => {
      this.setState({
          jumlah_list : res.data.list,
          list : res.data.list
      })
  })
}
componentDidMount = () => {
  this.getlist()
  this.getlistcomplete()
  this.getlistuncomplete()
}
  render() {
    return(
      <div className="bg">
      <div className="container">
        <div className="card">
                <div className="card-body ">
                  <h2 className="text-center mt-3 ">What To Do</h2>
                  <button className="btn ms-5 mt-2 mb-4 " onClick={() => this.getlist()}>All List</button>
                  <button className="btn ms-4 mt-2 mb-4 "  onClick={() => this.getlistcomplete()}>Completed</button>
                  <button className="btn ms-4 mt-2 mb-4 " onClick={() => this.getlistuncomplete()}>Uncompleted</button>
                  <input className="form-control" type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} onKeyUp={this.handleSearch} placeholder="Coba Cari Apa Aja"></input>
                  {this.state.list.map((item, index) => {
                      return(
                  <div key={index} className="card-body to-do-list mt-2">
                    <div className="row">
                      <div className="col-6">{item.catatan}</div>
                      <div className="col">
                        {/* <div className="form-check">
                          <input className="form-check-input" type="checkbox" value={this.state.status} id="flexCheckDefault" checked={this.state.handleEdit} onChange={this.handlecheckbox} />
                        </div> */}
                      </div>
                      <div className="col" onClick={ () =>{this.handleEdit(item)}}><AiFillEdit className="AiFillEdit" size={20}/> </div>
                      <div className="col" onClick={ () =>(this.handleDelete(item.id_list))}><AiFillDelete className="AiFillDelete" size={20}/> </div>
                    </div>
                  </div>
                  )
                })}
                  <div className="btn AiFillPlusCircle" onClick={() => this.handleAdd()}><AiFillPlusCircle /> Add</div>
                </div>
        </div>
      </div>
                {/* Modal */}
                <Modal className="modal" show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form To Do List</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e => this.handleSave(e)}>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="catatan">
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control type="text" name="catatan" placeholder="Masukkan Catatan" value={this.state.catatan} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={this.state.status} onChange={this.handleChange}>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Ucnompleted</option>
                  </Form.Select>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" type="submit">Save</Button>
                </Modal.Footer>
                </Form>
                </Modal>
      </div>
    )
  }
}