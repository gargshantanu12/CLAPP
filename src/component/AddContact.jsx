import React from "react";
export class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        number: "",
        isWhatsapp: false,
        type: Type.office.id,
      },
    };
  }

  addNewContact = () => {
    const contact = {
      id: this.props.dbLength + 1,
      name: this.state.form.name,
      number: this.state.form.number,
      isWhatsapp: this.state.form.isWhatsapp ? "Yes" : "No",
      type: this.state.form.type,
    };
    fetch("http://localhost:8080/contacts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then(this.props.addContact())
      .catch((err) => console.log(err));
  };
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const form = this.state.form;
    form[name] = value;
    this.setState({ form });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-4 offset-lg-1">
              <div className="card bg-card text-dark ">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={this.state.form.name}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="number"
                        id="phoneNumber"
                        value={this.state.form.number}
                        onChange={this.handleChange}
                        className="form-control"
                      />
                    </div>
                    <br />

                    <div className="form-group">
                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        name={"type"}
                      >
                        {Object.keys(Type).map((key) => (
                          <option key={key} value={key}>
                            {Type[key].type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <br />
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="isWhatsapp"
                        checked={this.state.form.isWhatsapp}
                        onChange={this.handleChange}
                      />
                      <span> </span>
                      <label> OnWhatsApp</label>
                    </div>
                    <br />
                    <div className="form-group">
                      <button
                        type="submit"
                        name="viewFlightsButton"
                        className="form-control btn btn-primary"
                        onClick={this.addNewContact}
                      >
                        Add Contact
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AddContact;

const Type = {
  office: {
    id: "office",
    type: "Office",
  },
  personal: {
    id: "personal",
    type: "Personal",
  },
};
