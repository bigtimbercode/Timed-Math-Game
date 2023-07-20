const operators = ["+", "-", "*"];
const minOperand = 3;
const maxOperand = 12;
const totalProblems = 10;
let wrong = 0;
let currentProblem = 0;
let startTime;

function generateProblem() {
    const left = Math.floor(Math.random() * (maxOperand - minOperand + 1) + minOperand);
    const right = Math.floor(Math.random() * (maxOperand - minOperand + 1) + minOperand);
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const expr = `${left} ${operator} ${right}`;
    const answer = eval(expr);
    return { expr, answer };
}

document.getElementById('start').onclick = () => {
    document.getElementById('start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    startTime = Date.now();
    const problem = generateProblem();
    document.getElementById('problem').textContent = `Problem #${currentProblem + 1}: ${problem.expr} = `;
}

function submitAnswer() {
    const guess = document.getElementById('guess').value;
    const problemText = document.getElementById('problem').textContent;
    const answer = eval(problemText.split(': ')[1].split(' =')[0]);
    if (guess == answer) {
        currentProblem += 1;
        if (currentProblem === totalProblems) {
            document.getElementById('game').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            document.getElementById('totalTime').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
        } else {
            const problem = generateProblem();
            document.getElementById('problem').textContent = `Problem #${currentProblem + 1}: ${problem.expr} = `;
            document.getElementById('guess').value = '';
        }
    } else {
        wrong += 1;
    }
}

document.getElementById('submitGuess').onclick = submitAnswer;

document.getElementById('guess').onkeypress = function(e) {
    if(e.keyCode === 13) {
        submitAnswer();
    }
}

document.getElementById('restart').onclick = () => {
    document.getElementById('result').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('guess').value = '';
    currentProblem = 0;
    wrong = 0;
}
