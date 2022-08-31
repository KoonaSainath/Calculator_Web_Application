const textResult = document.getElementById('result');

let buttons = document.querySelectorAll('.calcButton');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculate(button.innerText);
    });
});

function calculate(text){
    if(isNaN(text)){
        let existingText = textResult.value;
        existingText = existingText.replace('x', '*');
        if(existingText != ''){
            if(text == '1/x'){
                let result = evaluate(existingText);
                if(result != existingText || !(isNaN(result))){
                    textResult.value = 1/Number(result)
                }
            }else if(text == 'x2'){
                let result = evaluate(existingText);
                if(result != existingText || !(isNaN(result))){
                    textResult.value = Math.pow(Number(result), 2);
                }
            }else if(text == '='){
                textResult.value = evaluate(existingText);
            }else if(text == 'BACK'){
                textResult.value = textResult.value.substring(0,textResult.value.length-1);
            }else if(text == 'AC'){
                textResult.value = '';
            }else if(text == '.'){
                if(textResult.value.includes('+')){
                    let parts = textResult.value.split('+');
                    if(!parts[1].includes('.')){
                        textResult.value = textResult.value + text;
                    }
                }else if(textResult.value.includes('-')){
                    let parts = textResult.value.split('-');
                    if(!parts[1].includes('.')){
                        textResult.value = textResult.value + text;
                    }
                }else if(textResult.value.includes('x')){
                    let parts = textResult.value.split('x');
                    if(!parts[1].includes('.')){
                        textResult.value = textResult.value + text;
                    }
                }else if(textResult.value.includes('/')){
                    let parts = textResult.value.split('/');
                    if(!parts[1].includes('.')){
                        textResult.value = textResult.value + text;
                    }
                }else{
                    if(!textResult.value.includes('.')){
                        textResult.value = evaluate(existingText) + text;
                    }
                }
            }else if(text == '+' || text == '-' || text == 'x' || text == '/'){
                if(!(existingText[existingText.length-1] == '+' || existingText[existingText.length-1] == '-' || existingText[existingText.length-1] == 'x' || existingText[existingText.length-1] == '/')){
                    textResult.value = evaluate(existingText) + text;
                }
            }
            else{
                textResult.value = evaluate(existingText) + text;
            }
        }
    }else{
        textResult.value += text;
    }
}

function evaluate(text){
    try{
        let result = eval(text);
        return result;
    }catch(e){
        return text;
    }
}

document.addEventListener('keydown', (event) => {
    const allKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.', '=', 'Backspace'];
    if(allKeys.includes(event.key)){
        if(event.key == '*'){
            calculate('x');
        }else if(event.key == 'Backspace'){
            calculate('BACK');
        }else{
            calculate(event.key);
        }
    }
});
