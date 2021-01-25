import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import nextId from "react-id-generator";
import Filter from "./components/Filter";
import swal from "sweetalert";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
     this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nextId(),
      name,
      number,
    };

    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
    if (
      this.state.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      swal(`${name} is already in contacts`);
      return;
    }
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <h3>Contacts by name</h3>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
