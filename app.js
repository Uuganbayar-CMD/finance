//дэлгэцтэй ажиллах 
var uiController = (function(){

})();

//санхүүтэй ажиллах контроллер
var financeController =(function(){})();

//програмын холбогч контроллер
var appController = (function(uiController, financeController){
    var ctrlAddItem = function(){
        //1. Оруулах өгөгдлийг дэлгэцнээс авна
        console.log('delgetsnees ugugdul awah heseg')
       //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
       //3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана
       //4.Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана


    }
    document.querySelector('.add__btn').addEventListener('click',function(){
       
    });

    document.addEventListener("keypress",function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }else{
            console.log('uur tovch darsn bna');
        }
    });
    
    
})(uiController,financeController);