//дэлгэцтэй ажиллах 
var uiController = (function(){

var DOMstrings = {
    inputType : ".add__type",
    inputDescription : ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expense__list"
};

return{
    getInput : function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value:document.querySelector(DOMstrings.inputValue).value

        };
    },
    getDOMstrings: function(){
    return DOMstrings;
    },

    clearFields: function(){
    var fields = document.querySelectorAll(DOMstrings.inputDescription + " " + DOMstrings.inputValue);
        
        var fieldsArr = Array.prototype.slice.call(fields);

        // for(var i=0; i < fieldsArr.length; i++){
        //     fieldsArr[i].value="";
        // }

        fieldsArr.forEach(function(el, index, array){
            el.value = "";
        });

        fieldsArr[0].focus();  
    },

    addListItem : function(item, type){
        //Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
        var html, list;
        if(type === 'inc'){
            list = DOMstrings.incomeList;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }else{
            list = DOMstrings.expenseList;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

        }
        //Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
        html = html.replace('%id%',item.id);
        html = html.replace('$$DESCRIPTION$$',item.description);
        html = html.replace('$$VALUE$$',item.value);

        //Бэлтгэсэн HTML-ЭЭ DOM-руу хийж өгнө
        document.querySelector(list).insertAdjacentHTML('beforeend',html);
    }

};
})();

//санхүүтэй ажиллах контроллер
var financeController =(function(){

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        };

       var data = {
           items: {
               inc:[],
               exp:[]
           },
           totals: {
               inc:0,
               exp:0
           }
       };
       return{
           addItem: function(type, desc, val){
            
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === "inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
           },
           seeData: function(){
           return data;
        }
        };
      
})();

//програмын холбогч контроллер
var appController = (function(uiController, financeController){


    var ctrlAddItem = function(){
        //1. Оруулах өгөгдлийг дэлгэцнээс авна
        var input =uiController.getInput();
       
       //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        var item = financeController.addItem(
            input.type, 
            input.description, 
            input.value
             );
       //3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана
       uiController.addListItem(item, input.type);
       uiController.clearFields();
       //4.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана


    }
  
    var setupEventListeners = function(){
        
        var DOM =uiController.getDOMstrings();
        
        document.querySelector(DOM.addBtn).addEventListener('click',function(){
            ctrlAddItem();
         });
     
         document.addEventListener("keypress",function(event){
             if(event.keyCode === 13 || event.which === 13){
                 ctrlAddItem();
             }else{
                 
             }
         });
    };

    return{
        init: function(){
            
            setupEventListeners();
        }
    }
    
    
})(uiController,financeController);

appController.init();