import React, { Component } from "react";
import { variables } from "../Api_EndPoint/Variables";
import axios from "axios";

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      employees: [],
      modalTitle: "",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.jpg",
      PhotoPath: variables.PHOTO_URL + "/Upload/Files/",
    };
  }

  componentDidMount() {
    this.RefreshList();
    axios.get(variables.API_URl + "Department/allDepartment").then((data) => {
      this.setState({ departments: data.data });
    });
  }

  RefreshList() {
    // debugger;
    axios
      .get(variables.API_URl + "Employee/allEmployee", {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((data) => {
        this.setState({ employees: data.data });
      });
  }

  AddClick() {
    this.setState({
      modalTitle: "Add Employee",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.jpg",
    });
  }

  CreateClick() {
    const data = {
      EmployeeName: this.state.EmployeeName,
      Department: this.state.Department,
      DateOfJoining: this.state.DateOfJoining,
      PhotoFileName: this.state.PhotoFileName,
    };
    axios
      .post(variables.API_URl + "Employee/insertEmployee", data)
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

  ImageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    axios.post(variables.PHOTO_URL, formData).then((data) => {
      this.setState({ PhotoFileName: data.data });
    });
  };

  EditClick(emp) {
    console.log(emp);
    this.setState({
      modalTitle: "Edit Employee",
      EmployeeId: emp.employeeId,
      EmployeeName: emp.employeeName,
      Department: emp.department,
      DateOfJoining: emp.dateOfJoining,
      PhotoFileName: emp.photoFileName,
    });
  }
  UpdateClick = () => {
    const data = {
      EmployeeId: this.state.EmployeeId,
      EmployeeName: this.state.EmployeeName,
      Department: this.state.Department,
      DateOfJoining: this.state.DateOfJoining,
      PhotoFileName: this.state.PhotoFileName,
    };
    axios
      .put(variables.API_URl + "Employee/updateEmployee", data)
      .then((result) => {
        if (result.status === 200) {
          alert("Edit Successfull");
          this.RefreshList();
        }
      })
      .catch((error) => {
        alert("Edit Fail");
      });
  };
  DeleteClick = (EmployeeId) => {
    if (window.confirm("Are you sure!")) {
      axios
        .delete(variables.API_URl + "Employee/deleteEmployee?Id=" + EmployeeId)
        .then((result) => {
          if (result.status === 200) {
            alert("Delete Successfull");
            this.RefreshList();
          }
        })
        .catch((error) => {
          alert("Delete Fail");
        });
    }
  };

  ChangeEmployeeName = (e) => {
    this.setState({ EmployeeName: e.target.value });
  };
  ChangeDateOfJoining = (e) => {
    this.setState({ DateOfJoining: e.target.value });
  };

  ChangeDepartment = (e) => {
    this.setState({ Department: e.target.value });
  };

  render() {
    const {
      departments,
      employees,
      modalTitle,
      EmployeeId,
      EmployeeName,
      Department,
      DateOfJoining,
      PhotoPath,
      PhotoFileName,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.AddClick()}
        >
          Add Employee
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.department}</td>
                <td>{emp.dateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.EditClick(emp)}
                  >
                    <i className="fa-solid fa-pencil "></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.DeleteClick(emp.employeeId)}
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
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Emp Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={EmployeeName}
                        onChange={this.ChangeEmployeeName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Department</span>
                      <select
                        className="form-select"
                        onChange={this.ChangeDepartment}
                        value={Department}
                        defaultValue={"placeholder"}
                      >
                        <option value={"placeholder"}>select</option>
                        {departments.map((dep) => (
                          <option key={dep.departmentId}>
                            {dep.departmentName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">DOJ</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOfJoining}
                        onChange={this.ChangeDateOfJoining}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + PhotoFileName}
                      alt=""
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.ImageUpload}
                    />
                  </div>
                </div>

                {EmployeeId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.CreateClick()}
                  >
                    Create
                  </button>
                ) : null}

                {EmployeeId !== 0 ? (
                  <button
                    type="button"
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
      </div>
    );
  }
}
