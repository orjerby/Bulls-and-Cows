
var num1, num2, guess1, guess2, bullCounter, hitCounter;
var timer1;
var timer2;
var timer1Interval;
var timer2Interval;
var checkGuess1Interval;
var checkGuess2Interval;
var player1ResultIndex = 1;
var player2ResultIndex = 1;
var roll1;
var roll2;
var rolled1 = false;
var rolled2 = false;
var player1ChoseNum = false;
var player2ChoseNum = false;
var player1Guessed = false;
var player2Guessed = false;
$(document).ready(function () {
    $('#newGame').click(startAgain);

    $('#roll1').click(function () {
        if (!(rolled1)) {
            rolled1 = true;
            roll1 = parseInt(Math.round(Math.random() * 5) + 1);
            $('#rolled1').html(roll1);
            $('#roll1').hide();
            if (rolled2) {
                if (roll2 < roll1) {
                    showGuesses1();
                    startTimer1();
                }
                else if (roll1 < roll2) {
                    showGuesses2();
                    startTimer2();
                }
                else if (roll1 == roll2) {
                    $('#roll1').show();
                    $('#roll2').show();
                    rolled1 = false;
                    rolled2 = false;
                }
            }
        }
    });

    $('#roll2').click(function () {
        if (!(rolled2)) {
            rolled2 = true;
            roll2 = parseInt(Math.round(Math.random() * 5) + 1);
            $('#rolled2').html(roll2);
            $('#roll2').hide();
            if (rolled1) {
                if (roll2 < roll1) {
                    showGuesses1();
                    startTimer1();
                }
                else if (roll1 < roll2) {
                    showGuesses2();
                    startTimer2();
                }
                else if (roll1 == roll2) {
                    $('#roll1').show();
                    $('#roll2').show();
                    rolled1 = false;
                    rolled2 = false;
                }
            }
        }
    });

    $('#btnPlayer1').click(function () { //כשלוחצים על 'שלח' של מספר של שחקן 1
        if ($('#firstPlayerNumber').val().length == 4) {
            var value = $('#firstPlayerNumber').val();
            if (checkValidation(value)) {
                player1ChoseNum = true;
                num1 = value;
                $('#roll1').show();
                removeNumberInput1();
            }
        }
    });

    $('#btnPlayer2').click(function () { //כשלוחצים על 'שלח' של מספר של שחקן 2
        if ($('#secondPlayerNumber').val().length == 4) {
            var value = $('#secondPlayerNumber').val();
            if (checkValidation(value)) {
                player2ChoseNum = true;
                num2 = value;
                $('#roll2').show();
                removeNumberInput2();
            }
        }
    });

    $('#firstPlayerNumber').keypress(function (e) {
        if (e.keyCode == 13)
            $('#btnPlayer1').click();
    });

    $('#secondPlayerNumber').keypress(function (e) {
        if (e.keyCode == 13)
            $('#btnPlayer2').click();
    });

    $('#sendGuess1').click(function () { //כשלוחצים על 'שלח' של ניחוש של שחקן 1
        if (player2ChoseNum) {
            if ($('#firstPlayerGuess').val().length == 4) {
                var value = $('#firstPlayerGuess').val();
                if (checkValidation(value)) {
                    guess1 = value;
                    player1Guessed = true;
                    $('#theGuess1Chose').html(guess1);
                    $('#sendGuess1').hide();
                    $('#firstPlayerGuess').hide();
                    $('#theGuess1Chose').show();
                    $('#secondPlayerGuess').val("");
                    $('#sendGuess2').show();
                    $('#theGuess2Chose').hide();
                    $('#secondPlayerGuess').show();
                    $('#guesslbl2').show();
                    player2Guessed = false;
                    startTimer2();
                    checkResult(guess1, num2, 1);
                }
            }
        }
    });

    $('#sendGuess2').click(function () { //כשלוחצים על 'שלח' של ניחוש של שחקן 2
        if (player1ChoseNum) {
            if ($('#secondPlayerGuess').val().length == 4) {
                var value = $('#secondPlayerGuess').val();
                if (checkValidation(value)) {
                    guess2 = value;
                    player2Guessed = true;
                    $('#theGuess2Chose').html(guess2);
                    $('#sendGuess2').hide();
                    $('#secondPlayerGuess').hide();
                    $('#theGuess2Chose').show();
                    $('#firstPlayerGuess').val("");
                    $('#sendGuess1').show();
                    $('#theGuess1Chose').hide();
                    $('#firstPlayerGuess').show();
                    $('#guesslbl1').show();
                    player1Guessed = false;
                    startTimer1();
                    checkResult(guess2, num1, 2);
                }
            }
        }
    });

    $('#firstPlayerGuess').keypress(function (e) {
        if (e.keyCode == 13)
            $('#sendGuess1').click();
    });

    $('#secondPlayerGuess').keypress(function (e) {
        if (e.keyCode == 13)
            $('#sendGuess2').click();
    });

    $('#show1').click(function () { //כשלוחצים על 'הראה' של שחקן 1
        $('#show1').hide();
        $('#theNumber1Chose').html(num1);
        $('#theNumber1Chose').show();
        $('#hide1').show();
        $('#numlbl1').show();
    });
    $('#show2').click(function () { //כשלוחצים על 'הראה' של שחקן 2
        $('#show2').hide();
        $('#theNumber2Chose').html(num2);
        $('#theNumber2Chose').show();
        $('#hide2').show();
        $('#numlbl2').show();
    });
    $('#hide1').click(function () { //כשלוחצים על הסתר של שחקן 1
        $('#show1').show();
        $('#hide1').hide();
        $('#theNumber1Chose').hide();
        $('#numlbl1').hide();
    });
    $('#hide2').click(function () { //כשלוחצים על הסתר של שחקן 2
        $('#show2').show();
        $('#hide2').hide();
        $('#theNumber2Chose').hide();
        $('#numlbl2').hide();
    });
});

