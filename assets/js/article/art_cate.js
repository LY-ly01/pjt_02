$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initCateList();
    // 初始化列表
    function initCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                var tpl = template('cateList', res);
                $('tbody').html(tpl);
            }
        })
    }
    var indexAdd = null;
    // 给添加类别按钮  添加点击事件
    $('#cateAdd').on('click', function () {
        // console.log('cc');
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '250px']
        });

    })
    
    // 提交添加的分类  并渲染到页面
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                console.log(res);
                initCateList();
                layer.msg('新增分类成功');
                layer.close(indexAdd);
                
            }
        })
    })


    var indexEdit = null;
    // 通过代理给编辑按钮  添加点击事件
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        });

        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form_edit', res.data)
            }
        })
    })

    // 提交修改的分类  并渲染到页面
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                initCateList();
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                       
                        initCateList();
                    }
                })
                
                layer.close(index);
            });
            
    })
})