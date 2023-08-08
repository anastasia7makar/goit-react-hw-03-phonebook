import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Section from './Section/Section';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const getContact = localStorage.getItem('contact-item');

    if (getContact)
      this.setState({
        contacts: JSON.parse(getContact),
      });
  }

  componentDidUpdate() {
    localStorage.setItem('contact-item', JSON.stringify(this.state.contacts));
  }

  addContact = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      ...data,
    };
    const isExistsName = contacts.some(({ name }) => name === data.name);
    if (isExistsName) {
      return alert(`${data.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChangeFilter = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const FilterlowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(FilterlowerCase)
    );
  };

  deleteContact = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== userId),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} handleChangeFilter={this.handleChangeFilter} />

          <ContactList
            contacts={this.getFilterContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
