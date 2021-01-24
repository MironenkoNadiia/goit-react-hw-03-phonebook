import React from "react";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => {
        return (
          <li key={id}>
            <p>{name}</p>
            <p>{number}</p>
            <section>
              <button type="button" onClick={() => onRemoveContact(id)}>
                Удалить
              </button>
            </section>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.string.isRequired
}

export default ContactList;
