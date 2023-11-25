
/////////////////////////////////////////도움말 이미지/////////////////////////////////////////////
function help(){
    document.querySelector('.helpDIV').style.display = "block";
}

function hide_img(){
    document.querySelector('.helpDIV').style.display = "none";
}


/////////////////////////////////////////웹 새로고침///////////////////////////////////////
function reload(){
    location.reload();
}

/////////////////////////////////////////검색 옵션 선택에 따른 힌트 변경//////////////////////////
function search_select_change(event){
    var search_setting_input = document.querySelector('.search_setting_input');
    if(event.value=="내용") search_setting_input.placeholder = '여기에 검색할 내용을 입력하세요';
    else search_setting_input.placeholder = 'ex) 년도-월-일-시간-분';
}

////////////////////////////////////////웹 페이지 날짜 초기 설정/////////////////////////////////////////
update_year(document.querySelector(".year_select"));
update_month(document.querySelector(".month_select"));

function base_update_days(){
    update_days(document.querySelector(".day_select"), document.querySelector(".month_select"), document.querySelector(".year_select"));
}

////////////////////////////////////////날짜 옵션 설정/////////////////////////////////////////////////////        
function checkmonth(){
    if(document.querySelector('.month_select').value==""){
        alert("달(월)을 선택하고 선택할 수 있습니다.");
        document.querySelector('.month_select').focus();
        return;
    }
}

function update_year(year_select){
    var currentYear = new Date().getFullYear();
    var startYear = currentYear - 5;

    for (var i = startYear; i <= currentYear + 20; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i + "년";
        year_select.appendChild(option);
    }
}

function update_month(month_select){
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i + "월";
        month_select.appendChild(option);
    }
}

function update_days(day_select ,month_select, year_select) {
    var temp = day_select.value;

    var options = day_select.querySelectorAll("option");
    options.forEach(function(event){
        event.remove();
    });

    var day = document.createElement("select");
    var dayoption = document.createElement("option");
    day.className = "day_select";

    var option = document.createElement("option");
    option.value = "";
    option.text = "일";
    option.disabled = true;
    option.selected = true;
    option.hidden = true;
    day_select.appendChild(option);


    var dayMAXselect = 31;
    if (month_select.value == "") dayMAXselect = 0;
    else if (month_select.value == "2"){
        dayMAXselect = 28;
        if ((year_select.value % 4 == 0 && year_select.value % 100 != 0) || year_select.value % 400 == 0) dayMAXselect = 29; // 윤년을 고려
    }
    else if (month_select.value == "4") dayMAXselect = 30;
    else if (month_select.value == "6") dayMAXselect = 30;
    else if (month_select.value == "9") dayMAXselect = 30;
    else if (month_select.value == "11") dayMAXselect = 30;

    for (var i = 1; i <= dayMAXselect; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i + "일";
    day_select.appendChild(option);
    }

    if(temp>dayMAXselect)temp=dayMAXselect;
    day_select.value = temp;
}


function checkEnterKey(event, input, validationFunction) {
    if (event.key === "Enter") {
        validationFunction(input);
        input.blur(); // 포커스 해제
    }
}
////////////////////////////////////////////////시간 유효성 검사 통합//////////////////////////////////////
function validateInputFields(hourInput, minuteInput) {
    if(validateHour(hourInput)==false&&validateMinute(minuteInput)==false)return true;
    else return false;
}

////////////////////////////////////////////////시간 유효성 검사////////////////////////////////////////////////////////////////////////////////////        
function validateHour(input) {
    var value = input.value.trim(); // 입력 값의 앞뒤 공백 제거
    if(value==""){
        input.value = "";
        alert("시간 값이 비어있습니다");
        input.focus();
    }

    else if (value.length > 2) {
        input.value = ""; // 잘못된 입력인 경우 값 초기화
        alert("2자리를 넘기면 안됩니다.");
    }
    else if (isNaN(value) || value < 0 || value > 23) {
        input.value = ""; // 잘못된 입력인 경우 값 초기화
        alert("23이 최대입니다.");
    }

    else return false; 
    return true;
}

