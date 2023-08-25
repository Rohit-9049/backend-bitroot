const express = require('express');
const router = express.Router();
const contact_controller = require('../Controller/contact_controller');

router.post('/contacts', contact_controller.createContact);
router.get('/contacts', contact_controller.getAllContacts);
router.get('/contacts/:search_char', contact_controller.search_contacts);
router.put('/contacts/:id', contact_controller.updateContact);
router.delete('/contacts/:id', contact_controller.deleteContact);

module.exports = router;