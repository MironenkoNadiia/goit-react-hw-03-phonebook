import React, { Component } from "react";
import PropTypes from "prop-types";


const INITIAL_STATE = {
  contacts: [],
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  // handleNameChange = (e) => {
  //   this.setState({
  //     name: e.target.value,
  //   });
  // };

  // handleNumberChange = (e) => {
  //   this.setState({
  //     number: e.target.value,
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state.name, this.state.number);

    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <div>
        <h2>Name</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
        <h2>Number</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="number"
            placeholder="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number
};

export default ContactForm;
