let name = document.getElementById('name');
let deposit = document.getElementById('deposit');
let withdrawal = document.getElementById('withdrawal');
let summary = document.getElementById('summary');

const bankAccount = function (ownerName) {
    let balance = 1000; //Assuming a Default balance
    let owner = ownerName;
    return {
        withdrawal: function(withdrawalAmt) {
            // Add validation to ensure only appropriate withdrawals and deposits are allowed.
            if (withdrawalAmt <= balance) {
                balance = balance - withdrawalAmt;
                summary.innerHTML += `Withdraw: ${withdrawalAmt}<br>`;
            } else {
                summary.innerHTML += `You do not have sufficient fund in your account.<br>`;
            }          
        },
        deposit: function(depositAmt) {
            // Add validation to ensure only appropriate withdrawals and deposits are allowed.
            balance = balance + depositAmt;
            summary.innerHTML += `Deposit: ${depositAmt}<br>`;
        },
        getBalance: function() {
            return balance;
        },
        getOwnerName: function() {
            return owner;
        }
    };
};

window.addEventListener('load', () => { 
    // BankAccount object is created only when uesr enters their name. Hence Withdrawal and Deposit works only after that.
    let ba;
    name.addEventListener('click', () => {
        let ownerName = window.prompt('Enter your name');
        console.log(ownerName);
        ba = bankAccount(ownerName);
        summary.innerHTML += `Name: ${ba.getOwnerName()}<br>`;
        summary.innerHTML += `BALANCE: ${ba.getBalance()}<br>`;
    });
    
    deposit.addEventListener('click', () => {
        let depositAmt = parseFloat(window.prompt('Enter the amount to deposit'));
        ba.deposit(depositAmt);
        summary.innerHTML += `BALANCE: ${ba.getBalance()}<br>`;
    });
    
    withdrawal.addEventListener('click', () =>{
        let withdrawalAmt = parseFloat(window.prompt('Enter the amount to withdraw'));
        ba.withdrawal(withdrawalAmt);
        summary.innerHTML += `BALANCE: ${ba.getBalance()}<br>`;
    });
});

