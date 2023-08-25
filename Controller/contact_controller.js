const contact_service = require('../Service/contact_service');

exports.createContact = (req, res) => {
    const newContact = req.body;
try {
    const contact = contact_service.createContact(newContact);
    res.status(201).json(contact);
} catch (error) {
    res.status(400).json('bad request')
}
};

exports.getAllContacts = (req, res) => {
  try {
    const contacts = contact_service.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json('bad request')
  }
};

exports.search_contacts = (req, res) => {
try {
    const characters =req.params.search_char;
    const contact = contact_service.getContactByName(characters);
    if (contact) {
        res.status(200).json(contact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }    
} catch (error) {
    res.status(400).json('bad request')
}
};

exports.updateContact = (req, res) => {
try {
    const id = parseInt(req.params.id);
    const updatedContact = req.body;
    const contact = contact_service.updateContact(id, updatedContact);
    if (contact) {
        res.status(204).json(contact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
} catch (error) {
    res.status(400).json('bad request')
}
};

exports.deleteContact = (req, res) => {
try {
    const id = parseInt(req.params.id);
    const contact = contact_service.deleteContact(id);
    if (contact) {
        res.status(200).json(contact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
} catch (error) {
    res.status(400).json('bad request')
}
};