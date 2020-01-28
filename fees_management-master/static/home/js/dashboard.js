const tabs = document.querySelectorAll('.tabs li');
const forms = document.querySelectorAll('.dark-overlay form');

tabs.forEach(tab => tab.addEventListener('click', switch_tabs));

function switch_tabs(e) {

    forms.forEach(form => {

        if (e.currentTarget.dataset.tab === form.dataset.target) {
            form.classList.add('show');
        } else {
            form.classList.remove('show');
        }
    });

    tabs.forEach(tab => {
        if (e.currentTarget !== tab) {
            tab.classList.remove('active');
        } else {
            tab.classList.add('active');
        }
    });
}

async function send_student_data() {
    let usn = document.querySelector('input[name=usn]').value;
    let student_name = document.querySelector('input[name=student-name]').value;
    let student_phone = document.querySelector('input[name=phone]').value;
    let student_father = document.querySelector('input[name=father]').value;
    let student_mother = document.querySelector('input[name=mother]').value;
    let parents_number = document.querySelector('input[name=parents-number]').value;
    let student_address = document.querySelector('textarea[name=address]').value;
    let student_branch = document.querySelector('select[name=branch]').value;
    let student_sem = document.querySelector('select[name=sem]').value;

    if (usn == '' || student_name == '' || student_phone == '' || student_father == '' || student_mother == '' || parents_number == '' || student_address == '' || student_branch == '' || student_sem == '') {
        swal({
            title: 'Error!',
            text: 'Please, Fill The Fields!',
            type: 'error',
            confirmButtonText: 'Okay'
        });
    } else {
        await fetch('/api/student/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': document.querySelector('[data-target=student] input[name=csrfmiddlewaretoken]').value,
            },
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
            })
          });

        swal({
            position: 'center',
            type: 'success',
            title: 'Student Data Has Been Saved!',
            showConfirmButton: false,
            timer: 1500
        });
        
        setTimeout(() => {
            document.location.reload(true);
        }, 1000);
    }
}

async function send_fees_data() {
    let fees_student = document.querySelector('select[name=fees-student]').value;

    let fees_name = document.querySelector('input[name=fees-name]');
    let fees_tax = document.querySelector('input[name=fees-tax]');
    let fees_payment = document.querySelector('input[name=fees-payment]');
    let bank = document.querySelector('input[name=bank]');

    if (fees_name == '' || fees_student == '' || fees_tax == '' || fees_payment == '' || bank == '') {
        swal({
            title: 'Error!',
            text: 'Please, Fill The Fields!',
            type: 'error',
            confirmButtonText: 'Okay'
        });
    } else {

        await fetch('/api/fees/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': document.querySelector('[data-target=fees] input[name=csrfmiddlewaretoken]').value,
            },
            body: JSON.stringify({
                student: fees_student,
                name: fees_name.value,
                tax: fees_tax.value,
                payment: fees_payment.value,
                bank: bank.value
            })
        });

        swal({
            position: 'center',
            type: 'success',
            title: 'Fees Data Has Been Saved!',
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            document.location.reload(true);
        }, 1000);
    }
}

async function send_course_data() {
    let course_name = document.querySelector('input[name=course-name]').value;

    if (course_name == '') {
        swal({
            title: 'Error!',
            text: 'Please, Fill The Fields!',
            type: 'error',
            confirmButtonText: 'Okay'
        });
    } else {
        await fetch('/api/course/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': document.querySelector('[data-target=course] input[name=csrfmiddlewaretoken]').value,
            },
            body: JSON.stringify({
                name: course_name
            })
        });
        swal({
            position: 'center',
            type: 'success',
            title: 'Course Data Has Been Saved!',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            document.location.reload(true);
        }, 1000);
    }
}

async function send_branch_data() {
    let branch_name = document.querySelector('input[name=branch-name]').value;
    let branch_course = document.querySelector('select[name=branch-course]').value;

    if (branch_name == '' || branch_course == '') {
        swal({
            title: 'Error!',
            text: 'Please, Fill The Fields!',
            type: 'error',
            confirmButtonText: 'Okay'
        });
    } else {
        await fetch('/api/branch/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': document.querySelector('[data-target=branch] input[name=csrfmiddlewaretoken]').value,
            },
            body: JSON.stringify({
                name: branch_name,
                course: branch_course
            })
        });
        swal({
            position: 'center',
            type: 'success',
            title: 'Branch Data Has Been Saved!',
            showConfirmButton: false,
            timer: 1500
        });
        document.location.reload(true);
    }
}

var submit_student = document.getElementById('submit-student');
var submit_fees = document.getElementById('submit-fees');
var submit_course = document.getElementById('submit-course');
var submit_branch = document.getElementById('submit-branch');

submit_student.addEventListener('click', send_student_data);
submit_fees.addEventListener('click', send_fees_data);
submit_course.addEventListener('click', send_course_data);
submit_branch.addEventListener('click', send_branch_data);

var close_overlay = document.querySelector('.close-action');

if (document.getElementById('action-button')) {
    var action_button = document.getElementById('action-button');

    close_overlay.addEventListener('click', hide_overlay);
    var overlay_dark = document.querySelector('.dark-overlay');

    action_button.addEventListener('click', show_overlay);
}


function show_overlay() {
    overlay_dark.classList.add('show');
    document.querySelector('[data-target=student] button').id = 'submit-student';
    document.querySelector('[data-target=fees] button').id = 'submit-fees';

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        forms[i].classList.remove('show');
    }

    document.querySelector('[data-tab=student]').classList.add('active');
    document.querySelector('[data-target=student]').classList.add('show');
}

function hide_overlay() {
    overlay_dark.classList.remove('show', 'edit');
    overlay_dark.removeAttribute('data-edit');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        forms[i].classList.remove('show');
    }
}

var side_content_lists = document.querySelectorAll('.side-content .list');

side_content_lists.forEach(list => list.addEventListener('click', toggle_list));

function toggle_list(e) {
    side_content_lists.forEach(list => {
        if (e.currentTarget !== list) {
            list.classList.remove('active');
        }
    });
    
    e.currentTarget.classList.toggle('active');
}

var courses_heading = document.querySelector('.courses-heading');

courses_heading.addEventListener('click', toggle_courses_content);

function toggle_courses_content() {
    courses_heading.classList.toggle('show');
}

var list_content_selectables = document.querySelectorAll('[data-list]');
var tables = document.querySelectorAll('[data-tab]');

list_content_selectables.forEach(list => {
    list.addEventListener('click', show_table_content);
});

function show_table_content(e) {
    tables.forEach(table => {
        if (e.currentTarget.dataset.list === table.dataset.tab) {
            table.classList.add('show');
            e.currentTarget.classList.add('active');
        } else {
            table.classList.remove('show');
        }
    });

    list_content_selectables.forEach(list => {
        if (list !== e.currentTarget) {
            list.classList.remove('active');
        }
    })
}