function startTimer1() {
    sec = 59;
    $('#timer1').html(sec + 1);
    timer1Interval = setInterval(function () {
        $('#timer1').html(sec--);
        if (sec == -1) {
            $('#timer1').html("!הזמן נגמר");
            clearInterval(timer1Interval);
            $('#sendGuess1').hide();
            $('#firstPlayerGuess').hide();
            $('#guesslbl1').hide();
            $('#sendGuess2').show();
            $('#secondPlayerGuess').show();
            $('#guesslbl2').show();
            $('#secondPlayerGuess').val("");
            $('#theGuess2Chose').html("");
            startTimer2();
        }
        checkGuess1Interval = setInterval(function () {
            if (player1Guessed) {
                player1Guessed = false;
                $('#timer1').html("טיימר");
                clearInterval(checkGuess1Interval);
                clearInterval(timer1Interval);
            }
        }, 0);
    }, 1000);
}

function startTimer2() {
    sec = 59;
    $('#timer2').html(sec + 1);
    timer2Interval = setInterval(function () {
        $('#timer2').html(sec--);
        if (sec == -1) {
            $('#timer2').html("!הזמן נגמר");
            clearInterval(timer2Interval);
            $('#sendGuess2').hide();
            $('#secondPlayerGuess').hide();
            $('#guesslbl2').hide();
            $('#sendGuess1').show();
            $('#firstPlayerGuess').show();
            $('#guesslbl1').show();
            $('#firstPlayerGuess').val("");
            $('#theGuess1Chose').html("");
            startTimer1();
        }
        checkGuess2Interval = setInterval(function () {
            if (player2Guessed) {
                player2Guessed = false;
                $('#timer2').html("טיימר");
                clearInterval(checkGuess2Interval);
                clearInterval(timer2Interval);
            }
        }, 0);
    }, 1000);
}

function showGuesses1() {
    $('#guesslbl1').show();
    $('#firstPlayerGuess').show();
    $('#sendGuess1').show();
}

function showGuesses2() {
    $('#guesslbl2').show();
    $('#secondPlayerGuess').show();
    $('#sendGuess2').show();
}

function removeNumberInput1() //כשנקלט מספר של שחקן 1
{
    $('#firstPlayerNumber').hide();
    $('#show1').show();
    $('#btnPlayer1').hide();
    $('#numlbl1').hide();
}

function removeNumberInput2() { //כשנקלט מספר של שחקן 2
    $('#secondPlayerNumber').hide();
    $('#show2').show();
    $('#btnPlayer2').hide();
    $('#numlbl2').hide();
}

