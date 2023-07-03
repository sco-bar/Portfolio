surnameElement = document.querySelector("#surname");
nameElement = document.querySelector("#name");
checkboxInputElements = document.querySelectorAll("input[type='checkbox']");
labelElements = document.querySelectorAll("label");
nameLabelElements = document.querySelectorAll(".label_p");
spanLabelElements = document.querySelectorAll(".label_span_value");
counterInputElements = document.querySelectorAll("input[name='counter']");
resultElement = document.querySelector(".result");
btnElement = document.querySelector(".btn");
btnTextElement = document.querySelector(".btn_text");

labelElementsArray = Array.from(labelElements);

const order = {
    client: {
        surname: "",
        name: "",
    },
    sum: 0,
};

const menuPositions = {
    positionNumber1: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber2: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber3: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber4: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber5: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber6: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
    positionNumber7: {
        name: "",
        checked: false,
        count: 0,
        value: 0,
    },
};

//сохранение Фамилии и Имени клиента
surnameElement.addEventListener("change", function () {
    order.client.surname = surnameElement.value;
})
nameElement.addEventListener("change", function () {
    order.client.name = nameElement.value;
});


//для каждого наименования из списка меню
labelElementsArray.forEach(label => {

    let i = labelElementsArray.indexOf(label);//номер данной позиции меню label в массиве
    let positionNumberKey = "positionNumber" + String(i + 1);//ключ позиции меню

    //заполняем название в объекте по позиции меню
    menuPositions[positionNumberKey].name = nameLabelElements[i].textContent.split(' р.').join('');

    //заполняем стоимость в наименовании позиции, то есть в <span>
    spanLabelElements[i].textContent = checkboxInputElements[i].value;
    menuPositions[positionNumberKey].value = checkboxInputElements[i].value;

    //обрабка клик на <label>
    label.addEventListener("click", function () {
        if (menuPositions[positionNumberKey].checked) {//если checked, то снимаем флажок и обнуляем количество
            menuPositions[positionNumberKey].checked = false;
            menuPositions[positionNumberKey].count = 0;
            counterInputElements[i].value = 0;
        } else {//иначе ставим флажок и если количество не было еще указано, ставим = 1
            menuPositions[positionNumberKey].checked = true;
            if (menuPositions[positionNumberKey].count == 0) {
                menuPositions[positionNumberKey].count = 1;
                counterInputElements[i].value = 1;
            }
        }
        calculateAmount();
    });
});

//обрабатка изменения в counterInput
const regexp = /^[1-9][0-9]{0,2}$/;
counterInputElements.forEach(counter => {
    counter.addEventListener("change", function () {
        if (regexp.test(counter.value)) {//если в счетчике введено коректное значение, то сохраняем его и расчитываем общую сумму заказа
            menuPositions[counter.dataset.position_id].count = counter.value;
        } else {//если в счетчике введено НЕкоректное значение, то обнуляем счетчик и снимаем флажок с позиции
            menuPositions[counter.dataset.position_id].count = 0;
            counter.value = 0;
            //снимаем флажок с checkboxInput и обновляем статус checked для позиции
            document.getElementById(counter.dataset.position_id).checked = false;
            menuPositions[counter.dataset.position_id].checked = false;
        }
        calculateAmount();
    })
});

//расчет общей суммы заказа
function calculateAmount() {
    let sum = 0;
    for (let key in menuPositions) {
        let inputElement = document.getElementById(key);
        if (menuPositions[key].checked) {
            sum += menuPositions[key].count * menuPositions[key].value;
        }
    }
    //выводим на экран общую сумму заказа
    resultElement.textContent = sum;
    order.sum = sum;
};

//обработка положения мыши над кнопкой
btnElement.addEventListener("mouseover", function() {
    btnTextElement.style.color = "#FFFFFF";
    btnElement.style.background = "#817070";
})

//обработка ухода мыши с кнопки
btnElement.addEventListener("mouseout", function() {
    btnTextElement.style.color = "#817070";
    btnElement.style.background = "#FFFFFF";
})

//обработка клика на кнопку Оформить заказ
btnElement.addEventListener("click", function () {
    let clientText = (order.client.surname != "" || order.client.name != "") ? `Заказчик: ${order.client.surname} ${order.client.name} \n` : "";
    let details = "";
    for (let key in menuPositions) {
        if (menuPositions[key].checked && menuPositions[key].count != 0) {
            details += menuPositions[key].name + "  ------  " + menuPositions[key].count + " шт.  ======  " + menuPositions[key].count*menuPositions[key].value + "р.\n";
        }
    }
    let sumText = `Итого: ${order.sum}р.`;
    alert(clientText + "\n" + details + "\n" + sumText);
});