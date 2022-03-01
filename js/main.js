(function(DOM, doc) {
    'use strict';

    /*
    Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
    coluna na tabela, com um botão de remover.
    Ao clicar nesse botão, a linha da tabela deve ser removida.
    Faça um pull request no seu repositório, na branch `challenge-31`, e cole
    o link do pull request no `console.log` abaixo.
    Faça um pull request, também com a branch `challenge-31`, mas no repositório
    do curso, para colar o link do pull request do seu repo.
    */
  
    var ajax = new XMLHttpRequest();
    ajax.open('GET', './data/company.json');
    ajax.send()

    var $companyName = doc.querySelector('[data-js="companyName"]');
    var $inputs = new DOM('[data-js="entryData"]');
    var $table = doc.querySelector('[data-js="table"]');
    var $submit = doc.querySelector('[data-js="registerButton"]');

    function app(){
        return {
            init: function(){
                addCompanyName();
                $submit.addEventListener('click', addCarFunction, false);
            }
        };
    }

    function addCompanyName(){
        ajax.addEventListener('readystatechange', function(){
            if(requestOk())
                $companyName.textContent = JSON.parse(ajax.responseText).name + ' ' + 
                                           JSON.parse(ajax.responseText).phone;
        }, false)
    }

    function requestOk(){
        return ajax.status === 200 && ajax.readyState === 4;
    }

    function addCarFunction(event){
        event.preventDefault();
        var newItem = createNewItem();
        $table.appendChild(newItem);
        clearFields();
    }

    function createNewItem(){
        var $row = doc.createElement('tr');
        var $td = doc.createElement('td');
        $inputs.element.forEach(function(input, index){
            var tdClone = $td.cloneNode(false);
            if (index === 0){
                tdClone.appendChild(addImage(input.value));
                $row.appendChild(tdClone);
                return;
            }
            tdClone.innerHTML = input.value;
            $row.appendChild(tdClone);
        });
        var removeButton = doc.createElement('button');
        console.log(removeButton);
        removeButton.textContent = 'Deletar';
        $td.appendChild(removeButton);
        $row.appendChild($td);
        return $row;
    }

    function addImage(url){
        var newImg = doc.createElement('img');
        newImg.src = url;
        return newImg;
    }

    function clearFields(){
        $inputs.element.forEach(function(input){
            input.value = '';
        });
    }

    app().init();
  
  })(window.DOM, document);