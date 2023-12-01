import React, { Component } from "react";
import { variables } from "../Api_EndPoint/Variables";
import axios from "axios";
import Pagination from "./Pagination";

export default class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      modelTitle: "",
      DepartmentName: "",
      DepartmentId: 0,
    };
  }

  componentDidMount() {
    this.RefreshList();
  }

  RefreshList() {
    axios
      .get(variables.API_URl + "Department/allDepartment", {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((data) => {
        this.setState({ departments: data.data });
      });
    // console.log(this.departments);
  }

  ChangeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };

  AddClick() {
    this.setState({
      modelTitle: "Add Department",
      DepartmentName: "",
      DepartmentId: 0,
    });
  }

  EditClick(dep) {
    this.setState({
      modelTitle: "Edit Department",
      DepartmentId: dep.departmentId,
      DepartmentName: dep.departmentName,
    });
  }

  CreateClick() {
    axios
      .get(
        variables.API_URl +
          "Department/insertDepartment?DepartmentName=" +
          this.state.DepartmentName
      )
      .then((result) => {
        if (result.status === 200) {
          alert("Add Successfull");
          this.RefreshList();
        }
      })
      .catch((error) => {
        alert("Fail to add");
      });
  }

  UpdateClick() {
    const userData = {
      departmentId: this.state.DepartmentId,
      departmentName: this.state.DepartmentName,
    };
    // console.log(userData);
    axios
      .put(variables.API_URl + "Department/updateDepartment", userData)
      .then((result) => {
        if (result.status === 200) {
          alert("Edit Successfull");
          this.RefreshList();
        }
      })
      .catch((error) => {
        alert("Fail to update");
        console.log(error);
      });
  }

  DeleteClick(departmentId) {
    if (window.confirm("Are you sure!")) {
      axios
        .delete(
          variables.API_URl + `Department/deleteDepartment/${departmentId}`
        )
        .then((result) => {
          if (result.status === 200) {
            alert("Delete Successfull");
            this.RefreshList();
          }
        })
        .catch((error) => {
          alert("Fail to Delete");
        });
    }
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.AddClick()}
        >
          Add Department
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>DepartmentId</th>
              <th>DepartmentName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.departments.map((dep) => (
              <tr key={dep.departmentId}>
                <td>{dep.departmentId}</td>
                <td>{dep.departmentName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.EditClick(dep)}
                  >
                    <i className="fa-solid fa-pencil "></i>
                  </button>
                  <button
                    className="btn btn-light mr-1"
                    onClick={() => this.DeleteClick(dep.departmentId)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.state.modelTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">DepartmentName</span>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.DepartmentName}
                    onChange={this.ChangeDepartmentName.bind(this)}
                  />
                </div>

                {this.state.DepartmentId === 0 ? (
                  <button
                    className="btn btn-primary float-start"
                    onClick={() => this.CreateClick()}
                  >
                    Create
                  </button>
                ) : null}

                {this.state.DepartmentId !== 0 ? (
                  <button
                    className="btn btn-primary float-start"
                    onClick={() => this.UpdateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* <Pagination data={this.state.departments} /> */}
      </div>
    );
  }
}
