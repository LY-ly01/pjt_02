$(function () {
    $("#link_reg").on('click', function () {
        $(".reg-box").show();
        $(".login-box").hide();
    })

    $("#link_login").on('click', function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    var form = layui.form;
    var layer = layui.layer;
    // layer.msg('只想弱弱提示');
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repsd: function (value) {
            var con = $('.reg-box [name=password]').val();
            if (con !== value) {
                return '两次密码不一致'
            }
        }
    });
    
    $("#form_reg").submit(function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // console.log(res);
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $("#link_login").click();
        })
    })
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success:   function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = './index.html'
        }
            
            
        })
    })

})