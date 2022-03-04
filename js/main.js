(function(DOM, doc) {
    'use strict';
  
    var ajax = new XMLHttpRequest();
    ajax.open('GET', './data/company.json');
    ajax.send()

    var $companyName = doc.querySelector('[data-js="companyName"]');
    var $inputs = new DOM('[data-js="entryData"]');
    var $table = doc.querySelector('[data-js="table"]');
    var $submit = doc.querySelector('[data-js="registerButton"]');
    var $deleteButtons = new DOM();

    function app(){
        return {
            init: function(){
                addCompanyName();
                loadCars();
            }
        };
    }

    function addEventsFunction(){
        $submit.addEventListener('click', addCarFunction, false);
        $deleteButtons.on('click', deleteCar);
        console.log($deleteButtons);
    }

    function addCompanyName(){
        ajax.addEventListener('readystatechange', function(){
            if(requestOk(ajax))
                $companyName.textContent = JSON.parse(ajax.responseText).name + ' ' + 
                                           JSON.parse(ajax.responseText).phone;
        }, false)
    }

    function requestOk(ajax){
        return ajax.status === 200 && ajax.readyState === 4;
    }

    function addCarFunction(event){
        event.preventDefault();
        var newItem = createNewItem();
        postData(newItem);
        updateTable();
        clearFields();
    }

    function postData(item){
        var post = new XMLHttpRequest();
        post.open('POST', 'http://localhost:3000/car/');
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send(item)
    }

    function createNewItem(){
        var image = $inputs.getValueByName("image");
        var brandModel = $inputs.getValueByName("brandModel");
        var year = $inputs.getValueByName("year");
        var plate = $inputs.getValueByName("plate");
        var color = $inputs.getValueByName("color");
        return `image=${image}&brandModel=${brandModel}&year=${year}&plate=${plate}&color=${color}`;
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

    function deleteCar(event){
        event.preventDefault();
        var car = this.parentNode.parentNode;
        car.parentNode.removeChild(car);
    }

    function loadCars(){
        var get = getCars();
        get.addEventListener('readystatechange', function(){
            if (requestOk(get)){
                JSON.parse(get.response).forEach(function(car){
                    addLine(car);
                });
                restartButtons();
                addEventsFunction();
            }
        }, false);
    }

    function updateTable(){
        var get = getCars();
        get.addEventListener('readystatechange', function(){
            if (requestOk(get)){
                var cars = JSON.parse(get.response);
                addLine(cars[cars.length-1]);
                restartButtons();
                addEventsFunction();
            }
        }, false);
    }

    function getCars(){
        var get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/car/')
        get.send()
        return get
    }

    function addLine(car){
        $table.appendChild(createLine(car));
    }

    function createLine(car){
        var row = doc.createElement('tr');
        var tdImg = doc.createElement('td');
        var tdBrandModel = tdImg.cloneNode(false);
        var tdYear = tdImg.cloneNode(false);
        var tdPlate = tdImg.cloneNode(false);
        var tdColor = tdImg.cloneNode(false);
        var tdButton = tdImg.cloneNode(false);

        tdImg.appendChild(addImage(car.image));
        tdBrandModel.textContent = car.brandModel;
        tdYear.textContent = car.year;
        tdPlate.textContent = car.plate;
        tdColor.textContent = car.color;
        tdButton.appendChild(createButton(car.plate));

        row.appendChild(tdImg);
        row.appendChild(tdBrandModel);
        row.appendChild(tdYear);
        row.appendChild(tdPlate);
        row.appendChild(tdColor);
        row.appendChild(tdButton);

        return row;
    }

    function createButton(plate){
        var removeButton = doc.createElement('button');
        removeButton.textContent = 'Deletar';
        removeButton.setAttribute('data-js', 'deleteCar');
        removeButton.setAttribute('name', plate);
        return removeButton;
    }

    function restartButtons(){
        $deleteButtons.restart('[data-js="deleteCar"]');
    }

    app().init();
  
  })(window.DOM, document);