/******** Global Variables*********/



var allUsersData = [];
var fileName = null;



var regexName = /^[a-zA-Z]\w{4,16}$/ ;
var regexPass = /^[\w*^%$#@!-_]{4,16}$/ ;
var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;



/* On load */
window.addEventListener('load' , function(){


    /* Read data from local storage */
    var storedData = localStorage.getItem('allUsersData' );
    

    if(storedData)
    {
        allUsersData = JSON.parse(storedData);
    }
});


fileName = location.href; 

/* sign in  */
(function (){
    if (fileName.includes('index.html')){
        var inputUserNameElm = document.getElementById('userNameInput');
        var inputUserPassElm = document.getElementById('passInput');
        var logInBtn = document.querySelector('.login_wp button');
        var errorMsg = document.getElementById('logInErrorMsg');
        
        


        /* Log in button  */
        logInBtn.addEventListener('click' , function(){
            userName = inputUserNameElm.value;
            userPass = inputUserPassElm.value;

            var userData = allUsersData.find(function(s){return s.username === userName})
            if(userData){
                if (userData.userpass === userPass){
                    localStorage.setItem('logedUser',userName);
                    /* clear login screen */
                    inputUserNameElm.value = '';
                    inputUserPassElm.value = '';
                    /* Move to user home and save his data */
                    location.assign('./home.html');
                }
                else
                {
                    errorMsg.innerText = 'pass is incorrect';
                    errorMsg.classList.remove('d-none');
                }
            }
            else{
                errorMsg.innerText = 'user is incorrect';
                errorMsg.classList.remove('d-none');
            }
            
        })
    }  
})();


/* sign up */
(function (){
    if (fileName.includes('signUp.html')){
        
        var inputUserNameElm = document.getElementById('userNameInput');
        var inputUserPassElm = document.getElementById('passInput');
        var inputEmailElm    = document.getElementById('emailInput');
        var errorMsgElm = document.getElementById('errorMsg');
        var errorMsgTakenElm = document.getElementById('errorMsgTake');
        

        var signUpBtnElm = document.getElementById('btnSignUp');

        var isNameOk = false;
        var isPassOk = false;
        var isEmailOk = false;

        var userName ;
        var userPass ;
        var userEmail;



        /* submit  event */
        signUpBtnElm.addEventListener('click' , function(){
            /* Check if all data is filled  */
            if ((inputUserNameElm.value === '') || (inputUserPassElm.value ==='') || (inputEmailElm.value ==='') ){
                errorMsgElm.classList.remove('d-none');
            }
            else
            {
                errorMsgElm.classList.add('d-none');

                /* Check if all data is valid  */
                if ( isNameOk &  isPassOk & isEmailOk)
                {
                    /* Check if user name is not used  */
                    if(allUsersData.find(function(s){return s.username === userName}))
                    {
                        errorMsgTakenElm.classList.remove('d-none');
                    }
                    else{
                        errorMsgTakenElm.classList.add('d-none');
                        /* Save data  */
                        saveData(userName , userPass, userEmail);
                        /* Clear data */
                        clearInptFields();

                        alert('you have been assigned');
                    }
                }
            } 
        })


        /* Blur events */

        inputUserNameElm.addEventListener('blur' , function(){
            userName = inputUserNameElm.value;
            inputUserNameElm.classList.remove('is-valid' , 'is-invalid');

            if(! (regexName.test(userName))){
                /* Display error msg */
                inputUserNameElm.nextElementSibling.classList.remove('d-none');
                inputUserNameElm.classList.add('is-invalid');
                isNameOk = false;
            }
            else 
            {
                inputUserNameElm.nextElementSibling.classList.add('d-none');
                inputUserNameElm.classList.add('is-valid');
                isNameOk = true;
            }
        });


        inputUserPassElm.addEventListener('blur' , function(){
            userPass = inputUserPassElm.value;
            inputUserPassElm.classList.remove('is-valid' , 'is-invalid');

            if(! (regexPass.test(userPass))){
                /* Display error msg */
                inputUserPassElm.nextElementSibling.classList.remove('d-none');
                inputUserPassElm.classList.add('is-invalid');
                isPassOk = false;
            }
            else 
            {
                inputUserPassElm.nextElementSibling.classList.add('d-none');
                inputUserPassElm.classList.add('is-valid');
                isPassOk = true;
            }
        });


        inputEmailElm.addEventListener('blur' , function(){
            userEmail = inputEmailElm.value;
            inputEmailElm.classList.remove('is-valid' , 'is-invalid');

            if(! (regexEmail.test(userEmail))){
                /* Display error msg */
                inputEmailElm.nextElementSibling.classList.remove('d-none');
                inputEmailElm.classList.add('is-invalid');
                isEmailOk = false;
            }
            else 
            {
                inputEmailElm.nextElementSibling.classList.add('d-none');
                inputEmailElm.classList.add('is-valid');
                isEmailOk = true;
            }
        });


        function clearInptFields(){
            inputUserNameElm.value ='';
            inputUserPassElm.value ='';
            inputEmailElm.value ='';
            inputUserNameElm.classList.remove('is-valid' , 'is-invalid');
            inputUserPassElm.classList.remove('is-valid' , 'is-invalid');
            inputEmailElm.classList.remove('is-valid' , 'is-invalid');
        }
        
    }  
})();

/* home page */
(function (){
    if (fileName.includes('home.html')){
        var header = document.querySelector('.home_wp h1');
        var logedUser = localStorage.getItem('logedUser');

        if (logedUser != 'null'){
            header.innerText += ' ' + logedUser;  
            localStorage.setItem('logedUser',null);
        }     
    }  
})();







function saveData(user,pass, email)
{
    var u = {
        username : user,
        userpass : pass,
        usermail : email
    }

    allUsersData.push(u);

    /* Save to local memory */
    localStorage.setItem('allUsersData' , JSON.stringify(allUsersData));
}





