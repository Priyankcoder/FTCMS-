'use strict';

var all_student_row = document.querySelectorAll('[data-tab=all-students] tr');
var fees_row = document.querySelectorAll('[data-tab=fees] tr');

all_student_row.forEach(function (row) {
    row.addEventListener('click', edit_content_student);
});

async function edit_content_student(e) {
    var id = e.currentTarget.dataset.id;

    fetch('/api/student/').then(function (resp) {
        return resp.json();
    }).then(function (response) {
        response.forEach(function (data) {
            if (data.id == id) {
                console.log(data);
                document.querySelector('[name=usn]').value = data.usn;
                document.querySelector('[name=student-name]').value = data.name;
                document.querySelector('[name=phone]').value = data.phone;
                document.querySelector('[name=father]').value = data.father_name;
                document.querySelector('[name=mother]').value = data.mother_name;
                document.querySelector('[name=parents-number]').value = data.parents_number;
                document.querySelector('[name=address]').value = data.address;
                document.querySelector('[name=branch]').value = data.branch;
                document.querySelector('[name=sem]').value = data.sem;
            }
        });
    });

    var submit_button = document.getElementById('submit-student');
    submit_button.id = 'edit-student-button';

    document.querySelector('.dark-overlay').classList.add('edit', 'show');
    document.querySelector('.dark-overlay').setAttribute('data-edit', 'student');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        forms[i].classList.remove('show');
    }

    document.querySelector('[data-tab=student]').classList.add('show');
    document.querySelector('[data-target=student]').classList.add('show');

    submit_button.removeEventListener('click', send_student_data);
    submit_button.setAttribute('data-id', id);
    setTimeout(function () {
        document.getElementById('edit-student-button').addEventListener('click', edited_student_data);
    }, 500);
}

fees_row.forEach(function (row) {
    row.addEventListener('click', edit_content_fees);
});

async function edit_content_fees(e) {
    var id = e.currentTarget.dataset.id;

    fetch('/api/fees/').then(function (resp) {
        return resp.json();
    }).then(function (response) {
        response.forEach(function (data) {
            if (data.id == id) {
                console.log(data);
                document.querySelector('[name=fees-student]').value = data.student;
                document.querySelector('[name=fees-name]').value = data.name;
                document.querySelector('[name=fees-tax]').value = data.tax;
                document.querySelector('[name=fees-payment]').value = data.payment;
                document.querySelector('[name=bank]').value = data.bank;
            }
        });
    });

    document.querySelector('.dark-overlay').classList.add('edit', 'show');
    document.querySelector('.dark-overlay').setAttribute('data-edit', 'fees');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        forms[i].classList.remove('show');
    }

    document.querySelector('[data-tab=fees]').classList.add('show');
    document.querySelector('[data-target=fees]').classList.add('show');

    var submit_button = document.getElementById('submit-fees');
    submit_button.id = 'edit-fees-button';

    submit_button.removeEventListener('click', send_fees_data);
    submit_button.setAttribute('data-id', id);
    setTimeout(function () {
        document.getElementById('edit-fees-button').addEventListener('click', edited_fees_data);
    }, 500);
}

function edited_student_data(e) {
    var id = e.currentTarget.dataset.id;

    var usn = document.querySelector('input[name=usn]').value;
    var student_name = document.querySelector('input[name=student-name]').value;
    var student_phone = document.querySelector('input[name=phone]').value;
    var student_father = document.querySelector('input[name=father]').value;
    var student_mother = document.querySelector('input[name=mother]').value;
    var parents_number = document.querySelector('input[name=parents-number]').value;
    var student_address = document.querySelector('textarea[name=address]').value;
    var student_branch = document.querySelector('select[name=branch]').value;
    var student_sem = document.querySelector('select[name=sem]').value;

    fetch('/api/student/' + id + '/', {
        method: 'PUT',
        body: JSON.stringify({
            usn: usn,
            name: student_name,
            phone: student_phone,
            father_name: student_father,
            mother_name: student_mother,
            parents_number: parents_number,
            address: student_address,
            branch: student_branch,
            sem: student_sem
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[data-target=student] input[name=csrfmiddlewaretoken]').value
        }
    }).then(function (res) {
        return res.json();
    }).then(function (response) {
        return console.log('Success:', JSON.stringify(response));
    }).catch(function (error) {
        return console.error('Error:', error);
    });

    document.location.reload(true);
}

function edited_fees_data(e) {
    var id = e.currentTarget.dataset.id;
    var fees_student = document.querySelector('select[name=fees-student]').value;

    var fees_name = document.querySelector('input[name=fees-name]');
    var fees_tax = document.querySelector('input[name=fees-tax]');
    var fees_payment = document.querySelector('input[name=fees-payment]');
    var bank = document.querySelector('input[name=bank');

    fetch('/api/fees/' + id + '/', {
        method: 'PUT',
        body: JSON.stringify({
            student: fees_student,
            name: fees_name.value,
            tax: fees_tax.value,
            payment: fees_payment.value,
            bank: bank.value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[data-target=fees] input[name=csrfmiddlewaretoken]').value
        }
    }).then(function (res) {
        return res.json();
    }).then(function (response) {
        return console.log('Success:', JSON.stringify(response));
    }).catch(function (error) {
        return console.error('Error:', error);
    });

    document.location.reload(true);
}