function checkValidation(value) //בודק אם המספר בסדר מבחינת החוקים של המשחק
{
    if (parseInt(value[0]) >= 0 && parseInt(value[0]) <= 9 && parseInt(value[1]) >= 0 && parseInt(value[1]) <= 9 && parseInt(value[2]) >= 0 && parseInt(value[2]) <= 9 && parseInt(value[3]) >= 0 && parseInt(value[3]) <= 9) {
        for (var i = 0; i < 4; i++) {
            for (var j = i + 1; j < 4; j++) {
                if (parseInt(value[i]) == parseInt(value[j])) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}

function checkResult(guess, num, whoGuessed) //בודק כמה בולים וכמה פגיעות
{
    var bullCounter = 0, hitCounter = 0;
    for (var i = 0; i < 4; i++) {
        if (parseInt(guess[i]) == parseInt(num[i])) {
            bullCounter++;
        }
        for (var j = 0; j < 4; j++) {
            if (i != j && parseInt(guess[i]) == parseInt(num[j])) {
                hitCounter++;
            }
        }
    }
    printResults(bullCounter, hitCounter, whoGuessed, guess);
}

function printResults(bullCounter, hitCounter, whoGuessed, guess) //להדפיס תוצאות
{
    var res1StringHolder = '#res1-';
    var res2StringHolder = '#res2-';
    res1StringHolder += player1ResultIndex;
    res2StringHolder += player2ResultIndex;
    if (whoGuessed == 1) {
        var result = "";
        for (var i = 0; i < bullCounter; i++) {
            result += "<img id='bull' src='data/plus.png' />&nbsp;";
        }
        for (var i = 0; i < hitCounter; i++) {
            result += "<img id='hit' src='data/minus.jpg' />&nbsp;";
        }
        $(res1StringHolder).html(guess + " &nbsp;" + result);
        player1ResultIndex++;
    }
    else if (whoGuessed == 2) {
        var result = "";
        for (var i = 0; i < bullCounter; i++) {
            result += "<img id='bull' src='data/plus.png' />&nbsp;";
        }
        for (var i = 0; i < hitCounter; i++) {
            result += "<img id='hit' src='data/minus.jpg' />&nbsp;";
        }
        $(res2StringHolder).html(guess + " &nbsp;" + result);
        player2ResultIndex++;
    }
    if (player1ResultIndex == 16 && player2ResultIndex == 16) {
        clearInterval(checkGuess1Interval);
        clearInterval(checkGuess2Interval);
        clearInterval(timer1Interval);
        clearInterval(timer2Interval);
        $('#timer1').html("טיימר");
        $('#timer2').html("טיימר");
        lose();
    }
    if (bullCounter == 4) {
        clearInterval(checkGuess1Interval);
        clearInterval(checkGuess2Interval);
        clearInterval(timer1Interval);
        clearInterval(timer2Interval);
        $('#timer1').html("טיימר");
        $('#timer2').html("טיימר");
        victory(whoGuessed);
    }
}

function victory(whoGuessed) {
    $('#guesslbl1').hide();
    $('#firstPlayerGuess').hide();
    $('#theGuess1Chose').hide();
    $('#sendGuess1').hide();
    $('#guesslbl2').hide();
    $('#secondPlayerGuess').hide();
    $('#theGuess2Chose').hide();
    $('#sendGuess2').hide();
    $('#show1').hide();
    $('#show2').hide();
    $('#theNumber1Chose').show();
    $('#theNumber2Chose').show();
    $('#theNumber1Chose').html(num1);
    $('#theNumber2Chose').html(num2);
    $('#numlbl1').show();
    $('#numlbl2').show();
    $('#lost1').hide();
    $('#lost2').hide();
    if (whoGuessed == 1) {
        $('#win1').show();
    }
    else if (whoGuessed == 2) {
        $('#win2').show();
    }
}

function lose() {
    $('#guesslbl1').hide();
    $('#firstPlayerGuess').hide();
    $('#theGuess1Chose').hide();
    $('#sendGuess1').hide();
    $('#guesslbl2').hide();
    $('#secondPlayerGuess').hide();
    $('#theGuess2Chose').hide();
    $('#sendGuess2').hide();
    $('#lost1').show();
    $('#lost2').show();
    $('#show1').hide();
    $('#show2').hide();
    $('#theNumber1Chose').show();
    $('#theNumber2Chose').show();
    $('#theNumber1Chose').html(num1);
    $('#theNumber2Chose').html(num2);
    $('#numlbl1').show();
    $('#numlbl2').show();
}

function startAgain() {
    clearInterval(timer1Interval);
    clearInterval(timer2Interval);
    clearInterval(checkGuess1Interval);
    clearInterval(checkGuess2Interval);
    $('#timer1').html("טיימר");
    $('#timer2').html("טיימר");
    $('#show1').hide();
    $('#theNumber1Chose').html("");
    $('#theNumber1Chose').hide();
    $('#hide1').hide();
    $('#numlbl1').show();
    $('#firstPlayerNumber').show();
    $('#firstPlayerNumber').val("");
    $('#btnPlayer1').show();
    $('#show2').hide();
    $('#theNumber2Chose').html("");
    $('#theNumber2Chose').hide();
    $('#hide2').hide();
    $('#numlbl2').show();
    $('#secondPlayerNumber').show();
    $('#secondPlayerNumber').val("");
    $('#btnPlayer2').show();
    $('#guesslbl1').hide();
    $('#firstPlayerGuess').hide();
    $('#theGuess1Chose').hide();
    $('#sendGuess1').hide();
    $('#guesslbl2').hide();
    $('#secondPlayerGuess').hide();
    $('#theGuess2Chose').hide();
    $('#sendGuess2').hide();
    $('#firstPlayerGuess').val("");
    $('#secondPlayerGuess').val("");
    $('.results').html("");
    $('#roll1').hide();
    $('#roll2').hide();
    $('#rolled1').html("");
    $('#rolled2').html("");
    $('#win1').hide();
    $('#win2').hide();
    $('#lost1').hide();
    $('#lost2').hide();
    player1ChoseNum = false;
    player2ChoseNum = false;
    player1Guessed = false;
    player2Guessed = false;
    player1ResultIndex = 1;
    player2ResultIndex = 1;
    rolled1 = false;
    rolled2 = false;
}