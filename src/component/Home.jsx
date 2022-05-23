import React, { Component } from "react";
import AddContact from "./AddContact";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: { contacts: [] },
      showAddContact: false,
      dbLength: 0,
      showpopup: false,
    };
  }

  addContact = () => {
    this.setState({
      showAddContact: !this.state.showAddContact,
      dbLength: this.state.data.contacts.length,
    });
    this.getData();
  };

  deleteConfirmation = (id) => {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-4 offset-lg-1">
            <div className="card bg-card text-dark ">
              <div className="card-body">
                <h3>Are you sure you want to delete this contact</h3>
                <button
                  className="btn btn-primary btn-sm inline "
                  onClick={this.deleteContact(id)}
                >
                  Yes
                </button>
                <button
                  className="btn btn-primary btn-sm inline "
                  onClick={this.setState({ showpopup: false })}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  deleteContact = (id) => {
    fetch("http://localhost:8080/contacts/" + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(this.getData)
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    fetch("http://localhost:8080/contacts/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((contacts) => {
        this.setState({
          data: { contacts },
          dbLength: contacts.length,
        });
      });
  };

  render() {
    if (this.state.showAddContact === true) {
      return (
        <AddContact
          addContact={this.addContact}
          dbLength={this.state.dbLength}
        />
      );
    } else if (
      this.state.showAddContact === false &&
      this.state.dbLength === 0
    ) {
      return (
        <div className="card bg-card text-center text-dark mb-2">
          <div className="card-body">
            <h1>No contacts found</h1>
            <button
              className="btn btn-primary btn-sm inline "
              onClick={this.addContact}
            >
              ADD Contact
            </button>
          </div>
        </div>
      );
    } else if (
      this.state.showAddContact === false &&
      this.state.dbLength !== 0
    ) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <br />
              <div className="card">
                <div className="card-header bg-custom">
                  <h3 align="center">Contact Details</h3>
                  <button
                    className="btn btn-primary btn-sm inline "
                    onClick={this.addContact}
                  >
                    ADD MORE
                  </button>
                </div>
                <div className="card-body">
                  {/* code here to get the view as shown in QP for GetBooking componfsent */}
                  {/* Display booking data in tabular form */}
                  <div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Name </th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">OnWhatsapp </th>
                          <th scope="col">Type</th>
                          <th scope="col">Profile Photo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.data.contacts.map((contactData, index) => (
                          <tr className="text-center" key={index}>
                            <td>{contactData.name}</td>
                            <td>{contactData.number}</td>
                            <td>{contactData.isWhatsapp}</td>
                            <td>{contactData.type}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <div className="row">
                                <button
                                  className="btn btn-success btn-sm inline-block ml-1 mr-1"
                                  onClick={() => null}
                                >
                                  Edit
                                </button>
                                <br />
                                <button
                                  className="btn btn-danger btn-sm inline-block mr-1"
                                  onClick={() =>
                                    this.deleteConfirmation(contactData.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Home;
