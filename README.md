body {
    display: flex;
    justify-content: center;
    border: 1px solid black; /* changed */
    background-color: white;
}

body button,
body select {
    cursor: pointer;
    font-weight: bold;
}

body button {
    background-color: white;
}

body input {
    font-weight: bold;
}

.left_align {
    display: flex;
    width: 300px;
    margin-right: 10px;
    margin-left: 30px;
    justify-content: flex-start;
}

.right_align {
    display: flex;
    width: 300px;
    margin-left: 10px;
    margin-right: 30px;
    justify-content: flex-start;
}

.helpbutton {
    margin-left: 800px;
    margin-right: 130px;
    text-align: right;
}

.backgroundmain {
    margin-top: -8px;
    margin-bottom: -8px;
    padding-bottom: 100px;
    background-color: #e7f4ee;
    height: auto;
    width: 900px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    position: relative;
    z-index: 1;
}

.helpDIV {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 2;
    display: none;
}

.helpDIV img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 70%;
    border-style: solid;
    border-radius: 20px;
    border-color: black;
    border-width: 8px;

    box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.327);
}

@font-face {
    font-family: 'Recipekorea';
    src: url('Recipekorea.ttf') format('truetype');
}

.title_logo {
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-family: 'Recipekorea';
    font-weight: bold;
    margin-top: -20px;
    margin-bottom: -75px;
    font-size: 32px;
}

.search_setting {
    width: 800px;
    display: flex;
    justify-content: center;
}

.search_setting_select {
    width: 80px;
    border-radius: 8px;
    padding: 10px 12px;
    margin-right: 10px;
    font-size: 14px;
}

.search_setting_input {
    width: 500px;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    border-width: 1px;
}

.Write_content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 600px;
}

.dropdown select {
    width: auto;
    border-radius: 8px;
    padding: 10px 12px;
    margin-right: 10px;
    font-size: 12px;
}

.time {
    width: auto;
    border-width: 1px;
    border-radius: 8px;
    padding: 10px 12px;
    margin-right: 10px;
    font-size: 12px;
}

.add_contents {
    width: auto;
    border-radius: 8px;
    padding: 10px 12px;
    margin-left: 30px; /* Keep this */
    font-size: 12px;
}

.memo {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.memo_box {
    width: 500px;
    height: 60px;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    resize: none;
}

.memolistdesign {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 20px;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #f6fffb;
}

.total_menu_DIV {
    margin-bottom: 15px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-width: 1px;
    border-style: solid;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    width: 570px;
}

.linemenu_DIV {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 38px;
}

.total_time_DIV {
    display: flex;
    width: 100%;
    height: auto;
    min-height: 28px;
}

.total_time {
    width: 95%;
    border-radius: 8px;
    border-width: 1px;
}

.button_container {
    display: flex;
    width: 105px;
    height: 100%;
}

.deletebutton {
    width: 50px;
    height: 100%;
    margin-left: 5px;
    border-radius: 8px;
    border-width: 1px;
}

.editbutton {
    width: 50px;
    height: 100%;
    border-radius: 8px;
    border-width: 1px;
}

#add_button {
    border-width: 1px;
    display: flex;
    width: 70px;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 8px;
}

.textareaBOX {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 10px;
    resize: none;
}

.exact_time_DIV select {
    width: auto;
    border-radius: 8px;
    padding: 10px 12px;
    margin-right: 10px;
    font-size: 12px;
}

.order_container {
    display: flex;
    width: 80px;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
}

#search_button {
    width: 45px;
    margin-left: 5px;
    border-radius: 8px;
    border-width: 1px;
}

.order_container button {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    border-width: 1px;
    font-weight: bold;
}

.helpbutton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 730px; /* Adjust to the appropriate width */
    margin: 10px;
}

.helpbutton p {
    cursor: pointer;
    margin: 0;
}
