const mysql = require('mysql2/promise')
const dbConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
};


exports.createContact=async (contact)=>{
    const { name, email, image, phoneNumbers } = contact;
    const [result] = await pool.execute('INSERT INTO contact (name, email, image) VALUES (?, ?, ?)', [name, email, image || null]);

    const contactId = result.insertId;
    if (phoneNumbers && phoneNumbers.length > 0) {
        const phoneInsertPromises = phoneNumbers.map(async phoneNumber => {
            await pool.execute('INSERT INTO phone_number (contact_id, phonenumber) VALUES (?, ?)', [contactId, phoneNumber]);
        });
        await Promise.all(phoneInsertPromises);
    }
}

exports.getAllContacts=async ()=>{
    const [contacts] = await pool.query(
        'SELECT c.id, c.name, c.email, c.image, GROUP_CONCAT(p.phonenumber) AS phoneNumbers ' +
        'FROM contact c ' +
        'LEFT JOIN phone_number p ON c.id = p.contact_id ' +
        'GROUP BY c.id'
    );
return contacts;
}

exports.getContactByName=async ()=>{
    const [contacts] = await pool.query(
        'SELECT c.id, c.name, c.email, c.image, GROUP_CONCAT(p.phonenumber) AS phoneNumbers ' +
        'FROM contact c ' +
        'LEFT JOIN phone_number p ON c.id = p.contact_id ' +
        'WHERE c.name LIKE ? ' +
        'GROUP BY c.id',
        [`%${searchName}%`]
    );

    return contacts;
}

exports.updateContact=async ()=>{
    await pool.execute('UPDATE contact SET name = ?, email = ?, image = ? WHERE id = ?', [name, email, image || null, contactId]);

    // Delete existing phone numbers
    await pool.execute('DELETE FROM phone_number WHERE contact_id = ?', [contactId]);

    // Insert updated phone numbers
    if (phoneNumbers && phoneNumbers.length > 0) {
        const phoneInsertPromises = phoneNumbers.map(async phoneNumber => {
            await pool.execute('INSERT INTO phone_number (contact_id, phonenumber) VALUES (?, ?)', [contactId, phoneNumber]);
        });
        await Promise.all(phoneInsertPromises);
    }
}

exports.deleteContact= async (id)=>{
    await pool.execute('DELETE FROM contact WHERE id = ?', [contactId]);

    // Delete associated phone numbers from the phone_number table
    await pool.execute('DELETE FROM phone_number WHERE contact_id = ?', [contactId]);
}

