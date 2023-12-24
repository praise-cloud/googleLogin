//password function

function passwordFunction(){
    let password = document.getElementById('password');
    let checked = document.getElementById('checked');

    if(password.type === 'password'){
        password.type = 'text';
        checked.checked = true;
    }else{
        password.type = 'password';
        checked.checked = false;
    }
}