$(function () {
    $("#toLogin").on('click', function () {
        $(".reg-box").show();
        $(".login-box").hide();
    })

    $("#toReg").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    var form = layui.form;
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repsd: function (value) {
            var con = $('.reg-box [name=password]').val();
            if (con !== value) {
                return '两次密码不一致'
            }
        }
    });
})