function validateMinute(input) {
    var value = input.value.trim(); // 입력 값의 앞뒤 공백 제거
    if(value==""){
        input.value = "";
        alert("분 값이 비어있습니다");
        input.focus();
    }

    else if (value.length > 2) {
        input.value = ""; // 잘못된 입력인 경우 값 초기화
        alert("2자리를 넘기면 안됩니다.");
    } 
    else if (isNaN(value) || value < 0 || value > 59) {
        input.value = ""; // 잘못된 입력인 경우 값 초기화
        alert("59가 최대입니다.");
    }
    
    else return false; 
    return true;
}


//////////////////////////////메인 리스트 구조체 정의/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainlist = [];

function information(yeardate, monthdate, daydate, hourdate, minutedate, textBOXdate){
    this.serialNumber = create_serialNumber();
    this.yeardate = yeardate;
    this.monthdate = monthdate;
    this.daydate = daydate;
    this.hourdate = hourdate;
    this.minutedate = minutedate;
    this.editbuttonclickTF = false;
    
    this.textBOXdate = textBOXdate;
}

//////////////////////////시리얼 넘버 생성기 + 중복 검사기///////////////////////////////////////////////////////////////////////////////
function create_serialNumber() {
    var n, c;
    while (1) {
        n = Math.floor(Math.random() * 10000);
        c = 0;
        for (var i = 0; i < mainlist.length; i++) {
            if (mainlist[i].serialNumber == n){
                c=1;
                break;
            }
        }
        if (c == 0) break;
    }
    return n;
}
///////////////////////////////시간객체에서 통합시간 뽑기///////////////////////////////////////////////////////////////
function decidetotaltime(j) {
    var selectyear = mainlist[j].yeardate; 
    var selectmonth = mainlist[j].monthdate;
    var selectday = mainlist[j].daydate;
    var selecthour = mainlist[j].hourdate;
    var selectminute = mainlist[j].minutedate;

    var currentDate = new Date(); // 현재 날짜와 시간
    var selecttime = new Date(selectyear, selectmonth -1, selectday, selecthour, selectminute);

    var total = (selecttime - currentDate) / 1000;
    if(total < 0) return "시간이 오버되었습니다.";

    var day = Math.floor(total / (60 * 60 * 24));
    var hour = Math.floor(total / (60 * 60) % 24);
    var minute = Math.floor(total / 60 % 60);

    var year = Math.floor(day / 365);
    day=day % 365;

    var monthdata = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if((selectyear % 4 == 0 && selectyear % 100 != 0) || selectyear % 400 == 0) monthdata[1] = 29;
    
    var month = 0;
    var sum = 0;
    var i=currentDate.getMonth();
    while(1){
        sum += monthdata[i-1];
        if(sum>day){
            sum = sum - monthdata[i-1];
            break;
        }
        month++;
        i++;

        if(i>11)i=1;
    }
    day = day - sum;

//            console.log(year + "년, " + month + "개월, " + day + "일, " + hour + "시간, " + minute + "분");

    var printvalue = 0;
    if(year<=0) printvalue = 1;
    if(year<=0&&month<=0) printvalue = 2;
    if(year<=0&&month<=0&&day<=0) printvalue = 3;
    if(year<=0&&month<=0&&day<=0&&hour<=0) printvalue = 4;

    if(printvalue==1) return month + "개월, " + day + "일, " + hour + "시간, " + minute + "분 남았습니다.";
    else if(printvalue==2)return day + "일, " + hour + "시간, " + minute + "분 남았습니다.";
    else if(printvalue==3)return hour + "시간, " + minute + "분 남았습니다.";
    else if(printvalue==4)return minute + "분 남았습니다.";
    else return year + "년, " + month + "개월, " + day + "일, " + hour + "시간, " + minute + "분 남았습니다.";
}

/////////////////////////////////검색 기능(버튼 클릭 포함)////////////////////////////////////////////////////////////////////////////////////////////////
function searchEnter(event){
    if(event.key=="Enter"){
        search_button_click();
    }
}

