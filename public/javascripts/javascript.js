$(document).ready(function() 
{
    $("#wait_text").hide();
    setTimeout(function()
    {
        $("#show_reg_success").fadeOut('slow').hide();
        $("#show_reg_fail").fadeOut('slow').hide();  
    }, 3000);

    // ส่วนกำหนดให้ตั้งค่าวัน เดือน ปี ปัจจุบัน
    var d = new Date();

    // ส่วนกำหนดให้มีการ เพิ่ม ลบ วันที่ได้
    d.setDate(d.getDate() - 1);
    d.setMonth(d.getMonth() - 2);
    var cur_date = d.getDate();
    var cur_month = d.getMonth();

    cur_month = parseInt(cur_month + 1);

    var cur_year = d.getFullYear();
    var dmy = cur_date + "/" + cur_month + "/" + cur_year;

    $('.date').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: dmy.toString(),
    });


});