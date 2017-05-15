function showNumberWithAnimation(randx, randy, randNumber) {


    var NumberCell = $('#number-cell-' + randx + '-' + randy);

    NumberCell.css('background-color', getNumberBackgroundColor(randNumber));
    NumberCell.css('color', getNumberColor(randNumber));
    NumberCell.text(randNumber);

    NumberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(randx, randy),
        left: getPosLeft(randx, randy)
    }, 50)

}

function showMoveAnimation(fromx,fromy,tox,toy){
    
    var  numberCell = $('#number-cell-'+fromx+'-'+fromy);
    
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },100);
    
    
    
}

function updateScore(score){
    
    $("#score").text(score);    
}