var viewer_mainlist = [];
var mode=1;// 1-전체 모드 2- 기간모드 3- 내용 모드
var search_setting_select;
var search_setting_input;

var search_input;

var search_date;
var search_year;
var search_month;
var search_day;
var search_hour;
var search_minute;

function change_str_num(data){
    return Number(String(data).trim());
}

function search_button_click(){
    mode=1;// 1-전체 모드 2- 기간모드 3- 내용 모드
    search_setting_select = document.querySelector('.search_setting_select');
    search_setting_input = document.querySelector('.search_setting_input');
    console.log("setting input 값", search_setting_input.value);
    console.log("setting input 값", search_setting_select.value);
    
    if(search_setting_select.value == "기간"){
        search_input = document.querySelector('.search_setting_input');

        search_date = search_input.value.split('-');
        search_year = change_str_num(search_date[0]);
        search_month = change_str_num(search_date[1]);
        search_day = change_str_num(search_date[2]);
        search_hour = change_str_num(search_date[3]);
        search_minute = change_str_num(search_date[4]);

        function empty(){
            currentYear = new Date().getFullYear();
            if(String(search_year).length<=2)search_year = search_year + (Math.floor(currentYear/100))*100;

            if(search_year==0||isNaN(search_year)||String(search_year).length!=4){
                alert('년도가 잘못되었습니다. (2자리나 4자리로 입력하세요)');
                search_input.focus();
                return false;
            }
            if(search_month==0||isNaN(search_month)||!(search_month>=1&&search_month<=12)){
                alert('월(달)이 잘못되었습니다. (1 ~ 12)');
                search_input.focus();
                return false;
            }

            var monthdata = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if((search_year % 4 == 0 && search_year % 100 != 0) || search_year % 400 == 0) monthdata[1] = 29;

            if(search_day==0||isNaN(search_day)||!(search_day>0&&search_day<=monthdata[search_month-1])){
                alert('일이 잘못되었습니다. (1 ~' + monthdata[search_month-1] + ')');
                search_input.focus();
                return false;
            }
            if(search_hour==0||isNaN(search_hour)||!(search_hour>=0&&search_hour<24)){
                alert('시간이 잘못되었습니다. (0 ~ 23)');
                search_input.focus();
                return false;
            }
            if(search_minute==0||isNaN(search_minute)||!(search_minute>=0&&search_minute<60)){
                alert('분이 잘못되었습니다. (0 ~ 59)');
                search_input.focus();
                return false;
            }
            return true;
        }

        if(search_input.value.trim()=="") mode=1;

        else if(!(search_input.value.includes('-'))){
                alert('올바른 형식으로 입력해주세요.');
                search_input.focus();
                search_input.value="";
                mode=1;
            }

        else if(empty()==false){
            console.log("기간 - 비어있거나 제대로 입력이 안되었습니다.");
            mode=1;
        }
        else mode=2;
    }
    else if(search_setting_select.value == "내용"){
        if(search_setting_input.value.trim()=="")mode=1;
        else mode=3;
    }           
    list_viewer();
}
////////////////////////////////인터페이스 재생성(보여주기)//////////////////////////////////////////////////////////////////////////////////////////////
function list_viewer(){
    dataSave();   
    console.log('list뷰어 실행');
    console.log("mode"+ mode);
    viewer_mainlist = [];
    if(mode==1)viewer_mainlist = [...mainlist]; //전체모드
    else if(mode==2){ //기간모드
        var standard_tiem;
        for(var i=0;i<mainlist.length;i++){
            standard_tiem = new Date(search_year, search_month, search_day, search_hour, search_minute);
            comparison_time = new Date(mainlist[i].yeardate, mainlist[i].monthdate, mainlist[i].daydate, mainlist[i].hourdate, mainlist[i].minutedate);

            console.log(standard_tiem-comparison_time);
            if(standard_tiem-comparison_time>=0){
                viewer_mainlist.push(mainlist[i]);
            }
        }
    }
    else if(mode==3){ //내용모드
        for(var i=0;i<mainlist.length;i++){
            if(mainlist[i].textBOXdate.includes(search_setting_input.value)){
                viewer_mainlist.push(mainlist[i]);
                console.log("검색기능 실행", mainlist[i]);
            }
        }
    }


    document.getElementById("memolist").remove();
    var memolist = document.createElement("div");
    memolist.id = "memolist";
    memolist.className = "memolistdesign";
    document.querySelector('.backgroundmain').appendChild(memolist);

    var total_menu_DIV; // 모든 메뉴 통합한 DIV
    var textareBOX; // 시간바 메뉴 밑에 있는 메모장
    var linemenu_DIV; // 아래 메뉴들을 한줄에 묶어주는 div
    var total_time_DIV; //통합 시간 div
    var total_time; //통합 시간
    var button_container; //통합 버튼 div
    var deletebutton; // 삭제 버튼
    var editbutton; // 수정 버튼

    for(var i=0; i<viewer_mainlist.length; i++){
        total_menu_DIV = document.createElement("div"); // 모든 메뉴 통합 DIV
        total_menu_DIV.className = "total_menu_DIV";
        total_menu_DIV.dataset.value = viewer_mainlist[i].serialNumber;
        memolist.appendChild(total_menu_DIV);

        linemenu_DIV = document.createElement("div"); // 라인 메뉴 통합 DIV
        linemenu_DIV.className = "linemenu_DIV";
        total_menu_DIV.appendChild(linemenu_DIV);

        total_time_DIV = document.createElement("div"); // 통합 시간 DIV
        total_time_DIV.className = "total_time_DIV";
        linemenu_DIV.appendChild(total_time_DIV);

        total_time = document.createElement("input"); // 통합 시간
        total_time.className = "total_time";
        total_time.value = decidetotaltime(i);
        total_time.readOnly = true;
        total_time_DIV.appendChild(total_time);


        var exact_time_DIV = document.createElement("div");
        exact_time_DIV.className = "exact_time_DIV";

            var year = document.createElement("select");
            var yearoption = document.createElement("option");
            year.className = "year_select";
            exact_time_DIV.appendChild(year);
            yearoption.disabled = true;
            yearoption.selected = true;
            yearoption.hidden = true;
            yearoption.value = viewer_mainlist[i].yeardate;
            yearoption.textContent = viewer_mainlist[i].yeardate + "년";
            update_year(year);
            year.appendChild(yearoption);


            var month = document.createElement("select");
            var monthoption = document.createElement("option");
            month.className = "month_select";
            exact_time_DIV.appendChild(month);
            monthoption.disabled = true;
            monthoption.selected = true;
            monthoption.hidden = true;
            monthoption.value = viewer_mainlist[i].monthdate;
            monthoption.textContent = viewer_mainlist[i].monthdate + "월";
            update_month(month);
            month.appendChild(monthoption);

            
            var day = document.createElement("select");
            var dayoption = document.createElement("option");
            day.className = "day_select";
            exact_time_DIV.appendChild(day);
            dayoption.disabled = true;
            dayoption.selected = true;
            dayoption.hidden = true;
            dayoption.value = viewer_mainlist[i].daydate;
            dayoption.textContent = viewer_mainlist[i].daydate + "일";
            day.appendChild(dayoption);
            update_days(day ,month, year);

            month.addEventListener('change',function(){
                update_days(day ,month, year);
            });
            year.addEventListener('change',function(){
                update_days(day ,month, year);
            });


            var hour = document.createElement("input");
            hour.className = "time hour_input";
            hour.style.width = "45px";
            hour.value = viewer_mainlist[i].hourdate;
            hour.onkeydown = function(event){
                checkEnterKey(event, this, validateHour);
            };
            exact_time_DIV.appendChild(hour);

            var minute = document.createElement("input");
            minute.className = "time minute_input";
            minute.style.width = "45px";
            minute.value = viewer_mainlist[i].minutedate;
            minute.onkeydown = function(event){
                checkEnterKey(event, this, validateMinute);
            };
            exact_time_DIV.appendChild(minute);

        total_time_DIV.appendChild(exact_time_DIV);


        button_container = document.createElement("div");//버튼 컨테이너
        button_container.className = "button_container";
        linemenu_DIV.appendChild(button_container);
        

        editbutton = document.createElement("button"); // 수정 버튼
        editbutton.className = "editbutton";
        if(viewer_mainlist[i].editbuttonclickTF==false){
            editbutton.innerText = "수정";
            total_time.style.display = "flex";
            exact_time_DIV.style.display = "none";
        }
        else if(viewer_mainlist[i].editbuttonclickTF==true){
            editbutton.innerText = "저장"; 
            total_time.style.display = "none";
            exact_time_DIV.style.display = "flex";
        }
        button_container.appendChild(editbutton);


        deletebutton = document.createElement("button"); //삭제 버튼
        deletebutton.className = "deletebutton"; 
        deletebutton.innerText = "삭제";
        button_container.appendChild(deletebutton);

        textareBOX = document.createElement("textarea"); // 텍스트 박스
        textareBOX.value = viewer_mainlist[i].textBOXdate;
        textareBOX.className = "textareaBOX";
        total_menu_DIV.appendChild(textareBOX);

//                console.log(year.value + "/" + month.value + "/" + day.value + "/" + hour.value + "/" + minute.value + "/" + textareBOX.value);
    }


/////////////////////////////////////////////////버튼 트리거///////////////////////////////////////////////////////////            
    var clicked_deletebutton = document.querySelectorAll('.deletebutton');

    clicked_deletebutton.forEach(function(button) {
        button.addEventListener('click', function(event) {
            deletebuttonclick(event.target.parentElement.parentElement.parentElement.dataset.value);
        });
    });


    var clicked_editbutton = document.querySelectorAll('.editbutton');
                
    clicked_editbutton.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var year_adress=event.target.parentElement.parentElement.querySelector('.total_time_DIV').querySelector('.exact_time_DIV').querySelector('.year_select');
            var month_adress=event.target.parentElement.parentElement.querySelector('.total_time_DIV').querySelector('.exact_time_DIV').querySelector('.month_select');
            var day_adress=event.target.parentElement.parentElement.querySelector('.total_time_DIV').querySelector('.exact_time_DIV').querySelector('.day_select');

            var hour_adress=event.target.parentElement.parentElement.querySelector('.total_time_DIV').querySelector('.exact_time_DIV').querySelector('.hour_input');
            var minute_adress=event.target.parentElement.parentElement.querySelector('.total_time_DIV').querySelector('.exact_time_DIV').querySelector('.minute_input');
            editbuttonclick(event.target.parentElement.parentElement.parentElement.dataset.value, year_adress, month_adress, day_adress, hour_adress, minute_adress);
        });
    });



///////////////////////////////////////////////////input 값 검사//////////////////////////////////////////////////////////////////////////////
    var check_timeDIV = document.querySelectorAll('.exact_time_DIV');
    
    var day_adress_copy;
    var month_adress_copy;

    check_timeDIV.forEach(function(list){
        var check_minuteinput = list.querySelector('.minute_input');
        check_minuteinput.addEventListener('change', function(event){
            check_input(event);
        });
    
        var check_hourinput = list.querySelector('.hour_input');
        check_hourinput.addEventListener('change', function(event) {
            check_input(event);
        });

        var check_year = list.querySelector('.year_select');
        check_year.addEventListener('change', function(event){
            check_input(event);
        });
    
        var check_month = list.querySelector('.month_select');
        check_month.addEventListener('change', function(event) {
            check_input(event);
        });

        var check_day = list.querySelector('.day_select');
        check_day.addEventListener('change', function(event) {
            check_input(event);
        });

    });

    function check_input(event){
        console.log("시간 값이 수정되었습니다");
        var year_adress=event.target.parentElement.parentElement.querySelector('.exact_time_DIV').querySelector('.year_select');
        var month_adress=event.target.parentElement.parentElement.querySelector('.exact_time_DIV').querySelector('.month_select');
        var day_adress=event.target.parentElement.parentElement.querySelector('.exact_time_DIV').querySelector('.day_select');

        var hour_adress=event.target.parentElement.parentElement.querySelector('.exact_time_DIV').querySelector('.hour_input');
        var minute_adress=event.target.parentElement.parentElement.querySelector('.exact_time_DIV').querySelector('.minute_input');

        if(validateInputFields(hour_adress, minute_adress)!=true)return;
        else {
            var event_serialNumber=event.target.parentElement.parentElement.parentElement.parentElement.dataset.value;
            console.log(event_serialNumber);
            for(var i=0;i<mainlist.length;i++){
                if(mainlist[i].serialNumber == event_serialNumber){
                    mainlist[i].yeardate=year_adress.value;
                    mainlist[i].monthdate=month_adress.value;
                    mainlist[i].daydate=day_adress.value;
                    
                    mainlist[i].hourdate=hour_adress.value;
                    mainlist[i].minutedate=minute_adress.value;
                    console.log("현재 입력되어 있는 일 :" + day_adress.value + " " + day.value);
                }
            }
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

textareaRefresh();
}///list viewr 마지막 {}

////////////////////////////////삭제 버튼 클릭 시///////////////////////////////////////////////////////////////////////////////////////////////
function deletebuttonclick(findserialNumber){
    var TF=false;
    for(var i=0; i<mainlist.length; i++){
        if(findserialNumber==mainlist[i].serialNumber){
            mainlist.splice(i, 1);
            TF=true;
            break;
        }
    }
    if(TF==false)console.log("error.메인 리스트에서 삭제할 값을 찾질 못했습니다");
    list_viewer();
}

////////////////////////////////수정 버튼 클릭 시////////////////////////////////////////////////////////////////////////////////////////
function editbuttonclick(findserialNumber, year_adress, month_adress, day_adress, hour_adress, minute_adress){
    for(var i=0; i<mainlist.length; i++){
        if(findserialNumber==mainlist[i].serialNumber){
            editbuttonclickCheck(i, year_adress, month_adress, day_adress, hour_adress, minute_adress);
            break;
        }
    }
}

function editbuttonclickCheck(i, year_adress, month_adress, day_adress, hour_adress, minute_adress){
    if(mainlist[i].editbuttonclickTF==false){//통합모드 - > 시간모드
        mainlist[i].editbuttonclickTF=true;
    }

    else if(mainlist[i].editbuttonclickTF==true){//시간모드 - > 통합모드
        if(validateInputFields(hour_adress, minute_adress)!=true)return;
        mainlist[i].yeardate=year_adress.value;
        mainlist[i].monthdate=month_adress.value;
        mainlist[i].daydate=day_adress.value;
        mainlist[i].hourdate=hour_adress.value;
        mainlist[i].minutedate=minute_adress.value;

        mainlist[i].editbuttonclickTF=false;
    }
    list_viewer();
}

//////////////////////////////요소 추가////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var addButton = document.getElementById("add_button");//내용 추가 버튼 클릭 이벤트

addButton.addEventListener("click", function() {
    var year = document.getElementsByClassName("year_select")[0];
    var month = document.getElementsByClassName("month_select")[0];
    var day = document.getElementsByClassName("day_select")[0];
    var hour = document.getElementsByClassName("hour_input")[0];
    var minute = document.getElementsByClassName("minute_input")[0];
    var textBOX = document.querySelector(".memo_box");

    if(year.value==""||month.value==""||day.value==""){
        if(year.value==""){
            alert("년도를 선택하지 않았습니다.");
            year.focus();
        }
        else if(month.value==""){
            alert("달(월)을 선택하지 않았습니다.");
            month.focus();
        }
        else if(day.value==""){
            alert("날짜를 선택하지 않았습니다.");
            day.focus();
        }
        return;
    }
    if(validateInputFields(hour, minute)!=true)return;
    if(textBOX.value==""){
        alert("메모에 아무것도 입력이 되어있지 않습니다.");
        textBOX.focus();
        return;
    }


    mainlist.push(new information(year.value, month.value, day.value, hour.value, minute.value, textBOX.value));          
    list_viewer();
});

//////////////////////////////////텍스트 박스 내용 수정///////////////////////////////////////////////////////////////////////////
function textareaRefresh(){

    var textarealist = document.querySelectorAll(".textareaBOX");
    textarealist.forEach(function(text) {
        text.addEventListener('change', function(event) {
            for(var i=0; i<mainlist.length; i++){ 
                if(event.target.parentElement.dataset.value == mainlist[i].serialNumber){
//                            console.log(event.target.parentElement.dataset.value);
                    console.log("텍스트 박스 내용 수정되었습니다");
                    mainlist[i].textBOXdate = event.target.value;
                }
            }
        });
    });
}

////////////////////////////////정렬 기능////////////////////////////////////////////////////

function bigger(a, b){
    var atime = new Date(a.yeardate, a.monthdate, a.daydate, a.hourdate, a.minutedate);
    var btime = new Date(b.yeardate, b.monthdate, b.daydate, b.hourdate, b.minutedate);
    
    if(atime-btime>0)return true;
    
    return false;
}


function auto_sort(){
    var provisional_information;
    for(var i=0;i<mainlist.length;i++){
        for(var j=0;j<mainlist.length-i-1;j++){
            if(mainlist[j].serialNumber>mainlist[j+1].serialNumber){
                provisional_information=mainlist[j];
                mainlist[j]=mainlist[j+1];
                mainlist[j+1]=provisional_information;
            }
        }
    }

    for(var i=0;i<mainlist.length;i++){
        for(var j=0;j<mainlist.length-i-1;j++){
            if(bigger(mainlist[j], mainlist[j+1])){
                provisional_information=mainlist[j];
                mainlist[j]=mainlist[j+1];
                mainlist[j+1]=provisional_information;
            }
        }
    }

    console.log(mainlist[0]);
    console.log(mainlist[1]);
    console.log(mainlist[2]);
}

////////////////////////////오름차 순 버튼 클릭////////////////////////////////////////////////
document.getElementById('ascending_order').addEventListener('click', function() {

    auto_sort();
    search_button_click();
});
///////////////////////////내림차 순 버튼 클릭//////////////////////////////////////////////////
document.getElementById('descending_order').addEventListener('click', function() {
    
    auto_sort();
    mainlist.reverse();
    search_button_click();
});
//////////////////////자동 시간 새로고침/////////////////////////////////////////////
function total_time_refresh(){
    var total_time_targets = document.querySelectorAll('.total_time');
    total_time_targets.forEach(function(timetarget){
        for(var i=0; i<mainlist.length; i++){
            if(timetarget.parentElement.parentElement.parentElement.dataset.value==mainlist[i].serialNumber){
                timetarget.value = decidetotaltime(i);
            }
        }
    });
}

setInterval(total_time_refresh, 1000);

//////////////////////////////데이터 베이스/////////////////////////////////////////
var ID = "ldj5098";

function dataSave() {
    // 서버로 데이터 전송
    fetch("save_data.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "ID=" + ID + "&mainlist=" + JSON.stringify(mainlist),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("네트워크 응답이 올바르지 않습니다");
            }
            console.log("데이터 전송 및 저장 성공");
        })
        .catch((error) => {
            console.error("dataSave 중 오류 발생:", error);
        });
}

function dataLoad() {
    // 서버에서 데이터 불러오기
    fetch("load_data.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "ID=" + ID,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("네트워크 응답이 올바르지 않습니다");
            }
            return response.json();
        })
        .then((data) => {
            mainlist = data;
            console.log("데이터 불러오기 성공:", mainlist);
            // 여기서 mainlist를 사용하여 필요한 작업을 수행
        })
        .catch((error) => {
            console.error("dataLoad 중 오류 발생:", error);
        });
}

dataLoad();
